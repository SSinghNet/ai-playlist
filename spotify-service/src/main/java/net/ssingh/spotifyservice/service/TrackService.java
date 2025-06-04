package net.ssingh.spotifyservice.service;

import net.ssingh.spotifyservice.client.SpotifyApiClient;
import net.ssingh.spotifyservice.model.SpotifyArtist;
import net.ssingh.spotifyservice.model.SpotifyTrack;
import net.ssingh.spotifyservice.model.Track;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TrackService {

    private final SpotifyApiClient client;
    private final ArtistService artistService;

    @Autowired
    public TrackService(SpotifyApiClient client, ArtistService artistService) {
        this.client = client;
        this.artistService = artistService;
    }

    public SpotifyTrack getTrackBySearch(String query) {
        try {
            SpotifyTrack track = client.get("search?q=" + query + "&type=track&limit=1", SpotifyTrack.class);
            for (String artistId : track.getArtistIds()) {
                track.addArtist(artistService.getArtist(artistId));
            }
            return track;
        } catch (Exception e) {
            return new SpotifyTrack();
        }
    }
}
