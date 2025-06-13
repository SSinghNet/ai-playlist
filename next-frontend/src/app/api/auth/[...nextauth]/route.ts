import NextAuth from "next-auth/next";
import {type NextAuthOptions} from "next-auth";
import SpotifyProvider from 'next-auth/providers/spotify';

const SCOPE = "user-read-private user-read-email playlist-modify-public user-top-read user-library-read"

const options: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            authorization:
                `https://accounts.spotify.com/authorize?scope=${SCOPE}`,
            clientId: process.env.SPOTIFY_CLIENT_ID || '',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
        }),
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