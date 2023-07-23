/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["avatars.steamstatic.com", "community.cloudflare.steamstatic.com", "steamcdn-a.akamaihd.net"]
    }
}

module.exports = nextConfig
