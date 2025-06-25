package net.ssingh.soundcloudservice.model.dto.external.soundcloud.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePlaylistRequest implements Serializable {
    private String title;
    private String description;
    private List<UrnMap> tracks;

    public void addTracks(List<String> tracks) {
        List<UrnMap> urnMaps = new ArrayList<>();
        for (String track : tracks) {
            urnMaps.add(new UrnMap(track));
        }
        this.tracks = urnMaps;
    }

    @AllArgsConstructor
    @Data
    private static class UrnMap {
        String urn;
    }
}
