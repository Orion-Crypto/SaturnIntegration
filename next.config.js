/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    webpack: (config) => {
        // The below are required for the cardano serialization library
        config.experiments.asyncWebAssembly = true;
        config.experiments.topLevelAwait = true;
        config.module.exprContextCritical = false;

        // Important: return the modified config
        return config;
    },
};

module.exports = nextConfig;
