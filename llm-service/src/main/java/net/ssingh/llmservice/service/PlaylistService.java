package net.ssingh.llmservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.ssingh.llmservice.model.Playlist;
import net.ssingh.llmservice.util.PromptLoader;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class PlaylistService {

    private final OpenAiChatModel chatModel;
    private final PromptLoader promptLoader;

    @Autowired
    public PlaylistService(OpenAiChatModel chatModel, PromptLoader promptLoader) {
        this.chatModel = chatModel;
        this.promptLoader = promptLoader;
    }

    public ResponseEntity<Playlist> generatePlaylist(String userPrompt, int playlistLength) {
        if (userPrompt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        int playlistMinLength = 5;
        int playlistMaxLength = 50;
        if ( ! (playlistMinLength <= playlistLength && playlistLength <= playlistMaxLength) ) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            String playlistGenPrompt = promptLoader.load("playlist-gen.txt")
                    .replace("{{lower-length}}", String.valueOf(playlistLength))
                    .replace("{{higher-length}}", String.valueOf(playlistLength + 2));

            SystemMessage systemMessage = new SystemMessage(playlistGenPrompt);

            String userPromptTemplate = "Create a playlist based on this prompt: {user_prompt}";
            PromptTemplate promptTemplate = new PromptTemplate(userPromptTemplate);
            Message userMessage = promptTemplate.createMessage(Map.of("user_prompt", userPrompt));

            Prompt prompt = new Prompt(List.of(systemMessage, userMessage));

            Playlist playlist = new ObjectMapper().readValue(chatModel.call(prompt).getResult().getOutput().getText().replaceAll("```json", "").replaceAll("```", ""), Playlist.class);

            return new ResponseEntity<>(playlist, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
