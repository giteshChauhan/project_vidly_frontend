const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const tconst = event.queryStringParameters.id;
    const { data: overview } = await axios({
      method: "GET",
      url: "https://online-movie-database.p.rapidapi.com/title/get-overview-details",
      params: { tconst },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(overview),
    };
  } catch (error) {
    if (error.response) {
      const { status, statusText, headers, data } = error.response;
      return {
        statusCode: status,
        body: JSON.stringify({ status, statusText, headers, data }),
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
