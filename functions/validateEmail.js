const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const email = event.queryStringParameters.email;
    const ip = event.queryStringParameters.ip;
    const { data } = await axios({
      method: "get",
      url: "https://api.zerobounce.net/v2/validate",
      params: {
        api_key: process.env.REACT_APP_ZBAPI_KEY,
        email,
        ip_address: ip,
      },
      headers: {},
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
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
