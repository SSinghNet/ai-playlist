package net.ssingh.spotifyservice.model.dto.request.profile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SavedItemsRequest implements Serializable {
    String accessToken;
    int limit;
}
