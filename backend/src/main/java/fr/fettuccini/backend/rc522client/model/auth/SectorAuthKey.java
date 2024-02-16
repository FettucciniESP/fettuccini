package fr.fettuccini.backend.rc522client.model.auth;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static fr.fettuccini.backend.rc522client.model.card.Sector.BLOCK_COUNT;

@Getter
@RequiredArgsConstructor
public class SectorAuthKey {

	private final int sectorIndex;
	private final List<BlockAuthKey> blockAuthKeys = new ArrayList<>();

	public BlockAuthKey getBlockAuthKey(int blockIndex) {
		return blockAuthKeys.stream()
				.filter(blockAuthKey -> Objects.equals(blockAuthKey.getBlockIndex(), blockIndex))
				.findFirst()
				.orElse(null);
	}

	public void addBlockAuthKey(BlockAuthKey blockAuthKey) {
		blockAuthKeys.add(blockAuthKey);
	}

	public static SectorAuthKey getFactoryDefaultKey(int sectorIndex) {
		SectorAuthKey sectorAuthKey = new SectorAuthKey(sectorIndex);

		for (int i = 0; i < BLOCK_COUNT; i++) {
			sectorAuthKey.addBlockAuthKey(BlockAuthKey.getFactoryDefaultKey(i));
		}

		return sectorAuthKey;
	}
}
