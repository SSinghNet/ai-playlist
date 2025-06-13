package net.ssingh.spotifyservice.model.spotify;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.ssingh.spotifyservice.model.generic.Playlist;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
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


    public boolean containsTrack(SpotifyTrack track) {
        for(SpotifyTrack t : this.getTracks()){
            if(track.getUri().equals(t.getUri())){
                return true;
            }
        }
        return false;
    }


}
