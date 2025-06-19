package net.ssingh.spotifyservice.service;

import net.ssingh.spotifyservice.client.SpotifyApiClient;
import net.ssingh.spotifyservice.model.dto.external.spotify.response.track.TrackSearch;
import net.ssingh.spotifyservice.model.entity.spotify.SpotifyArtist;
import net.ssingh.spotifyservice.model.entity.spotify.SpotifyTrack;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrackService {

    private final SpotifyApiClient client;
    private final ArtistService artistService;

    @Lazy
    @Autowired
    public TrackService(SpotifyApiClient client, ArtistService artistService) {
        this.client = client;
        this.artistService = artistService;
    }

    public SpotifyTrack getTrackById(String id) {
        try {
            SpotifyTrack track = client.get(
                    "tracks/" + id,
                    SpotifyTrack.class
            );

            if (track == null) {
                return null;
            }

            ArrayList<SpotifyArtist> enrichedArtists = (ArrayList<SpotifyArtist>) track.getArtists().stream()
                    .map(a -> artistService.getArtist(a.getSpotifyId()))
                    .collect(Collectors.toList());

            track.setArtists(enrichedArtists);

            return track;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new SpotifyTrack();
        }
    }

    public SpotifyTrack getTrackBySearch(String trackName, String artistName) {
        return getTrackBySearch("track:" + trackName + " artist:" + artistName);
    }

    public SpotifyTrack getTrackBySearch(String query) {
        try {
            SpotifyTrack track = client.get(
                    "search?q=" + query + "&type=track&limit=1",
                    TrackSearch.class
            ).getTrack();

            if (track == null) {
                return null;
            }

            ArrayList<SpotifyArtist> enrichedArtists = (ArrayList<SpotifyArtist>) track.getArtists().stream()
                    .map(a -> artistService.getArtist(a.getSpotifyId()))
                    .collect(Collectors.toList());

            track.setArtists(enrichedArtists);

            return track;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new SpotifyTrack();
        }
    }
}
