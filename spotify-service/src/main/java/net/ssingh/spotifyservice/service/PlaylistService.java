package net.ssingh.spotifyservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.spotifyservice.client.LLMClient;
import net.ssingh.spotifyservice.client.SpotifyApiClient;
import net.ssingh.spotifyservice.model.dto.external.spotify.request.playlist.CreatePlaylistRequest;
import net.ssingh.spotifyservice.model.dto.external.spotify.request.playlist.AddTracksRequest;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Artist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Playlist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Track;
import net.ssingh.spotifyservice.model.entity.spotify.SpotifyPlaylist;
import net.ssingh.spotifyservice.model.entity.spotify.SpotifyTrack;
import org.springframework.context.annotation.Lazy;
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

    @Lazy
    public PlaylistService(SpotifyApiClient spotifyApiClient, LLMClient llmClient, TrackService trackService, ProfileService profileService) {
        this.spotifyApiClient = spotifyApiClient;
        this.llmClient = llmClient;
        this.trackService = trackService;
        this.profileService = profileService;
    }

    public ResponseEntity<SpotifyPlaylist> generatePlaylist(GeneratePlaylistRequest request) {
        try {
            Playlist<Track<Artist>> playlist = llmClient.generatePlaylist(request).getBody();
            SpotifyPlaylist spotifyPlaylist = new SpotifyPlaylist();
            assert playlist != null;
            spotifyPlaylist.setTitle(playlist.getTitle());
            spotifyPlaylist.setDescription(playlist.getDescription());

            int count = 1;

            for (int i = 0; i <= playlist.getTracks().size()
                    && spotifyPlaylist.getTracks().size() < request.getPlaylistLength(); i++) {

                if (i == playlist.getTracks().size()) {
                    playlist = llmClient.generatePlaylist(request).getBody();
                    i = 0;
                    count++;
                }

                if (count > 3) {
                    return new ResponseEntity<>(spotifyPlaylist, HttpStatus.OK);
                }

                Track<Artist> track = Objects.requireNonNull(playlist).getTracks().get(i);
                if (track == null) {
                    continue;
                }

                SpotifyTrack newTrack = trackService.getTrackBySearch(
                        track.getName(), (track.getArtists().get(0)).getName()
                );

                if (newTrack != null
                        && newTrack.getName() != null
                        && newTrack.getUri() != null
                        && (newTrack.getName().toLowerCase().contains(track.getName().toLowerCase())
                        || track.getName().toLowerCase().contains(newTrack.getName().toLowerCase()))
                        && !spotifyPlaylist.containsTrack(newTrack)
                ) {
                    spotifyPlaylist.getTracks().add(newTrack);
                }

            }

            return ResponseEntity.ok(spotifyPlaylist);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public ResponseEntity<SpotifyPlaylist> createPlaylistForUser(SpotifyPlaylist playlist, String accessToken) {

        String userId = Objects.requireNonNull(profileService.getProfile(accessToken).getBody()).getSpotifyId();

        try {
            CreatePlaylistRequest body = new CreatePlaylistRequest(
                    playlist.getTitle(), playlist.getDescription()
            );

            String response = spotifyApiClient.post("/users/" + userId + "/playlists", body, String.class, accessToken);

            ObjectMapper mapper = new ObjectMapper();
            playlist.setSpotifyId(mapper.readTree(response).get("id").asText());


            AddTracksRequest body2 = new AddTracksRequest(playlist.getUrisList());
            spotifyApiClient.post("/playlists/" + playlist.getSpotifyId() + "/tracks", body2, String.class, accessToken);

            return ResponseEntity.ok(playlist);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(new SpotifyPlaylist(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<SpotifyPlaylist> getUserPlaylist(String accessToken, String id) {
        try {
            SpotifyPlaylist playlist = spotifyApiClient.get(
                    "playlists/" + id + "?fields=name, description, id, tracks.items(track(name,uri, id, duration_ms, artists))",
                    SpotifyPlaylist.class,
                    accessToken
            );

            playlist.getTrackIds().forEach(trackId -> playlist.getTracks().add(trackService.getTrackById(trackId)));

            return ResponseEntity.ok(playlist);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

}
