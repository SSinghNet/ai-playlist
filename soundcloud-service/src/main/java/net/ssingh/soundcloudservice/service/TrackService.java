package net.ssingh.soundcloudservice.service;

import net.ssingh.soundcloudservice.client.SoundCloudApiClient;
import net.ssingh.soundcloudservice.model.entity.SoundCloudTrack;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackService {

    private final SoundCloudApiClient soundcloudApiClient;

    public TrackService(SoundCloudApiClient soundcloudApiClient) {
        this.soundcloudApiClient = soundcloudApiClient;
    }

    public SoundCloudTrack getTrackBySearch(String trackName, String artistName) {
        return getTrackBySearch(trackName + " " + artistName);
    }

    public SoundCloudTrack getTrackBySearch(String query) {
        try {
            return soundcloudApiClient.get("tracks?limit=1&q=" + query,
                    new ParameterizedTypeReference<List<SoundCloudTrack>>() {})
                    .get(0);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new SoundCloudTrack();
        }
    }
}
