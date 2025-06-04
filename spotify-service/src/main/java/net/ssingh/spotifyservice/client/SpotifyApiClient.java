package net.ssingh.spotifyservice.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Date;


@Component
public class SpotifyApiClient {
    private final RestTemplate restTemplate;

    @Value("${external.api.spotify.client-id}")
    private String clientId;
    @Value("${external.api.spotify.client-secret}")
    private String clientSecret;

    @Value("${external.api.spotify.base-url}")
    private String baseUrl;

    private String accessToken;
    private Date tokenExpires;

    public SpotifyApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private String getAccessToken() throws JsonProcessingException {
        if (accessToken == null || accessToken.isEmpty() || tokenExpires == null || tokenExpires.before(new Date())) {
            fetchAccessToken();
        }
        return accessToken;
    }

    private void fetchAccessToken() throws JsonProcessingException {
        String tokenUrl = "https://accounts.spotify.com/api/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("grant_type", "client_credentials");
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(formData, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(tokenUrl, request, String.class);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode root = mapper.readTree(response.getBody());
        accessToken = root.path("access_token").asText();
        int expiresInSeconds = root.path("expires_in").asInt();
        tokenExpires = new Date(System.currentTimeMillis() + (expiresInSeconds - 60) * 1000L);
    }

    public <T> T get(String endpoint, Class<T> responseType) throws JsonProcessingException {
        return get(endpoint, responseType, getAccessToken());
    }

    public <T> T get(String endpoint, Class<T> responseType, String accessToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<T> response = restTemplate.exchange(
                baseUrl + endpoint,
                HttpMethod.GET,
                entity,
                responseType
        );

        return response.getBody();
    }

    public <T, R> T post(String endpoint, R requestBody, Class<T> responseType) throws JsonProcessingException {
        return post(endpoint, requestBody, responseType, getAccessToken());
    }

    public <T, R> T post(String endpoint, R requestBody, Class<T> responseType, String accessToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);


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
