package fr.fettuccini.backend.rc522client.rc522;

import com.pi4j.context.Context;
import fr.fettuccini.backend.rc522client.model.auth.BlockAuthKey;
import fr.fettuccini.backend.rc522client.model.auth.CardAuthKey;
import fr.fettuccini.backend.rc522client.model.auth.SectorAuthKey;
import fr.fettuccini.backend.rc522client.model.card.*;
import fr.fettuccini.backend.rc522client.model.communication.CommunicationResult;
import fr.fettuccini.backend.rc522client.model.communication.CommunicationStatus;
import fr.fettuccini.backend.rc522client.raspberry.RaspberryPiAdapter;
import fr.fettuccini.backend.rc522client.raspberry.RaspberryPiAdapterImpl;
import fr.fettuccini.backend.rc522client.util.DataUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Optional;

import static fr.fettuccini.backend.rc522client.model.auth.BlockAuthKey.getFactoryDefaultKey;
import static fr.fettuccini.backend.rc522client.model.auth.BlockAuthKey.getFactoryDefaultSectorKey;
import static fr.fettuccini.backend.rc522client.model.card.Card.TAG_ID_SIZE;
import static fr.fettuccini.backend.rc522client.model.card.ManufacturerBlock.MANUFACTURER_BLOCK_INDEX;
import static fr.fettuccini.backend.rc522client.model.card.ManufacturerBlock.MANUFACTURER_SECTOR_INDEX;
import static fr.fettuccini.backend.rc522client.model.card.SectorTrailerBlock.SECTOR_TRAILER_BLOCK_INDEX;
import static fr.fettuccini.backend.rc522client.rc522.RC522CommandTable.PICC_AUTHENT1A;
import static fr.fettuccini.backend.rc522client.rc522.RC522CommandTable.PICC_AUTHENT1B;
import static fr.fettuccini.backend.rc522client.util.CardUtil.getFullAddress;
import static fr.fettuccini.backend.rc522client.util.CardUtil.getReadStatus;

@Component
@RequiredArgsConstructor
@Slf4j
public class RC522ClientImpl implements RC522Client {

    private static final int RESET_PIN = 22;
    private static final int SPEED = 500000;
    private static final int SPI_CHANNEL = 0;

    private final RC522Adapter rc522;
    private static Context pi4jContext;

    private static final String READ_CARD_UID_LOG = "Card Read UID: (HEX) {}";

    public static RC522Client createInstance() {
        final RaspberryPiAdapter piAdapter = new RaspberryPiAdapterImpl(pi4jContext);
        final RC522Adapter rc522Adapter = new RC522AdapterImpl(piAdapter);
        final RC522Client rc522Client = new RC522ClientImpl(rc522Adapter);

        rc522Client.init();
        return rc522Client;
    }

    @Override
    public void init() {
        rc522.init(SPEED, RESET_PIN, SPI_CHANNEL);
    }

    /**
     * This method checks for nearby cards. If no cards detected, it returns false
     * otherwise, if a card is present,
     * then returns true. Important: This method will returns true when the card is
     * present, but it's not readable!
     *
     * @return Has any card near to the reader?
     */
    @Override
    public boolean hasCard() {
        CommunicationResult readResult = rc522.selectCard();

        return readResult.getStatus() != CommunicationStatus.NO_TAG;
    }

    /**
     * Select one of your card and read its tagId. If the selection has error or no
     * rad is present then it will return
     * with a null.
     *
     * @return The selected card id or null if no card present or the selection
     * process is failed
     */
    @Override
    public Optional<byte[]> readCardTag() {
        CommunicationResult readResult = rc522.selectCard();

        if (!readResult.isSuccess()) {
            return Optional.empty();
        }

        return Optional.ofNullable(readResult.getData(TAG_ID_SIZE));
    }

    /**
     * Reads all data from your card. If no card present or the process is failed it
     * returns with null. This method is
     * using the factory default authentication keys.
     *
     * @return The Card object with all the readable card data
     */
    @Override
    public Card readCardData() {
        return readCardData(CardAuthKey.getFactoryDefaultKey());
    }

    /**
     * Reads all data from your card. If no card present or the process is failed it
     * returns with null. This method is
     * using the given authentication keys.
     *
     * @param cardAuthKey Authentication keys for the whole card
     * @return The Card object with all the readable card data
     */
    @Override
    public Card readCardData(CardAuthKey cardAuthKey) {
        Optional<byte[]> optionalTagId = readCardTag();

        if (optionalTagId.isEmpty()) {
            return null;
        }

        byte[] tagId = optionalTagId.get();

        Card card = new Card(tagId);

        log.info(READ_CARD_UID_LOG, card.getTagIdAsString());

        for (int sectorIndex = 0; sectorIndex < Card.SECTOR_COUNT; sectorIndex++) {
            for (int blockIndex = 0; blockIndex < Sector.BLOCK_COUNT; blockIndex++) {
                CommunicationResult result = authAndReadData(sectorIndex, blockIndex, tagId,
                        cardAuthKey.getBlockAuthKey(sectorIndex, blockIndex));

                card.addBlock(sectorIndex, blockIndex, result.getData(), getReadStatus(result));
            }
        }

        card.recalculateAccessModes();

        rc522.reset();

        return card;
    }

