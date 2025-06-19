package net.ssingh.spotifyservice.model.dto.external.spotify.request.playlist;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor

public class CreatePlaylistRequest implements Serializable {
    String name;
    String description;
}
