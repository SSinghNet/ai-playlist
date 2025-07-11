package net.ssingh.aiplaylist_common_files.model.entity.generic;


import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Playlist<T extends Track<?>> {


    @JsonAlias({"name", "title"})
    private String title;
    private String description;
    @JsonProperty("tracks")
    private ArrayList<T> tracks;


    public ArrayList<T> getTracks() {
        if (tracks == null) {
            tracks = new ArrayList<T>();
        }
        return tracks;
    }

}
