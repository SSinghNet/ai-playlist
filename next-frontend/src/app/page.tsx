import LoginWithProviders from "@/components/util/login-with-providers";

export default function Home() {
    return (
        <div>
            <div
                className="min-h-screen bg-gradient-to-br from-purple-400 via-indigo-800 to-card text-white flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-5xl rounded-2xl shadow-2xl bg-opacity-70 bg-card backdrop-blur-sm p-12 wrap-break-word">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6">SSingh.Net AI Playlist
                        Generator</h1>
                    <p className="text-center text-lg md:text-xl text-gray-300 mb-6">
                        Instantly create personalized playlists using the power of AI.
                    </p>
                    <p className={"text-center opacity-70 text-xs mb-2"}>
                        *Spotify login will only work if your account is manually whitelisted due to Spotify development API restrictions*
                    </p>
                    <div className={"flex items-center justify-center"}>
                        <LoginWithProviders/>
                    </div>
                </div>
            </div>
        </div>
    );
}