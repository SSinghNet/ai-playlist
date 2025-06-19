package net.ssingh.spotifyservice.model.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Playlist;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SpotifyPlaylist extends Playlist<SpotifyTrack> {

    @JsonAlias({"id", "spotifyId"})
    private String spotifyId;
    private List<String> trackIds;

    public List<String> getUrisList() {
        List<SpotifyTrack> tracks = this.getTracks();
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

    @JsonProperty("tracks")
    public void unpackTracks(Map<String, Object> itemMap) {
        trackIds = new ArrayList<>();
        ((List<Map<String, Object>>) itemMap.get("items")).forEach(obj ->
            trackIds.add(((Map<String, Object>) obj.get("track")).get("id").toString())
        );

    }

    @JsonProperty("tracks")
    public void unpackTracks(ArrayList<SpotifyTrack> tracks) {
        setTracks(tracks);
    }


}
