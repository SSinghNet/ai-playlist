export interface SpotifySession {
    user: {
        name: string;
        email: string;
        image: string;
    };
    expires: string;
    token: {
        access_token: string;
        email: string;
        exp: number;
        iat: number;
        jti: string;
        name: string;
        picture: string;
        sub: string;
    };
}
