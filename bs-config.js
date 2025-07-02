module.exports = {
  server: {
    baseDir: "./dist",
    routes: {
      "/": "./dist"
    }
  },
  files: [
    "dist/**/*"
  ],
  port: 8080,
  open: true,
  notify: false,
  reloadDelay: 100,
  reloadDebounce: 250,
  reloadThrottle: 0,
  ui: {
    port: 3001
  },
  ghostMode: {
    clicks: false,
    forms: false,
    scroll: false
  }
}; 