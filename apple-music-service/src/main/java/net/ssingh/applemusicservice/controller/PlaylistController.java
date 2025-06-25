package net.ssingh.applemusicservice.controller;

import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.applemusicservice.model.dto.request.playlist.CreatePlaylistRequest;
import net.ssingh.applemusicservice.model.entity.AppleMusicPlaylist;
import net.ssingh.applemusicservice.service.PlaylistService;
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
    public ResponseEntity<AppleMusicPlaylist> getGeneratedPlaylist(@RequestBody GeneratePlaylistRequest request) {
        return service.generatePlaylist(request);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<AppleMusicPlaylist> createPlaylistForUser(@RequestBody CreatePlaylistRequest request) {
        return service.createPlaylistForUser(request.getPlaylist(), request.getMusicUserToken());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AppleMusicPlaylist> getUserPlaylist(@PathVariable String id, @RequestBody String musicUserToken) {
        return service.getUserPlaylist(id, musicUserToken);
    }
}
