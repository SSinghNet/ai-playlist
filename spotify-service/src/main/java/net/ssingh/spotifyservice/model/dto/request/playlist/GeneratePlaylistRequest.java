package net.ssingh.spotifyservice.model.dto.request.playlist;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneratePlaylistRequest implements Serializable {
    String userPrompt;
    int playlistLength;
}
