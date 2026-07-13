import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        services: resolve(__dirname, "services.html"),
        gallery: resolve(__dirname, "gallery.html"),
        venues: resolve(__dirname, "venues.html"),
        contact: resolve(__dirname, "contact.html"),
        quoteBuilder: resolve(__dirname, "quote-builder.html"),
        admin: resolve(__dirname, "admin.html"),
        login: resolve(__dirname, "login.html"),
        account: resolve(__dirname, "account.html"),
        requestProposal: resolve(__dirname, "request-proposal.html"),
      },
    },
  },
});
