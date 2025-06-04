package net.ssingh.spotifyservice.service;

import net.ssingh.spotifyservice.client.SpotifyApiClient;
import net.ssingh.spotifyservice.model.Artist;
import net.ssingh.spotifyservice.model.SpotifyArtist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtistService {

    private final SpotifyApiClient client;

    @Autowired
    public ArtistService(SpotifyApiClient client) {
        this.client = client;
    }

    public SpotifyArtist getArtist(String id) {
        try {
            return client.get("artists/" + id, SpotifyArtist.class);
        } catch (Exception e) {
            return new SpotifyArtist();
        }
    }
}
