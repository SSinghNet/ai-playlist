package net.ssingh.spotifyservice.model.dto.request.profile;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ssingh.spotifyservice.model.enums.TimeRange;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopItemsRequest implements Serializable {
    @JsonProperty(required = true)
    String accessToken;
    @JsonProperty(required = true)
    int limit;
    @JsonProperty(required = true)
    TimeRange timeRange;
}
