package net.ssingh.spotifyservice.model.enums;

import lombok.Getter;

@Getter
public enum TimeRange {
    LONG_TERM("long_term"), // 1 year
    MEDIUM_TERM("medium_term"), //6 months
    SHORT_TERM("short_term"); // 4 weeks

    private final String value;

    TimeRange(String value) {
        this.value = value;
    }

}
