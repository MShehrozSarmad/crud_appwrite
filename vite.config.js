// vite.config.js
export default {
    build: {
      rollupOptions: {
        input: {
          main: '/index.html',
          login: '/login.html',
          signup: '/signup.html'
        }
      }
    }
  }