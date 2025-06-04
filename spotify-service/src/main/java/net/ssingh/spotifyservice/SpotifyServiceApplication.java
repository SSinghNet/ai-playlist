package net.ssingh.spotifyservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SpotifyServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpotifyServiceApplication.class, args);
    }

}
