const config = require("../config/config");

const accountSid = config.twillio.twillio_account_sid;
const authToken = config.twillio.twillio_auth_token;
const client = require("twilio")(accountSid, authToken);

const sendMessage = async (data) => {
  return await client.messages
    .create({
      body: data.content,
      from: config.twillio.twillio_phone_no,
      to: data.to,
    })
    .then((message) => {
      return {
        success: true,
        message: message,
      };
    })
    .catch((error) => {
      return {
        success: false,
        message: error.code,
      };
    });
};

module.exports = sendMessage;
