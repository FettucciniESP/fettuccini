package fr.fettuccini.backend.rc522client.model.card;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BlockAccessMode {

	private boolean c1;
	private boolean c2;
	private boolean c3;

	public void setC1(int c1) {
		this.c1 = c1 == 1;
	}

	public void setC2(int c2) {
		this.c2 = c2 == 1;
	}

	public void setC3(int c3) {
		this.c3 = c3 == 1;
	}
}
