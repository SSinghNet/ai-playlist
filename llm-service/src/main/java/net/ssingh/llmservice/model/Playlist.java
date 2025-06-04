package net.ssingh.llmservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Playlist {

    private String title;
    private String description;
    private List<Track> tracks;

}
