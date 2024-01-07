package fr.fettuccini.backend.rc522client.model.card;

import fr.fettuccini.backend.rc522client.exception.BlockIndexOutOfRangeException;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

import static fr.fettuccini.backend.rc522client.model.card.ManufacturerBlock.MANUFACTURER_BLOCK_INDEX;
import static fr.fettuccini.backend.rc522client.model.card.ManufacturerBlock.MANUFACTURER_SECTOR_INDEX;
import static fr.fettuccini.backend.rc522client.model.card.SectorTrailerBlock.SECTOR_TRAILER_BLOCK_INDEX;

@Getter
@Setter
@ToString
public class Sector {

	public static final int BLOCK_COUNT = 4;

	private final int index;
	private SectorTrailerBlock sectorTrailerBlock;
	private ManufacturerBlock manufacturerBlock;
	private final List<DataBlock> dataBlocks = new ArrayList<>();

	public Sector(int index) {
		this.index = index;
	}

	public DataBlock getBlock(int blockNumber) {
		validateBlockNumber(blockNumber);
		return dataBlocks.stream()
				.filter(dataBlock -> dataBlock.getIndex() == blockNumber)
				.findFirst()
				.orElse(null);
	}

	public void addBlock(DataBlock dataBlock) {
		DataBlock existingDataBlock = getBlock(dataBlock.getIndex());
		if (existingDataBlock != null) {
			throw new RuntimeException("Block already added with number: " + dataBlock.getIndex());
		}
		dataBlocks.add(dataBlock);
	}

	public void addBlock(int blockIndex, byte[] byteData, BlockReadStatus readStatus) {
		if (blockIndex == SECTOR_TRAILER_BLOCK_INDEX) {
			this.setSectorTrailerBlock(new SectorTrailerBlock(byteData, readStatus));
		} else if (blockIndex == MANUFACTURER_BLOCK_INDEX && this.index == MANUFACTURER_SECTOR_INDEX) {
			this.setManufacturerBlock(new ManufacturerBlock(byteData, readStatus));
		} else {
			this.addBlock(new DataBlock(blockIndex, byteData, readStatus));
		}
	}

	public void recalculateAccessModes() {
		SectorTrailerBlock sectorTrailerBlock = this.getSectorTrailerBlock();

		if (sectorTrailerBlock == null) {
			return;
		}

		sectorTrailerBlock.updateAccessMode(sectorTrailerBlock);

		if (this.getManufacturerBlock() != null) {
			this.getManufacturerBlock().updateAccessMode(sectorTrailerBlock);
		}

		for (int blockIndex = 0; blockIndex < BLOCK_COUNT; blockIndex++) {
			DataBlock dataBlock = this.getBlock(blockIndex);

			if (dataBlock != null) {
				dataBlock.updateAccessMode(sectorTrailerBlock);
			}
		}
	}

	private void validateBlockNumber(int blockNumber) {
		if (blockNumber < 0 || blockNumber >= BLOCK_COUNT) {
			throw new BlockIndexOutOfRangeException("Block number out of range: " + blockNumber);
		}
	}
}
