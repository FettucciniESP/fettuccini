package fr.fettuccini.backend.rc522client.model.card;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import static fr.fettuccini.backend.rc522client.util.CardUtil.getBlockAccessMode;
import static fr.fettuccini.backend.rc522client.util.DataUtil.getByteRange;
import static java.lang.System.arraycopy;

@Getter
@Setter
@ToString
public class SectorTrailerBlock implements Block {

	public static final int SECTOR_TRAILER_BLOCK_INDEX = 3;

	private byte[] keyA;
	private byte[] keyB;
	private byte[] accessBytes;
	private byte dataByte;
	private BlockReadStatus readStatus;
	private BlockAccessMode accessMode;

	public SectorTrailerBlock(byte[] data, BlockReadStatus readStatus) {
		this.readStatus = readStatus;
		if (data == null || readStatus != BlockReadStatus.SUCCESS) {
			data = new byte[BYTE_COUNT];
		}

		this.keyA = getByteRange(data, 0, 6);
		this.accessBytes = getByteRange(data, 6, 3);
		this.dataByte = data[9];
		this.keyB = getByteRange(data, 10, 6);
	}

	@Override
	public byte[] getData() {
		byte[] data = new byte[BYTE_COUNT];

		arraycopy(keyA, 0, data, 0, keyA.length);
		arraycopy(accessBytes, 0, data, 6, accessBytes.length);
		data[9] = dataByte;
		arraycopy(keyB, 0, data, 10, keyB.length);

		return data;
	}

	@Override
	public int getIndex() {
		return SECTOR_TRAILER_BLOCK_INDEX;
	}

	@Override
	public BlockType getBlockType() {
		return BlockType.SECTOR_TRAILER;
	}

	public void updateAccessMode(SectorTrailerBlock sectorTrailerBlock) {
		this.accessMode = getBlockAccessMode(this, sectorTrailerBlock.getAccessBytes());
	}
}
