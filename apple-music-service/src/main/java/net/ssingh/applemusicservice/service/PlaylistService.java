package net.ssingh.applemusicservice.service;

import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.applemusicservice.client.LLMClient;
import net.ssingh.applemusicservice.model.entity.AppleMusicPlaylist;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class PlaylistService {

    private final LLMClient llmClient;

    public PlaylistService(LLMClient llmClient) {
        this.llmClient = llmClient;
    }

    public ResponseEntity<AppleMusicPlaylist> generatePlaylist(GeneratePlaylistRequest request) {
        return ResponseEntity.ok(null);
    }

    public ResponseEntity<AppleMusicPlaylist> createPlaylistForUser(AppleMusicPlaylist playlist, String musicUserToken) {
        return ResponseEntity.ok(null);
    }

    public ResponseEntity<AppleMusicPlaylist> getUserPlaylist(String id, String musicUserToken) {
        return ResponseEntity.ok(null);
    }
}
