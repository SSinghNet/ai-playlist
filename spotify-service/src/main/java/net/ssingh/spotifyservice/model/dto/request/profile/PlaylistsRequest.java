package net.ssingh.spotifyservice.model.dto.request.profile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistsRequest implements Serializable {
    String accessToken;
    int limit;
    int offset;
}