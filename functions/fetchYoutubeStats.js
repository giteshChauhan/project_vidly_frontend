const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const ytId = event.queryStringParameters.id;
    const { data: stats } = await axios({
      method: "get",
      url: "https://www.googleapis.com/youtube/v3/videos",
      params: {
        part: "statistics",
        id: ytId,
        key: process.env.REACT_APP_YTAPI_KEY,
      },
      headers: {},
    });

    return {
      statusCode: 200,
      body: JSON.stringify(stats),
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
