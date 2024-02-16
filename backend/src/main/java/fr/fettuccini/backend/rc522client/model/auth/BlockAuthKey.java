package fr.fettuccini.backend.rc522client.model.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

import static fr.fettuccini.backend.rc522client.model.card.SectorTrailerBlock.SECTOR_TRAILER_BLOCK_INDEX;

@AllArgsConstructor
@Getter
public class BlockAuthKey {

	private final int blockIndex;
	private final AuthKeyType keyType;
	private final byte[] key;

	private static final byte[] FACTORY_DEFAULT_KEY = new byte[] {
			(byte) 0xFF, (byte) 0xFF, (byte) 0xFF, (byte) 0xFF, (byte) 0xFF, (byte) 0xFF
	};

	public static BlockAuthKey getFactoryDefaultSectorKey() {
		return new BlockAuthKey(SECTOR_TRAILER_BLOCK_INDEX, AuthKeyType.AUTH_A, FACTORY_DEFAULT_KEY);
	}

	public static BlockAuthKey getFactoryDefaultKey(int blockIndex) {
		return new BlockAuthKey(blockIndex, AuthKeyType.AUTH_A, FACTORY_DEFAULT_KEY);
	}
}
