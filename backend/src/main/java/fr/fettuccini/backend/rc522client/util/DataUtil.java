package fr.fettuccini.backend.rc522client.util;

import fr.fettuccini.backend.rc522client.model.communication.CommunicationStatus;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class DataUtil {

	private static final char[] HEX_ARRAY = "0123456789ABCDEF".toCharArray();

	private DataUtil() {
		// Prevent instantiation
	}

	public static String byteToHex(byte byteValue) {
		return new String(new char[] { HEX_ARRAY[(byteValue >>> 4) & 0x0F], HEX_ARRAY[byteValue & 0x0F] });
	}

	public static String bytesToHex(byte[] bytes) {
		if (bytes == null) {
			return "";
		}

		return IntStream.range(0, bytes.length)
				.mapToObj(i -> byteToHex(bytes[i]))
				.collect(Collectors.joining());
	}

	public static CommunicationStatus getStatus(int statusCode) {
		return switch (statusCode) {
			case 0 -> CommunicationStatus.SUCCESS;
			case 1 -> CommunicationStatus.NO_TAG;
			default -> CommunicationStatus.ERROR;
		};
	}

	public static int getBitValue(byte target, int index) {
		return (target >> index) & 1;
	}

	public static byte[] getByteRange(byte[] bytes, int startingIndex, int number) {
		if (bytes == null || startingIndex < 0 || number < 0 || startingIndex + number > bytes.length) {
			return new byte[0];
		}

		byte[] result = new byte[number];
		System.arraycopy(bytes, startingIndex, result, 0, number);
		return result;
	}
}
