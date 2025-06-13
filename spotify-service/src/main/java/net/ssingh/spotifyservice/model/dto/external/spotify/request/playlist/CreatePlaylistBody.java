package net.ssingh.spotifyservice.model.dto.external.spotify;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor

public class CreatePlaylistRequestBody implements Serializable {
    String name;
    String description;
}
