package fr.fettuccini.backend.gpio;

import com.pi4j.context.Context;
import com.pi4j.io.gpio.digital.DigitalOutput;
import com.pi4j.io.gpio.digital.DigitalOutputConfigBuilder;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class GpioController {

    private final Context pi4jContext;
    private DigitalOutput ledOutput;

    @PostConstruct
    public void initializeLed() {
        int ledPin = 1;
        try {
            DigitalOutputConfigBuilder config = DigitalOutput.newConfigBuilder(pi4jContext)
                    .id("my-led")
                    .name("LED")
                    .address(ledPin);

            this.ledOutput = pi4jContext.create(config);
            log.info("LED initialized on GPIO pin {}", ledPin);
        } catch (Exception e) {
            log.error("Error initializing LED on GPIO pin {}: {}", ledPin, e.getMessage(), e);
        }
    }

    public void toggleLed() {
        if (this.ledOutput != null) {
            this.ledOutput.toggle();
            log.debug("Toggled LED state to {}", this.ledOutput.state());
        }
    }

    public void turnOnLed() {
        if (this.ledOutput != null) {
            this.ledOutput.on();
            log.debug("Turned on LED");
        }
    }

    public void turnOffLed() {
        if (this.ledOutput != null) {
            this.ledOutput.off();
            log.debug("Turned off LED");
        }
    }
}
