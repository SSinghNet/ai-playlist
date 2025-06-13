package net.ssingh.spotifyservice.model.generic;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Playlist<T extends Track<?>> {

    private String title;
    private String description;
    private ArrayList<T> tracks;


    public ArrayList<T> getTracks() {
        if (tracks == null) {
            tracks = new ArrayList<T>();
        }
        return tracks;
    }

}
