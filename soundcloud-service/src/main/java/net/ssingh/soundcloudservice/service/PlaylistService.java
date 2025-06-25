package net.ssingh.soundcloudservice.service;

import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.soundcloudservice.model.entity.SoundCloudPlaylist;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {
    public ResponseEntity<SoundCloudPlaylist> generatePlaylist(GeneratePlaylistRequest request) {
        return ResponseEntity.ok(new SoundCloudPlaylist());
    }

    public ResponseEntity<SoundCloudPlaylist> createPlaylistForUser(SoundCloudPlaylist playlist, String accessToken) {
        return ResponseEntity.ok(new SoundCloudPlaylist());
    }

    public ResponseEntity<SoundCloudPlaylist> getUserPlaylist(String id, String accessToken) {
        return ResponseEntity.ok(new SoundCloudPlaylist());
    }
}
