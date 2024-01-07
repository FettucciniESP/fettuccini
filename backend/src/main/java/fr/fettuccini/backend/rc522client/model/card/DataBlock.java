package fr.fettuccini.backend.rc522client.model.card;

import fr.fettuccini.backend.rc522client.exception.BlockIndexOutOfRangeException;
import fr.fettuccini.backend.rc522client.exception.ByteIndexOutOfRangeException;
import lombok.Getter;
import lombok.Setter;

import java.nio.charset.StandardCharsets;

import static fr.fettuccini.backend.rc522client.model.card.Sector.BLOCK_COUNT;
import static fr.fettuccini.backend.rc522client.util.CardUtil.blockTypeToString;
import static fr.fettuccini.backend.rc522client.util.CardUtil.getBlockAccessMode;
import static fr.fettuccini.backend.rc522client.util.DataUtil.bytesToHex;

@Getter
@Setter
public class DataBlock implements Block {

	private final int index;
	private final byte[] data;
	private BlockType blockType = BlockType.DATA;
	private BlockReadStatus readStatus;
	private BlockAccessMode accessMode;

	public DataBlock(int index, byte[] data, BlockReadStatus readStatus) {
		validateBlockIndex(index);
		validateDataSize(data);

		this.index = index;
		this.readStatus = readStatus;
		this.data = data != null && readStatus == BlockReadStatus.SUCCESS ? data : new byte[BYTE_COUNT];
	}

	private void validateBlockIndex(int index) {
		if (index < 0 || index >= BLOCK_COUNT) {
			throw new BlockIndexOutOfRangeException("Block index out of range: " + index);
		}
	}

	private void validateDataSize(byte[] data) {
		if (data != null && data.length > BYTE_COUNT) {
			throw new RuntimeException("Data array too large: " + data.length + ", should be less than " + BYTE_COUNT);
		}
	}

	public void setByte(int byteIndex, byte value) {
		validateByteIndex(byteIndex);
		data[byteIndex] = value;
	}

	public byte getByte(int byteIndex) {
		validateByteIndex(byteIndex);
		return data[byteIndex];
	}

	private void validateByteIndex(int byteIndex) {
		if (byteIndex < 0 || byteIndex >= BYTE_COUNT) {
			throw new ByteIndexOutOfRangeException("Byte number out of range: " + byteIndex);
		}
	}

	public String getDataAsHex() {
		return bytesToHex(data);
	}

	public String getDataAsString() {
		return new String(data, StandardCharsets.US_ASCII);
	}

	public void updateAccessMode(SectorTrailerBlock sectorTrailerBlock) {
		this.accessMode = getBlockAccessMode(this, sectorTrailerBlock.getAccessBytes());
	}

	@Override
	public String toString() {
		String accessModeString = accessMode == null ? "accessMode ???" : accessMode.toString();
		return String.format("\tBlock (%d) %s\t%s\t\t%s\t Read result: %s",
				index, blockTypeToString(blockType), getDataAsHex(), accessModeString, readStatus);
	}
}
