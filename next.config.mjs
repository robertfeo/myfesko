/** @type {import('next').NextConfig} */

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
            test: /\.handlebars$/,
            loader: "handlebars-loader",
        });
        config.resolve.alias['handlebars'] = resolve(__dirname, 'node_modules', 'handlebars', 'dist', 'handlebars.js');
        return config;
    },
};

export default nextConfig;
