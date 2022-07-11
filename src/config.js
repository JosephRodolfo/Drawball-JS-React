const prod = {
  url: {
    API_URL: "https://drawball-backend-enderle.herokuapp.com",
    HOST_URL: "https://josephrodolfo.github.io/Drawball-JS-React",
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:2000",
    HOST_URL: "http://localhost:3000",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
