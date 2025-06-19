package net.ssingh.spotifyservice.model.dto.request.profile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import net.ssingh.spotifyservice.model.enums.TimeRange;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopItemsRequest implements Serializable {
    String accessToken;
    int limit;
    TimeRange timeRange;
}
