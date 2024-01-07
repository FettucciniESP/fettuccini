package fr.fettuccini.backend.configuration;

import com.pi4j.Pi4J;
import com.pi4j.context.Context;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
@RequiredArgsConstructor
public class Pi4jConfiguration {

    private Context pi4jContext;

    private final ConfigurableApplicationContext applicationContext;

    @Bean
    Context pi4jContext() {
        try {
            pi4jContext = Pi4J.newAutoContext();
            log.info("PI4J context initialized successfully.");
        } catch (Exception e) {
            log.error("Error initializing PI4J context", e);
            applicationContext.close();
            System.exit(1);
        }
        return pi4jContext;
    }

    @PreDestroy
    private void shutdownPi4j() {
        if (pi4jContext != null) {
            try {
                pi4jContext.shutdown();
                log.info("PI4J context shut down successfully.");
            } catch (Exception e) {
                log.error("Error shutting down PI4J context", e);
            }
        }
    }
}
