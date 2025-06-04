package net.ssingh.spotifyservice.controller;

import net.ssingh.spotifyservice.model.SpotifyUser;
import net.ssingh.spotifyservice.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class ProfileController {

    private final ProfileService service;

    public ProfileController(ProfileService service) {
        this.service = service;
    }

    @GetMapping({"", "/"})
    public ResponseEntity<SpotifyUser> me(@RequestParam String accessToken) {
        return service.me(accessToken);
    }

}
