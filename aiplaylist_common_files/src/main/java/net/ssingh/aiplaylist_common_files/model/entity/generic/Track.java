package net.ssingh.aiplaylist_common_files.model.entity.generic;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Track<T extends Artist> {

    @JsonAlias({"name", "title"})
    private String name;
    private ArrayList<T> artists;

    public void addArtist(T artist) {
        if (artists == null) {
            artists = new ArrayList<T>();
        }
        artists.add(artist);
    }

    @Override
    public String toString() {
        return "Track[" + "name='" + name + '\'' + ", artists=" + artists + ']';
    }

}
