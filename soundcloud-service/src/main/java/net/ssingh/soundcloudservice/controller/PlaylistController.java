package net.ssingh.soundcloudservice.controller;

import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.soundcloudservice.model.dto.request.playlist.CreatePlaylistRequest;
import net.ssingh.soundcloudservice.model.entity.SoundCloudPlaylist;
import net.ssingh.soundcloudservice.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/playlist")
public class PlaylistController {
    private final PlaylistService service;

    public PlaylistController(PlaylistService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public ResponseEntity<SoundCloudPlaylist> getGeneratedPlaylist(@RequestBody GeneratePlaylistRequest request) {
        return service.generatePlaylist(request);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<SoundCloudPlaylist> createPlaylistForUser(@RequestBody CreatePlaylistRequest request) {
        return service.createPlaylistForUser(request.getPlaylist(), request.getAccessToken());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SoundCloudPlaylist> getUserPlaylist(@PathVariable String id, @RequestBody String accessToken) {
        return service.getUserPlaylist(id, accessToken);
    }
}
