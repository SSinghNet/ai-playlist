package net.ssingh.spotifyservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.ssingh.spotifyservice.client.LLMClient;
import net.ssingh.spotifyservice.client.SpotifyApiClient;
import net.ssingh.spotifyservice.model.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class PlaylistService {

    private final SpotifyApiClient spotifyApiClient;
    private final LLMClient llmClient;

    private final TrackService trackService;
    private final ProfileService profileService;

    public PlaylistService(SpotifyApiClient spotifyApiClient, LLMClient llmClient, TrackService trackService, ProfileService profileService) {
        this.spotifyApiClient = spotifyApiClient;
        this.llmClient = llmClient;
        this.trackService = trackService;
        this.profileService = profileService;
    }

    public ResponseEntity<SpotifyPlaylist> generatePlaylist(String userPrompt, int playlistLength) {
        SpotifyPlaylist playlist = llmClient.generatePlaylist(userPrompt, playlistLength).getBody();
        for (int i = 0; i < Objects.requireNonNull(playlist).getTracks().size(); i++) {
            SpotifyTrack track = playlist.getTracks().get(i);

            SpotifyTrack newTrack = trackService.getTrackBySearch(
                    track.getName() + " " + (track.getArtists().get(0)).getName());

            playlist.getTracks().set(i, newTrack);
        }

        return ResponseEntity.ok(playlist);
    }

    public ResponseEntity<SpotifyPlaylist> createPlaylistForUser(SpotifyPlaylist playlist, String accessToken) {

        String userId = Objects.requireNonNull(profileService.me(accessToken).getBody()).getSpotifyId();

        try {
            SpotifyPlaylistRequest.CreatePlaylistRequestBody body = new SpotifyPlaylistRequest.CreatePlaylistRequestBody(
                    playlist.getTitle(), playlist.getDescription()
            );

            String response = spotifyApiClient.post("/users/" + userId + "/playlists", body, String.class, accessToken);

            ObjectMapper mapper = new ObjectMapper();
            playlist.setSpotifyId(mapper.readTree(response).get("id").asText());

            System.out.println(playlist.getUrisList());

            SpotifyPlaylistRequest.AddTracksRequestBody body2 = new SpotifyPlaylistRequest.AddTracksRequestBody(playlist.getUrisList());
            spotifyApiClient.post("/playlists/" + playlist.getSpotifyId() + "/tracks", body2, String.class, accessToken);

            return ResponseEntity.ok(playlist);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new SpotifyPlaylist(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
