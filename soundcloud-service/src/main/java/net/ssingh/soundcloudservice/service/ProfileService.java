package net.ssingh.soundcloudservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import net.ssingh.soundcloudservice.client.SoundCloudApiClient;
import net.ssingh.soundcloudservice.model.entity.SoundCloudPlaylist;
import net.ssingh.soundcloudservice.model.entity.SoundCloudTrack;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {
    private final SoundCloudApiClient soundCloudApiClient;

    public ProfileService(SoundCloudApiClient soundCloudApiClient) {
        this.soundCloudApiClient = soundCloudApiClient;
    }

    public ResponseEntity<List<SoundCloudPlaylist>> getPlaylists(String accessToken, int limit) {
        try {
            List<SoundCloudPlaylist> playlist = soundCloudApiClient.get(
                    "me/playlists?limit=" + limit,
                    new ParameterizedTypeReference<>() {
                    },
                    accessToken
            );

            return ResponseEntity.ok(playlist);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<List<SoundCloudTrack>> getSavedTracks(String accessToken, int limit) {
        try {
            List<SoundCloudTrack> tracks = soundCloudApiClient.get(
                    "me/likes/tracks?limit=" + limit,
                    new ParameterizedTypeReference<>() {
                    },
                    accessToken
            );
            return ResponseEntity.ok(tracks);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
