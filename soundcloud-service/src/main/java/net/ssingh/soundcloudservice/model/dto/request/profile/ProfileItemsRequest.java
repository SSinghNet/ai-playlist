package net.ssingh.soundcloudservice.model.dto.request.profile;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlaylistsRequest implements Serializable {
    @JsonProperty(required = true)
    String accessToken;
    @JsonProperty(required = true)
    int limit;
}
