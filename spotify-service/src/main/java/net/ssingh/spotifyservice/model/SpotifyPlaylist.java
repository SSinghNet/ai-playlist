package net.ssingh.spotifyservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SpotifyPlaylist extends Playlist<SpotifyTrack> {

    private String spotifyId;

    public List<String> getUrisList() {
        List<SpotifyTrack> tracks = this.getTracks(); // Safe cast now
        List<String> uris = new ArrayList<>();

        if (tracks != null && !tracks.isEmpty()) {
            for (SpotifyTrack track : tracks) {
                uris.add(track.getUri());
            }
        }

        return uris;
    }


}
