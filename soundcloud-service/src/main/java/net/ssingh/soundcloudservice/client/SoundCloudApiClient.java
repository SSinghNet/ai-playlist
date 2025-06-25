package net.ssingh.soundcloudservice.client;

import com.fasterxml.jackson.core.JsonProcessingException;
import net.ssingh.soundcloudservice.model.dto.external.soundcloud.response.TokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;


@Component
public class SoundCloudApiClient {
    private final RestTemplate restTemplate;

    @Value("${external.api.soundcloud.client-id}")
    private String clientId;
    @Value("${external.api.soundcloud.client-secret}")
    private String clientSecret;

    @Value("${external.api.soundcloud.base-url}")
    private String baseUrl;

    private String accessToken;
    private Date tokenExpires;

    public SoundCloudApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private String getAccessToken() throws JsonProcessingException {
        if (accessToken == null || accessToken.isEmpty() || tokenExpires == null || tokenExpires.before(new Date())) {
            fetchAccessToken();
        }
        return accessToken;
    }

    private void fetchAccessToken() throws JsonProcessingException {
        String tokenUrl = "https://secure.soundcloud.com/oauth/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));
        headers.setBasicAuth(clientId, clientSecret);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<TokenResponse> response = restTemplate.postForEntity(tokenUrl, request, TokenResponse.class);

        assert response.getBody() != null;
        this.accessToken = response.getBody().getAccessToken();
        this.tokenExpires = new Date(System.currentTimeMillis() + (response.getBody().getExpiresIn() - 60) * 1000L);
    }

    public <T> T get(String endpoint, Class<T> responseType) throws JsonProcessingException {
        return get(endpoint, responseType, getAccessToken());
    }
    public <T> T get(String endpoint, ParameterizedTypeReference<T> responseType) throws JsonProcessingException {
        return get(endpoint, responseType, getAccessToken());
    }

    public <T> T get(String endpoint, Class<T> responseType, String accessToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        return restTemplate.exchange(
                baseUrl + endpoint,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                responseType
        ).getBody();
    }

    public <T> T get(String endpoint, ParameterizedTypeReference<T> responseType, String accessToken) throws JsonProcessingException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        return restTemplate.exchange(
                baseUrl + endpoint,
                HttpMethod.GET,
                new HttpEntity<>(headers),
                responseType
        ).getBody();
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
