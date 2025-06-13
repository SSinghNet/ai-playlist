package net.ssingh.spotifyservice.model.generic;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Artist {
    @JsonProperty("name")
    private String name;

}
