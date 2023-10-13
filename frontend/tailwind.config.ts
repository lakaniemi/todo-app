/* eslint-disable import/no-extraneous-dependencies */
import formsPlugin from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [formsPlugin],
} satisfies Config;
