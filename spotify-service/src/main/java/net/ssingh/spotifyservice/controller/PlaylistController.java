package net.ssingh.spotifyservice.controller;

import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Artist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Playlist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Track;
import net.ssingh.spotifyservice.model.entity.SpotifyPlaylist;
import net.ssingh.spotifyservice.model.dto.request.playlist.CreatePlaylistRequest;
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

    @PostMapping("/generate")
    public ResponseEntity<SpotifyPlaylist> getGeneratedPlaylist(@RequestBody GeneratePlaylistRequest request) {
        return service.generatePlaylist(request);
    }

    @PostMapping({"", "/"})
    public ResponseEntity<SpotifyPlaylist> createPlaylistForUser(@RequestBody CreatePlaylistRequest request) {
        return service.createPlaylistForUser(request.getPlaylist(), request.getAccessToken());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpotifyPlaylist> getUserPlaylist(@PathVariable String id, @RequestParam String accessToken) {
        return service.getUserPlaylist(id, accessToken);
    }

    //todo: move somewhere else?
    @PostMapping("/generic")
    public ResponseEntity<Playlist<?>> getGenericPlaylistFromSpotifyPlaylist(@RequestBody Playlist<Track<Artist>> playlist) {
        return ResponseEntity.ok(playlist);
    }
}