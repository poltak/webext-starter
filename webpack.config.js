const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

function transformManifestVersion(content) {
    let manifest = JSON.parse(content.toString())
    manifest.version = process.env.npm_package_version
    return Buffer.from(JSON.stringify(manifest))
}

function createConfig({ buildingManifestV2 }) {
    let context = __dirname
    let mode = 'development'
    return {
        mode,
        context,
        devtool:
            mode === 'development' ? 'eval-source-map' : 'hidden-source-map',
        entry: {
            background: buildingManifestV2
                ? './src/background/index.mv2.ts'
                : './src/background/index.ts',
            popup: './src/popup/index.tsx',
            options: './src/options/index.tsx',
            content_script: './src/content-scripts/index.ts',
        },
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: buildingManifestV2
                            ? 'src/manifest.v2.json'
                            : 'src/manifest.json',
                        to: './manifest.json',
                        transform: transformManifestVersion,
                    },
                ],
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                src: path.resolve(context, './src'),
            },
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
    }
}

module.exports = createConfig({
    buildingManifestV2: process.env.MANIFEST_VERSION === '2',
})
