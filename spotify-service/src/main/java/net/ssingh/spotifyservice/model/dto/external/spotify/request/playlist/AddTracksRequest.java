package net.ssingh.spotifyservice.model.dto.external.spotify.request.playlist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddTracksRequest implements Serializable {
    List<String> uris;
}
