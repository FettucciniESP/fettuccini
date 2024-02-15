package fr.fettuccini.backend.rc522client.model.communication;

import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

import static fr.fettuccini.backend.rc522client.model.card.Block.BYTE_COUNT;

@Getter
@Setter
public class CommunicationResult {

	private byte[] data = new byte[BYTE_COUNT];
	private int length;
	private int bits;
	private CommunicationStatus status;

	public byte[] getData(int length) {
		return Arrays.copyOf(data, length);
	}

	public byte getDataByte(int index) {
		return data[index];
	}

	public void setDataByte(int index, byte value) {
		data[index] = value;
	}

	public boolean isSuccess() {
		return status == CommunicationStatus.SUCCESS;
	}
}
