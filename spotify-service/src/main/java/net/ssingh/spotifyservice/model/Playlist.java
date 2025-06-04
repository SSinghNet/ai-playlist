package net.ssingh.spotifyservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Playlist<T extends Track<?>> {

    private String title;
    private String description;
    private List<T> tracks;

}
