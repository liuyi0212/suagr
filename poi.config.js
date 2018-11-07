module.exports = options => ({
    entry: './src/index.js',
    staticFolder: 'public',
    html: {
        template: './src/index.html'
    },
    homepage: options.mode === 'production' ? '/sugar/' : '/',
    port: 3000,
    // devServer: {
    //     proxy: 'http://192.168.10.33:3000/'
    // }
})
