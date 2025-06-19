package net.ssingh.spotifyservice.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import net.ssingh.spotifyservice.client.SpotifyApiClient;
import net.ssingh.spotifyservice.model.dto.external.spotify.response.profile.SavedTracks;
import net.ssingh.spotifyservice.model.dto.external.spotify.response.profile.TopArtists;
import net.ssingh.spotifyservice.model.dto.external.spotify.response.profile.TopTracks;
import net.ssingh.spotifyservice.model.entity.SpotifyArtist;
import net.ssingh.spotifyservice.model.entity.SpotifyPlaylistList;
import net.ssingh.spotifyservice.model.entity.SpotifyTrack;
import net.ssingh.spotifyservice.model.entity.SpotifyUser;
import net.ssingh.spotifyservice.model.enums.TimeRange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    private final SpotifyApiClient spotifyApiClient;
    private final ArtistService artistService;

    @Autowired
    public ProfileService(SpotifyApiClient spotifyApiClient, ArtistService artistService) {
        this.spotifyApiClient = spotifyApiClient;
        this.artistService = artistService;
    }

    public ResponseEntity<SpotifyUser> getProfile(String accessToken) {
        try {
            return ResponseEntity.ok(spotifyApiClient.get("me", SpotifyUser.class, accessToken));
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<List<SpotifyTrack>> getSavedTracks(String accessToken, int limit) {
        try {
            List<SpotifyTrack> tracks = spotifyApiClient.get(
                    "me/tracks?limit=" + limit,
                    SavedTracks.class,
                    accessToken
            ).getTracks();

            return ResponseEntity.ok(getAndSetEnrichedArtists(tracks));
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<List<SpotifyTrack>> getTopTracks(String accessToken, int limit, TimeRange timeRange) {
        try {
            List<SpotifyTrack> tracks = spotifyApiClient.get(
                    "me/top/tracks?time_range=" + timeRange.getValue() + "&limit=" + limit,
                    TopTracks.class,
                    accessToken
            ).getTracks();

            return ResponseEntity.ok(getAndSetEnrichedArtists(tracks));
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<List<SpotifyArtist>> getTopArtists(String accessToken, int limit, TimeRange timeRange) {
        try {
            return ResponseEntity.ok(spotifyApiClient.get(
                    "me/top/artists?time_range=" + timeRange.getValue() + "&limit=" + limit,
                    TopArtists.class,
                    accessToken
            ).getArtists());
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<SpotifyPlaylistList> getPlaylists(String accessToken, int limit, int offset) {
        try {
            SpotifyPlaylistList list = spotifyApiClient.get(
                    "me/playlists?limit=" + limit + "&offset=" + offset,
                    SpotifyPlaylistList.class,
                    accessToken
            );

            return ResponseEntity.ok(list);
        } catch (JsonProcessingException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    private List<SpotifyTrack> getAndSetEnrichedArtists(List<SpotifyTrack> tracks) {
        for (SpotifyTrack track : tracks) {
            ArrayList<SpotifyArtist> enrichedArtists = (ArrayList<SpotifyArtist>) track.getArtists().stream()
                    .map(a -> artistService.getArtist(a.getSpotifyId()))
                    .collect(Collectors.toList());
            track.setArtists(enrichedArtists);
        }

        return tracks;
    }


}
