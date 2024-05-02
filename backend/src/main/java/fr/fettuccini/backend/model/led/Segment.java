package fr.fettuccini.backend.model.led;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.util.Assert;

@Data
@NoArgsConstructor
public class Segment {
    private int id;
    private int[] col;

    public Segment(int id, int[] col) {
        Assert.notNull(col, "Color array must not be null");
        Assert.isTrue(col.length == 3, "Color array must have exactly three elements");

        for (int color : col) {
            Assert.isTrue(color >= 0 && color <= 255, "Color values must be between 0 and 255");
        }

        this.id = id;
        this.col = col;
    }

    // Setter for further usage with validation
    public void setCol(int[] col) {
        Assert.notNull(col, "Color array must not be null");
        Assert.isTrue(col.length == 3, "Color array must have exactly three elements");

        for (int color : col) {
            Assert.isTrue(color >= 0 && color <= 255, "Color values must be between 0 and 255");
        }

        this.col = col;
    }
}
