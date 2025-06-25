package net.ssingh.soundcloudservice.model.entity;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Artist;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SoundCloudArtist extends Artist {
    String urn;
    @JsonAlias("permalink_url")
    String url;

    @JsonAlias("avatar_url")
    String imageUrl;
}
