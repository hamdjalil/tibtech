export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
  server: {
    // ... any existing server config
    allowedHosts: [
      'localhost',
      '*.ngrok-free.app', // This will allow all ngrok free subdomains
      // or specifically:
      // 'b785-36-255-33-176.ngrok-free.app'
    ]
  }
}