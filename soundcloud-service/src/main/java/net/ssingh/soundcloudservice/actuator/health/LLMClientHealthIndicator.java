package net.ssingh.soundcloudservice.actuator.health;

import net.ssingh.soundcloudservice.client.LLMClient;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class LLMClientHealthIndicator implements HealthIndicator {

    private final LLMClient llmClient;

    public LLMClientHealthIndicator(LLMClient llmClient) {
        this.llmClient = llmClient;
    }

    @Override
    public Health health() {
        try {
            ResponseEntity<?> response = llmClient.healthCheck();
            if (response.getStatusCode().is2xxSuccessful()) {
                return Health.up().build();
            } else {
                return Health.down()
                        .withDetail("status", response.getStatusCode())
                        .build();
            }
        } catch (Exception e) {
            return Health.down(e).build();
        }
    }
}
