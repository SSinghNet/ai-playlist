package net.ssingh.applemusicservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class AppleMusicServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(AppleMusicServiceApplication.class, args);
    }

}