    /**
     * Reads a specific sector data from your selected card. If no card present or
     * the process is failed it returns
     * with null. This method is using the factory default authentication keys.
     *
     * @param sectorIndex The target sector's index
     * @return The Sector object with all the readable card data
     */
    @Override
    public Sector readSectorData(int sectorIndex) {
        return readSectorData(sectorIndex, SectorAuthKey.getFactoryDefaultKey(sectorIndex));
    }

    /**
     * Reads a specific sector data from your selected card. If no card present or
     * the process is failed it returns
     * with null. This method is using the given authentication keys.
     *
     * @param sectorIndex   The target sector's index
     * @param sectorAuthKey Authentication keys for the target sector
     * @return The Sector object with all the readable card data
     */
    @Override
    public Sector readSectorData(int sectorIndex, SectorAuthKey sectorAuthKey) {
        Optional<byte[]> optionalTagId = readCardTag();

        if (optionalTagId.isEmpty()) {
            return null;
        }

        byte[] tagId = optionalTagId.get();

        Sector sector = new Sector(sectorIndex);

        log.info(READ_CARD_UID_LOG, DataUtil.bytesToHex(tagId));

        for (int blockIndex = 0; blockIndex < Sector.BLOCK_COUNT; blockIndex++) {
            CommunicationResult result = authAndReadData(sectorIndex, blockIndex, tagId,
                    sectorAuthKey.getBlockAuthKey(blockIndex));

            sector.addBlock(blockIndex, result.getData(), getReadStatus(result));
        }

        sector.recalculateAccessModes();

        rc522.reset();

        return sector;
    }

    /**
     * Reads a specific block data from your selected card. If no card present or
     * the process is failed it returns
     * with null. This method is using the factory default authentication keys.
     *
     * @param sectorIndex The target sector's index
     * @param blockIndex  The target block's index
     * @return The Block object with all the readable card data
     */
    @Override
    public Block readBlockData(int sectorIndex, int blockIndex) {
        return readBlockData(sectorIndex, blockIndex, getFactoryDefaultSectorKey(), getFactoryDefaultKey(blockIndex));
    }

    /**
     * Reads a specific block data from your selected card. If no card present or
     * the process is failed it returns
     * with null. This method is using the given authentication keys.
     *
     * @param sectorIndex          The target sector's index
     * @param blockIndex           The target block's index
     * @param sectorTrailerAuthKey Authentication key for the target block's sector
     *                             trailer block
     * @param blockAuthKey         Authentication key for the target block
     * @return The Block object with all the readable card data
     */
    @Override
    public Block readBlockData(int sectorIndex, int blockIndex, BlockAuthKey sectorTrailerAuthKey,
                               BlockAuthKey blockAuthKey) {
        Optional<byte[]> optionalTagId = readCardTag();

        if (optionalTagId.isEmpty()) {
            return null;
        }

        byte[] tagId = optionalTagId.get();

        log.info(READ_CARD_UID_LOG, DataUtil.bytesToHex(tagId));

        Block block;
        SectorTrailerBlock sectorTrailerBlock;
        CommunicationResult result = authAndReadData(sectorIndex, blockIndex, tagId, blockAuthKey);

        if (blockIndex == SECTOR_TRAILER_BLOCK_INDEX) {
            block = new SectorTrailerBlock(result.getData(), getReadStatus(result));
            sectorTrailerBlock = new SectorTrailerBlock(result.getData(), getReadStatus(result));
        } else if (blockIndex == MANUFACTURER_BLOCK_INDEX && sectorIndex == MANUFACTURER_SECTOR_INDEX) {
            block = new ManufacturerBlock(result.getData(), getReadStatus(result));

            CommunicationResult sectorTrailerResult = authAndReadData(sectorIndex, SECTOR_TRAILER_BLOCK_INDEX, tagId,
                    blockAuthKey);
            sectorTrailerBlock = new SectorTrailerBlock(sectorTrailerResult.getData(),
                    getReadStatus(sectorTrailerResult));
        } else {
            block = new DataBlock(blockIndex, result.getData(), getReadStatus(result));

            CommunicationResult sectorTrailerResult = authAndReadData(sectorIndex, SECTOR_TRAILER_BLOCK_INDEX, tagId,
                    blockAuthKey);
            sectorTrailerBlock = new SectorTrailerBlock(sectorTrailerResult.getData(),
                    getReadStatus(sectorTrailerResult));
        }

        block.updateAccessMode(sectorTrailerBlock);

        rc522.reset();

        return block;
    }

    private CommunicationResult authAndReadData(int sectorIndex, int blockIndex, byte[] tagId,
                                                BlockAuthKey blockAuthKey) {
        byte fullAddress = getFullAddress(sectorIndex, blockIndex);
        CommunicationResult result = auth(fullAddress, tagId, blockAuthKey);

        if (result.isSuccess()) {
            return readData(fullAddress);
        }

        return result;
    }

    private CommunicationResult auth(byte blockAddress, byte[] tagId, BlockAuthKey blockAuthKey) {
        log.debug("Authenticate block: {}", blockAddress);

        byte authCommand = switch (blockAuthKey.getKeyType()) {
            case AUTH_A -> PICC_AUTHENT1A;
            case AUTH_B -> PICC_AUTHENT1B;
        };

        CommunicationResult result = rc522.authCard(authCommand, blockAddress, blockAuthKey.getKey(), tagId);

        if (result.isSuccess()) {
            log.debug("Successfully authenticated!");
        } else {
            log.debug("Authentication error");
        }

        return result;
    }

    private CommunicationResult readData(byte blockAddress) {
        return rc522.read(blockAddress);
    }

}
