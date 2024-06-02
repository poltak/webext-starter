const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin')
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
            mode === 'development'
                ? 'inline-cheap-module-source-map'
                : 'hidden-source-map',
        entry: {
            background: buildingManifestV2
                ? './src/background/index.mv2.ts'
                : './src/background/index.mv3.ts',
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
                    {
                        from: 'node_modules/webextension-polyfill/dist/browser-polyfill.js',
                        to: 'lib/',
                    },
                    { from: 'img', to: 'img' },
                ],
            }),
            new HtmlPlugin({
                title: 'Popup',
                chunks: ['popup'],
                filename: 'popup.html',
                template: path.resolve(
                    context,
                    'src/popup/index.template.html',
                ),
            }),
            new HtmlPlugin({
                title: 'Web Ext Options',
                chunks: ['options'],
                filename: 'options.html',
                template: path.resolve(
                    context,
                    'src/options/index.template.html',
                ),
            }),
            new HtmlWebpackTagsPlugin({
                append: false,
                tags: ['lib/browser-polyfill.js'],
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
