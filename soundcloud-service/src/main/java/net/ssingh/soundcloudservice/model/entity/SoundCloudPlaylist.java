package net.ssingh.soundcloudservice.model.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Playlist;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class SoundCloudPlaylist extends Playlist<SoundCloudTrack> {
    String urn;
    @JsonAlias("permalink_url")
    String url;

    public boolean containsTrack(SoundCloudTrack track) {
        for(SoundCloudTrack t : this.getTracks()){
            if(track.getUrn().equals(t.getUrn())){
                return true;
            }
        }
        return false;
    }

    public List<String> getTrackUrns(){
        return this.getTracks()
                .stream()
                .map(SoundCloudTrack::getUrn)
                .collect(Collectors.toList());
    }
}
