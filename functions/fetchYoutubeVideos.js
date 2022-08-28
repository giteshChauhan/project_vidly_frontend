const axios = require("axios");

exports.handler = async function (event, context) {
  try {
    const keyword = event.queryStringParameters.q;
    const { data: videos } = await axios({
      method: "get",
      url: "https://youtube.googleapis.com/youtube/v3/search",
      params: {
        q: keyword,
        part: "snippet",
        maxResults: 4,
        key: process.env.REACT_APP_YTAPI_KEY,
      },
      headers: {},
    });

    return {
      statusCode: 200,
      body: JSON.stringify(videos),
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
