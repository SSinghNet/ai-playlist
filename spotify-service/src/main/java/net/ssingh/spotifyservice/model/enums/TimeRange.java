package net.ssingh.spotifyservice.model;

public enum TimeRange {
    LONG_TERM("long_term"),
    MEDIUM_TERM("medium_term"),
    SHORT_TERM("short_term");

    private final String value;

    TimeRange(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
