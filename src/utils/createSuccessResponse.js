const createSuccessResponse = ({
  res,
  data = null,
  status = 200,
  message = "Succesful",
}) => {
  switch (status) {
    case 200:
      return res.status(status).send({ data, message, success: true });

    case 400:
      return res
        .status(status)
        .send({ data, message: "Bad request", success: false });

    case 401:
      return res
        .status(status)
        .send({ data, message: "User is not authorized", success: false });

    case 500:
      return res
        .status(status)
        .send({ data, message: "Server is not respond", success: false });

    default:
      break;
  }
};

module.exports = { createSuccessResponse };
