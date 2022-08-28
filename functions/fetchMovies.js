const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const q = event.queryStringParameters.title;
    const country = event.queryStringParameters.country;
    const { data: movies } = await axios.request({
      method: "get",
      url: "https://online-movie-database.p.rapidapi.com/title/v2/find",
      params: {
        title: q,
        limit: "4",
        sortArg: "moviemeter,asc",
        primaryCountry: country,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY,
        "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(movies),
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
