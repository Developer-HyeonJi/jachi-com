/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}", // 이 경로를 추가
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};