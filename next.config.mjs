/** @type {import('next').NextConfig} */

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Important: return the modified config
        // Add the handlebars-loader
        config.module.rules.push({
            test: /\.handlebars$/,
            loader: "handlebars-loader",
        });

        // Add an alias for handlebars to ensure the correct version is used
        config.resolve.alias['handlebars'] = resolve(__dirname, 'node_modules', 'handlebars', 'dist', 'handlebars.js');

        return config;
    },
};

export default nextConfig;
