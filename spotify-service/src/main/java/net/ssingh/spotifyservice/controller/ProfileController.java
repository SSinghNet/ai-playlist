package net.ssingh.spotifyservice.controller;

import net.ssingh.spotifyservice.model.dto.request.profile.PlaylistsRequest;
import net.ssingh.spotifyservice.model.dto.request.profile.SavedItemsRequest;
import net.ssingh.spotifyservice.model.dto.request.profile.TopItemsRequest;
import net.ssingh.spotifyservice.model.entity.SpotifyArtist;
import net.ssingh.spotifyservice.model.entity.SpotifyPlaylistList;
import net.ssingh.spotifyservice.model.entity.SpotifyTrack;
import net.ssingh.spotifyservice.model.entity.SpotifyUser;
import net.ssingh.spotifyservice.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<SpotifyUser> getProfile(@RequestParam String accessToken) {
        return service.getProfile(accessToken);
    }

    @GetMapping("/savedTracks")
    public ResponseEntity<List<SpotifyTrack>> getSavedTracks(@ModelAttribute SavedItemsRequest request) {
        return service.getSavedTracks(request.getAccessToken(), request.getLimit());
    }

    @GetMapping("/playlists")
    public ResponseEntity<SpotifyPlaylistList> getPlaylists(@ModelAttribute PlaylistsRequest request) {
        return service.getPlaylists(request.getAccessToken(), request.getLimit(), request.getOffset());
    }

    @GetMapping("/top/tracks")
    public ResponseEntity<List<SpotifyTrack>> getTopTracks(@ModelAttribute TopItemsRequest request) {
        return service.getTopTracks(request.getAccessToken(), request.getLimit(), request.getTimeRange());
    }

    @GetMapping("/top/artists")
    public ResponseEntity<List<SpotifyArtist>> getTopArtists(@ModelAttribute TopItemsRequest request) {
        return service.getTopArtists(request.getAccessToken(), request.getLimit(), request.getTimeRange());
    }

}
