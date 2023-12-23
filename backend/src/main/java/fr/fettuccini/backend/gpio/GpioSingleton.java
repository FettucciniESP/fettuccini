package fr.fettuccini.backend.gpio;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.pi4j.Pi4J;
import com.pi4j.context.Context;

import lombok.extern.slf4j.Slf4j;

@Component
@Scope(value = ConfigurableBeanFactory.SCOPE_SINGLETON)
@Slf4j
public class GpioSingleton {

    private final Context pi4jContext = Pi4J.newAutoContext();

    public GpioSingleton() {
        log.info("GpioSingleton created");
        pi4jContext.describe().print(System.out);
    }

    public void close() {
        pi4jContext.shutdown();
    }

}
