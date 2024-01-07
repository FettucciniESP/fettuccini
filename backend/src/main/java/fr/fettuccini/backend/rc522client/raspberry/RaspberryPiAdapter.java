package fr.fettuccini.backend.rc522client.raspberry;

/**
 * Interface for Raspberry Pi Adapter to facilitate communication with the RC522 unit via SPI.
 */
public interface RaspberryPiAdapter {

    /**
     * Initializes the communication channel between the Raspberry Pi and the RC522 unit via SPI.
     *
     * @param spiChannel The channel number used for SPI communication.
     * @param speed      The speed of the communication.
     * @param resetPin   The GPIO number of the connected reset pin.
     * @return {@code true} if the initialization is successful, {@code false} otherwise.
     */
    boolean init(int spiChannel, int speed, int resetPin);

    /**
     * Sends data via SPI to the RC522 and returns the response code of the communication.
     *
     * @param data The data to be sent.
     * @return The response code of the communication.
     */
    int wiringPiSPIDataRW(byte[] data);
}
