package net.ssingh.soundcloudservice.controller;

import net.ssingh.soundcloudservice.model.dto.request.profile.ProfileItemsRequest;
import net.ssingh.soundcloudservice.model.entity.SoundCloudPlaylist;
import net.ssingh.soundcloudservice.model.entity.SoundCloudTrack;
import net.ssingh.soundcloudservice.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping("/savedTracks")
    public ResponseEntity<List<SoundCloudTrack>> getSavedTracks(@ModelAttribute ProfileItemsRequest request) {
        return service.getSavedTracks(request.getAccessToken(), request.getLimit());
    }

    @GetMapping("/playlists")
    public ResponseEntity<List<SoundCloudPlaylist>> getPlaylists(@ModelAttribute ProfileItemsRequest request) {
        return service.getPlaylists(request.getAccessToken(), request.getLimit());
    }
}
