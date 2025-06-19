package net.ssingh.llmservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import net.ssingh.aiplaylist_common_files.model.dto.request.playlist.GeneratePlaylistRequest;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Artist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Playlist;
import net.ssingh.aiplaylist_common_files.model.entity.generic.Track;
import net.ssingh.llmservice.util.PromptLoader;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import static java.lang.Math.floor;

@Service
public class PlaylistService {

    private final OpenAiChatModel chatModel;
    private final PromptLoader promptLoader;

    @Autowired
    public PlaylistService(OpenAiChatModel chatModel, PromptLoader promptLoader) {
        this.chatModel = chatModel;
        this.promptLoader = promptLoader;
    }

    public ResponseEntity<Playlist<Track<Artist>>> generatePlaylist(GeneratePlaylistRequest request) {
        if (request.getUserPrompt().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        int playlistMinLength = 5;
        int playlistMaxLength = 25;
        if (!(playlistMinLength <= request.getPlaylistLength() && request.getPlaylistLength() <= playlistMaxLength)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Double requestTemp = request.getTemperature();
        double temperature = 0.7;
        if (requestTemp != null) {
            if (requestTemp > 1 || requestTemp < 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            temperature = requestTemp;
        }

        Double requestNicheSlider = request.getNicheSlider();
        double nicheSlider = 0.2;
        if (requestNicheSlider != null) {
            if (requestNicheSlider > 1 || requestNicheSlider < 0) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            nicheSlider = requestNicheSlider;
        }

        try {
            OpenAiChatOptions chatOptionsFast = OpenAiChatOptions
                    .builder()
                    .model("gemini-2.0-flash")
                    .maxTokens(100)
                    .build();
            ChatClient chatClientFast = ChatClient.builder(chatModel).build();
            double nicheRating = Double.parseDouble(Objects.requireNonNull(
                    chatClientFast
                            .prompt(
                                    promptLoader.load("niche.txt").replace("{{user_prompt}}", request.getUserPrompt())
                            )
                            .options(chatOptionsFast)
                            .call()
                            .content()
            ));

            String playlistGenPrompt = promptLoader.load("playlist-gen.txt")
                    .replaceAll("\\{\\{exact-length}}", String.valueOf(floor(request.getPlaylistLength() * nicheRating)))
                    .replaceAll("\\{\\{niche_slider_value}}", String.valueOf(nicheSlider));

            SystemMessage systemMessage = new SystemMessage(playlistGenPrompt);

            String userPromptTemplate = "Create a playlist based on this prompt: {user_prompt}";

            if (request.getTracks() != null && !request.getTracks().isEmpty()) {
                userPromptTemplate += " \n " + promptLoader.load("include-tracks.txt")
                        .replace("{{tracks}}", request.getTracks().toString());
            }

            if (request.getArtists() != null && !request.getArtists().isEmpty()) {
                userPromptTemplate += " \n " + promptLoader.load("include-artists.txt")
                        .replace("{{artists}}", request.getArtists().toString());
            }

            PromptTemplate promptTemplate = new PromptTemplate(userPromptTemplate);
            Message userMessage = promptTemplate.createMessage(Map.of("user_prompt", request.getUserPrompt()));

            Prompt prompt = new Prompt(List.of(systemMessage, userMessage));

            OpenAiChatOptions chatOptions = OpenAiChatOptions
                    .builder()
                    .temperature(temperature)
                    .maxTokens(50_000)
                    .build();
            ChatClient chatClient = ChatClient.builder(chatModel).build();
            Playlist<Track<Artist>> playlist = new ObjectMapper().readValue(
                    chatClient
                            .prompt(prompt)
                            .options(chatOptions)
                            .call()
                            .content()
                            .replaceAll("```json", "")
                            .replaceAll("```", ""),
                    Playlist.class);

            return new ResponseEntity<>(playlist, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
