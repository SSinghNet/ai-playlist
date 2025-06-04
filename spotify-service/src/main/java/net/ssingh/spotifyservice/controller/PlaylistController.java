package net.ssingh.spotifyservice.controller;

import net.ssingh.spotifyservice.model.SpotifyPlaylist;
import net.ssingh.spotifyservice.model.SpotifyPlaylistRequest;
import net.ssingh.spotifyservice.service.PlaylistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("playlist")
public class PlaylistController {

    private final PlaylistService service;

    public PlaylistController(PlaylistService service) {
        this.service = service;
    }

    @GetMapping("/generate")
    public ResponseEntity<SpotifyPlaylist> generatePlaylist(@RequestParam String userPrompt, @RequestParam int playlistLength) {
        return service.generatePlaylist(userPrompt, playlistLength);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<SpotifyPlaylist> createPlaylist(@RequestBody SpotifyPlaylistRequest request) {
        return service.createPlaylistForUser(request.getPlaylist(), request.getAccessToken());
    }

}