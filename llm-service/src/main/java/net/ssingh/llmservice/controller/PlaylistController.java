package net.ssingh.llmservice.controller;

import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Artist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Playlist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Track;
import net.ssingh.llmservice.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("playlist")
public class PlaylistController {

    private final PlaylistService service;

    @Autowired
    public PlaylistController(PlaylistService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public ResponseEntity<Playlist<Track<Artist>>> generatePlaylist(@RequestBody GeneratePlaylistRequest request) {
        return service.generatePlaylist(request);
    }
}
