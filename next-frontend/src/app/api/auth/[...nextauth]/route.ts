import NextAuth from "next-auth/next";
import {type NextAuthOptions} from "next-auth";
import SpotifyProvider from 'next-auth/providers/spotify';
import {TokenSetParameters} from "openid-client";

const SCOPE = "user-read-private user-read-email playlist-modify-public user-top-read user-library-read"

const options: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            authorization:
                `https://accounts.spotify.com/authorize?scope=${SCOPE}`,
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
        }),
        {
            authorization: {
                url: "https://secure.soundcloud.com/authorize",
                params: {
                    response_type: "code",
                },
            },
            token: {
                url: "https://secure.soundcloud.com/oauth/token",
                params: {
                    grant_type: "authorization_code",
                },
                async request(context): Promise<{ tokens: TokenSetParameters; }>  {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    const body = new URLSearchParams({
                        grant_type: context.params.grant_type,
                        client_id: process.env.SOUNDCLOUD_CLIENT_ID!,
                        client_secret: process.env.SOUNDCLOUD_CLIENT_SECRET!,
                        redirect_uri: context.provider.callbackUrl,
                        code: context.params.code,
                        code_verifier: context.checks.code_verifier,
                    });

                    const response = await fetch("https://secure.soundcloud.com/oauth/token", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: body.toString(),
                    });

                    const data = await response.json();
                    return {tokens: data as TokenSetParameters};
                },
            },
            clientId: process.env.SOUNDCLOUD_CLIENT_ID || '',
            clientSecret: process.env.SOUNDCLOUD_CLIENT_SECRET,
            type: "oauth",
            version: "2.0",
            id: "soundcloud",
            name: "SoundCloud",
            userinfo: "https://api.soundcloud.com/me",
            profile(profile) {
                console.log(profile);
                return {
                    id: profile.urn,
                    name: profile.username,
                    image: profile.avatar_url
                }
            },
            checks: ["pkce", "state"],
        }
    ],
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.access_token = account.access_token;
            }
            return token;
        },
        async session({session, token}) {
            return {
                ...session,
                token
            };
        },
    }
}


const handler = NextAuth(options);

export {handler as GET, handler as POST};