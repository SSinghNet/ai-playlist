package net.ssingh.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringCloudConfiguration {
    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("spotifyModule", r -> r.path("/spotify/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://SPOTIFY-SERVICE")
                )
                .route("soundcloudModule", r -> r.path("/soundcloud/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://SOUNDCLOUD-SERVICE")
                )
                .build();
    }
}
