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
        config.externals = [...config.externals, 'bcrypt'];
        config.resolve.alias['handlebars'] = resolve(__dirname, 'node_modules', 'handlebars', 'dist', 'handlebars.js');
        config.resolve = {
            ...config.resolve,
            fallback: {
                "fs": false,
                "path": false,
                "os": false,
            }
        };
        return config;
    },
    output: "standalone",
};

export default nextConfig;
