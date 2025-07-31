package net.ssingh.soundcloudservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Artist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Playlist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Track;
import net.ssingh.soundcloudservice.client.LLMClient;
import net.ssingh.soundcloudservice.client.SoundCloudApiClient;
import net.ssingh.soundcloudservice.model.dto.external.soundcloud.request.CreatePlaylistRequest;
import net.ssingh.soundcloudservice.model.entity.SoundCloudPlaylist;
import net.ssingh.soundcloudservice.model.entity.SoundCloudTrack;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class PlaylistService {

    private final LLMClient llmClient;
    private final SoundCloudApiClient soundCloudApiClient;
    private final TrackService trackService;

    public PlaylistService(LLMClient llmClient, SoundCloudApiClient soundCloudApiClient, TrackService trackService) {
        this.llmClient = llmClient;
        this.soundCloudApiClient = soundCloudApiClient;
        this.trackService = trackService;
    }

    public ResponseEntity<SoundCloudPlaylist> generatePlaylist(GeneratePlaylistRequest request) {
        try {
            Playlist<Track<Artist>> playlist = llmClient.generatePlaylist(request).getBody();
            assert playlist != null;
            SoundCloudPlaylist scPlaylist = SoundCloudPlaylist.builder()
                    .title(playlist.getTitle())
                    .description(playlist.getDescription())
                    .build();

            int count = 1;

            for (int i = 0; i <= playlist.getTracks().size()
                    && scPlaylist.getTracks().size() < request.getPlaylistLength(); i++) {

                if (i == playlist.getTracks().size()) {
                    playlist = llmClient.generatePlaylist(request).getBody();
                    i = 0;
                    count++;
                }

                if (count > 3) {
                    return new ResponseEntity<>(scPlaylist, HttpStatus.OK);
                }

                Track<Artist> track = Objects.requireNonNull(playlist).getTracks().get(i);
                if (track == null) {
                    continue;
                }

                SoundCloudTrack newTrack = trackService.getTrackBySearch(
                        track.getName(), (track.getArtists().get(0)).getName()
                );

                if (newTrack != null
                        && newTrack.getName() != null
                        && newTrack.getUrn() != null
                        && (newTrack.getName().toLowerCase().contains(track.getName().toLowerCase())
                        || track.getName().toLowerCase().contains(newTrack.getName().toLowerCase()))
                        && !scPlaylist.containsTrack(newTrack)
                ) {
                    scPlaylist.getTracks().add(newTrack);
                }

            }

            return ResponseEntity.ok(scPlaylist);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<SoundCloudPlaylist> createPlaylistForUser(SoundCloudPlaylist playlist, String accessToken) {
        try {
            CreatePlaylistRequest body = CreatePlaylistRequest.builder()
                    .title(playlist.getTitle())
                    .description(playlist.getDescription())
                    .build();
            body.addTracks(playlist.getTrackUrns());

            String response = soundCloudApiClient.post("/playlists", body, String.class, accessToken);

            ObjectMapper mapper = new ObjectMapper();
            playlist.setUrn(mapper.readTree(response).get("urn").asText());
            playlist.setUrl(mapper.readTree(response).get("permalink_url").asText());

            return ResponseEntity.ok(playlist);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<SoundCloudPlaylist> getUserPlaylist(String urn, String accessToken) {
        try {
            SoundCloudPlaylist playlist = soundCloudApiClient.get(
                    "playlists/" + urn,
                    SoundCloudPlaylist.class,
                    accessToken
            );

            return ResponseEntity.ok(playlist);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
