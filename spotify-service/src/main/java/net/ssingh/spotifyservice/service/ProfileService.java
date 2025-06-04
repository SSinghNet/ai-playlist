package net.ssingh.spotifyservice.service;

import net.ssingh.spotifyservice.client.SpotifyApiClient;
import net.ssingh.spotifyservice.model.SpotifyUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final SpotifyApiClient spotifyApiClient;

    @Autowired
    public ProfileService(SpotifyApiClient spotifyApiClient) {
        this.spotifyApiClient = spotifyApiClient;
    }

    public ResponseEntity<SpotifyUser> me(String accessToken) {
        try {
            return ResponseEntity.ok(spotifyApiClient.get("me", SpotifyUser.class, accessToken));
        } catch (Exception e) {
            return new ResponseEntity<>(new SpotifyUser(), HttpStatus.UNAUTHORIZED);
        }
    }
}
