package fr.fettuccini.backend.rc522client.raspberry;

import com.pi4j.context.Context;
import com.pi4j.io.gpio.digital.DigitalOutput;
import com.pi4j.io.gpio.digital.DigitalOutputConfigBuilder;
import com.pi4j.io.gpio.digital.DigitalState;
import com.pi4j.io.spi.Spi;
import com.pi4j.io.spi.SpiConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class RaspberryPiAdapterImpl implements RaspberryPiAdapter {

	private final Context pi4jContext;
	private Spi spiDevice;

    @Override
	public boolean init(int spiChannel, int speed, int resetPinNumber) {
		try {
			// SPI Configuration
			SpiConfig spiConfig = Spi.newConfigBuilder(pi4jContext)
					.id("SPI" + spiChannel)
					.name("RC522")
					.bus(spiChannel)
					.baud(speed)
					.build();

			this.spiDevice = pi4jContext.create(spiConfig);
			log.info("Successfully loaded SPI communication");

			// GPIO Configuration for Reset Pin
			DigitalOutputConfigBuilder resetPinConfig = DigitalOutput.newConfigBuilder(pi4jContext)
					.id("RESET")
					.name("RC522_RESET")
					.address(resetPinNumber)
					.shutdown(DigitalState.LOW);

            DigitalOutput resetPin = pi4jContext.create(resetPinConfig);
			resetPin.high();

			return true;
		} catch (Exception e) {
			log.error("Failed to set up SPI communication", e);
			return false;
		}
	}

	@Override
	public int wiringPiSPIDataRW(byte[] data) {
		try {
			spiDevice.write(data);
			spiDevice.read(data);
			return 0;
		} catch (Exception e) {
			log.error("Error in SPI data communication", e);
			return -1;
		}
	}
}
