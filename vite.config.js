// vite.config.js (Əgər Viteişlədirsinizsə)
export default defineConfig({
  server: {
    proxy: {
      '/factcheck': {
        target: 'https://fact-checking-assistant.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/factcheck/, '')
      }
    }
  }
});

// Yaxud React komponentlərində
const response = await fetch('/factcheck', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ fact: searchText })
});