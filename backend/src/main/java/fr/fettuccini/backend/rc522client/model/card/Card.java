package fr.fettuccini.backend.rc522client.model.card;

import fr.fettuccini.backend.rc522client.exception.GpioException;
import lombok.Getter;
import lombok.ToString;
import lombok.val;

import java.util.ArrayList;
import java.util.List;

import static fr.fettuccini.backend.rc522client.util.DataUtil.bytesToHex;

@Getter
@ToString
public class Card {

	public static final int SECTOR_COUNT = 16;

	public static final int TAG_ID_SIZE = 5;

	private final byte[] tagId;
	private final List<Sector> sectors = new ArrayList<>();

	public Card(byte[] tagId) {
		this.tagId = tagId;
	}

	public String getTagIdAsString() {
		return tagId == null ? null : bytesToHex(tagId);
	}

	public Sector getSector(int sectorNumber) {
		if (sectorNumber < 0 || sectorNumber >= SECTOR_COUNT) {
			throw new GpioException("Given sector number is out of range: " + sectorNumber);
		}

		return sectors.stream()
				.filter(sector -> sector.getIndex() == sectorNumber)
				.findFirst()
				.orElse(null);
	}

	public void addSector(Sector sector) {
		val existingSector = getSector(sector.getIndex());

		if (existingSector != null) {
			throw new GpioException("Sector already added with number: " + existingSector.getIndex());
		}

		sectors.add(sector);
	}

	public void addBlock(int sectorIndex, int blockIndex, byte[] byteData, BlockReadStatus readStatus) {
		Sector sector = getSector(sectorIndex);

		if (sector == null) {
			sector = new Sector(sectorIndex);
			addSector(sector);
		}

		sector.addBlock(blockIndex, byteData, readStatus);
	}

	public void recalculateAccessModes() {
		sectors.forEach(Sector::recalculateAccessModes);
	}
}
