package net.ssingh.soundcloudservice.client;

import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Artist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Playlist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Track;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="LLM-SERVICE")
public interface LLMClient {
    @PostMapping("playlist/generate")
    ResponseEntity<Playlist<Track<Artist>>> generatePlaylist(@RequestBody GeneratePlaylistRequest request);
}
