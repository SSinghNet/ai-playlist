package net.ssingh.spotifyservice.client;

import net.ssingh.spotifyservice.model.SpotifyPlaylist;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name="LLM-SERVICE")
public interface LLMClient {
    @GetMapping("playlist/generate")
    ResponseEntity<SpotifyPlaylist> generatePlaylist(@RequestParam String userPrompt, @RequestParam int playlistLength);
}
