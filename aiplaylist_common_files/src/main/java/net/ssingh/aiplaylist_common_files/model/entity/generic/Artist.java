package net.ssingh.aiplaylist_common_files.model.entity.generic;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.Data;

@Data
public class Artist {
    @JsonAlias({"name", "username"})
    private String name;

    @Override
    public String toString() {
        return "artist [name=" + name + "]";
    }
}
