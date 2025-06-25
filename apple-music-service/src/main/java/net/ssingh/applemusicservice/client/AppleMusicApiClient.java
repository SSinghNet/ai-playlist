package net.ssingh.applemusicservice.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Component
public class AppleMusicApiClient {
    private final RestTemplate restTemplate;

    private String baseUrl;
    private String developerToken;

    public AppleMusicApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public <T> T get(String endpoint, Class<T> responseType,Optional<String> musicUserToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(developerToken);
        musicUserToken.ifPresent(s -> headers.set("Music-User-Token", s));

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<T> response = restTemplate.exchange(
                baseUrl + endpoint,
                HttpMethod.GET,
                entity,
                responseType
        );

        return response.getBody();
    }


    public <T, R> T post(String endpoint, R requestBody, Class<T> responseType, Optional<String> musicUserToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(developerToken);
        musicUserToken.ifPresent(s -> headers.set("Music-User-Token", s));

        HttpEntity<R> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<T> response = restTemplate.exchange(
                baseUrl + endpoint,
                HttpMethod.POST,
                entity,
                responseType
        );

        return response.getBody();
    }


}
