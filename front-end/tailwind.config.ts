import daisyui from 'daisyui';  // اضافه کردن DaisyUI

const tailwindConfig = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [daisyui],  // اضافه کردن DaisyUI به عنوان پلاگین
};

export default tailwindConfig;
