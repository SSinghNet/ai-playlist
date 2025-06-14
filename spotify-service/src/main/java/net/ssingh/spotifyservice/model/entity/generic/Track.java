package net.ssingh.spotifyservice.model.generic;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Track<T extends Artist> {

    private String name;
    private ArrayList<T> artists;

    public void addArtist(T artist) {
        if (artists == null) {
            artists = new ArrayList<T>();
        }
        artists.add(artist);
    }

}
