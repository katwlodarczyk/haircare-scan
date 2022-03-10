module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-purple": "#9764C7",
        "brand-pink": "#F2AEE7",
        "brand-nude": "#F8F5F7",
        "brand-pale": "#FDFDFD",
      },
      fontSize: {
        xxxs: "10px",
      },
      fontFamily: {
        koho: "KoHo",
      },
      width: {
        37: "9.375rem",
      },
      minWidth: {
        56: "14rem",
      },
      height: {
        37: "9.375rem",
      },
      boxShadow: {
        purple: "box-shadow: 0px 4px 8px rgba(151, 100, 199, 0.18)",
      },
    },
  },
  plugins: [],
};
