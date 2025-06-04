package net.ssingh.llmservice.controller;

import net.ssingh.llmservice.model.Playlist;
import net.ssingh.llmservice.service.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("playlist")
public class PlaylistController {

    private final PlaylistService service;

    @Autowired
    public PlaylistController(PlaylistService service) {
        this.service = service;
    }

    @GetMapping("/generate")
    public ResponseEntity<Playlist> generatePlaylist(@RequestParam String userPrompt,@RequestParam int playlistLength) {
        return service.generatePlaylist(userPrompt, playlistLength);
    }
}
