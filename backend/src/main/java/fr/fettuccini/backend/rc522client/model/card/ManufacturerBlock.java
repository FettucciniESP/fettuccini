package fr.fettuccini.backend.rc522client.model.card;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import static fr.fettuccini.backend.rc522client.util.CardUtil.getBlockAccessMode;
import static fr.fettuccini.backend.rc522client.util.DataUtil.getByteRange;

@Getter
@ToString
public class ManufacturerBlock implements Block {

	public static final int MANUFACTURER_BLOCK_INDEX = 0;
	public static final int MANUFACTURER_SECTOR_INDEX = 0;

	private final byte[] uid;
	private final byte[] manufacturerData;
	private final BlockReadStatus readStatus;
	@Setter
	private BlockAccessMode accessMode;

	public ManufacturerBlock(byte[] data, BlockReadStatus readStatus) {
		this.uid = getByteRange(data, 0, 7);
		this.manufacturerData = getByteRange(data, 7, 9);
		this.readStatus = readStatus;
	}

	public void updateAccessMode(SectorTrailerBlock sectorTrailerBlock) {
		this.accessMode = getBlockAccessMode(this, sectorTrailerBlock.getAccessBytes());
	}

	@Override
	public int getIndex() {
		return MANUFACTURER_BLOCK_INDEX;
	}

	@Override
	public byte[] getData() {
		byte[] data = new byte[BYTE_COUNT];
		System.arraycopy(uid, 0, data, 0, uid.length);
		System.arraycopy(manufacturerData, 0, data, 7, manufacturerData.length);
		return data;
	}

	@Override
	public BlockType getBlockType() {
		return BlockType.MANUFACTURER;
	}
}
