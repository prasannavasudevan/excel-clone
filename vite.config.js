import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
  alias: {
    '@': '/src',
  },
  css: {
    preprocessorOptions: {
      css: {
        additionalData: `@import "./App.css";`,
      },
    },
  },
};
