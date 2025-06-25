import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL("https://i.scdn.co/**"),
            new URL("https://i1.sndcdn.com/**"),
            new URL("https://a1.sndcdn.com/**")
        ]
    }
};

export default nextConfig;
