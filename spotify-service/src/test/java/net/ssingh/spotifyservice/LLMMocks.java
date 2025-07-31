package net.ssingh.spotifyservice;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.io.IOException;

import static java.nio.charset.Charset.defaultCharset;
import static org.springframework.util.StreamUtils.copyToString;

public class LLMMocks {
    public static void setupMockLLMResponse(WireMockServer mockService) throws IOException {
        mockService.stubFor(WireMock.post(WireMock.urlEqualTo("/playlist/generate"))
                .willReturn(WireMock.aResponse()
                        .withStatus(HttpStatus.OK.value())
                        .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                        .withBody(
                                copyToString(
                                        LLMMocks.class.getClassLoader().getResourceAsStream("payload/generate-playlist-response.json"), defaultCharset()
                                ))));
    }
}
