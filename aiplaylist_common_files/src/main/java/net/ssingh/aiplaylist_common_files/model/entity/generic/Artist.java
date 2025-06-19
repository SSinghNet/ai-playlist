package net.ssingh.aiplaylist_common_files.model.entity.generic;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Artist {
    @JsonProperty("name")
    private String name;

    @Override
    public String toString() {
        return "artist [name=" + name + "]";
    }
}
