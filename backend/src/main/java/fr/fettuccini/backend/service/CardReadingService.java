package fr.fettuccini.backend.service;

import fr.fettuccini.backend.rc522client.rc522.RC522Client;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CardReadingService {

    private final RC522Client rc522Client;
    private ExecutorService executorService;

    //@PostConstruct
    public void init() {
        executorService = Executors.newVirtualThreadPerTaskExecutor();
        executorService.submit(this::readCardLoop);
    }

    private void readCardLoop() {
        try {
            while (!Thread.currentThread().isInterrupted()) {
                var card = rc522Client.readCardData();

                if (card != null) {
                    log.info("Card data: \n{}", card);
                    Thread.sleep(2000);
                }

                Thread.sleep(10);
            }
        } catch (InterruptedException e) {
            log.error("Card reading service interrupted", e);
            Thread.currentThread().interrupt();
        }
    }

    @PreDestroy
    public void cleanUp() {
        executorService.shutdownNow();
        log.info("Card reading service stopped");
    }
}
