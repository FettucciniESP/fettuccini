package fr.fettuccini.backend.rc522client.util;

import fr.fettuccini.backend.rc522client.model.card.*;
import fr.fettuccini.backend.rc522client.model.communication.CommunicationResult;

import static fr.fettuccini.backend.rc522client.util.AccessModeBit.*;

public class CardUtil {

	private static final AccessModeBit[][] ACCESS_MODE_BIT_INDEX_MATRIX = {
			{ C3_2_N, C2_2_N, C1_2_N, C0_2_N, C3_1_N, C2_1_N, C1_1_N, C0_1_N },
			{ C3_1, C2_1, C1_1, C0_1, C3_3_N, C2_3_N, C1_3_N, C0_3_N },
			{ C3_3, C2_3, C1_3, C0_3, C3_2, C2_2, C1_2, C0_2 }
	};

	private CardUtil() {
		// Prevent instantiation
	}

	public static String blockTypeToString(BlockType blockType) {
		if (blockType == null) {
			return "[???]";
		}

		int blockTypeLength = blockType.toString().length();
		int maxBlockTypeLength = BlockType.SECTOR_TRAILER.toString().length();
		return String.format("[%s]%s", blockType, " ".repeat(maxBlockTypeLength - blockTypeLength));
	}

	public static byte getFullAddress(int sectorIndex, int blockIndex) {
		return (byte) (sectorIndex * Sector.BLOCK_COUNT + blockIndex);
	}

	public static BlockAccessMode getBlockAccessMode(Block dataBlock, byte[] accessBytes) {
		BlockAccessMode blockAccessMode = new BlockAccessMode();
		int[] c = new int[3];

		for (int i = 0; i < c.length; i++) {
			c[i] = getAccessBit(accessBytes, dataBlock.getIndex(), i + 1);
		}

		blockAccessMode.setC1(c[0]);
		blockAccessMode.setC2(c[1]);
		blockAccessMode.setC3(c[2]);

		return blockAccessMode;
	}

	public static BlockReadStatus getReadStatus(CommunicationResult result) {
		if (result == null || result.getStatus() == null) {
			return BlockReadStatus.ERROR;
		}

		return switch (result.getStatus()) {
			case SUCCESS -> BlockReadStatus.SUCCESS;
			case AUTH_ERROR -> BlockReadStatus.AUTH_ERROR;
			case NO_TAG, ERROR -> BlockReadStatus.ERROR;
		};
	}

	private static int getAccessBit(byte[] accessBytes, int blockIndex, int bitIndex) {
		for (AccessModeBit[] accessModeBits : ACCESS_MODE_BIT_INDEX_MATRIX) {
			int accessBit = getAccessBit(accessModeBits, accessBytes, blockIndex, bitIndex);
			if (accessBit != -1) {
				return accessBit;
			}
		}
		return -1;
	}

	private static int getAccessBit(AccessModeBit[] accessModeBits, byte[] accessBytes, int blockIndex, int bitIndex) {
		for (int i = 0; i < accessModeBits.length; i++) {
			AccessModeBit bit = accessModeBits[i];
			if (bit.matches(blockIndex, bitIndex, false)) {
				return DataUtil.getBitValue(accessBytes[i / 8], 7 - (i % 8));
			}
		}
		return -1;
	}
}
