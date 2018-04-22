module.exports = options => ({
  entry: './src/index.js',
  staticFolder: 'public',
  html: {
    template: './src/index.html'
  },
  port:3000,
  devServer:{
    proxy:'http://192.168.10.33:3000/'
  }
})
