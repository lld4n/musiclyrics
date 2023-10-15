// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        404: resolve(__dirname, '404.html'),
        album: resolve(__dirname, 'album.html'),
        artist: resolve(__dirname, 'artist.html'),
        liked: resolve(__dirname, 'liked.html'),
        search: resolve(__dirname, 'search.html'),
        track: resolve(__dirname, 'track.html'),
        nothing: resolve(__dirname, 'nothing.html'),
      },
    },
  },
});
