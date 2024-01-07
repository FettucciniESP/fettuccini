package fr.fettuccini.backend.rc522client.model.card;

public interface Block {

	int BYTE_COUNT = 16;

	int getIndex();

	byte[] getData();

	BlockType getBlockType();

	BlockAccessMode getAccessMode();

	BlockReadStatus getReadStatus();

	void updateAccessMode(SectorTrailerBlock sectorTrailerBlock);

}
