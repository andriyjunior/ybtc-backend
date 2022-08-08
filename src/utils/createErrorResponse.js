const createErrorResponse = ({ res, err = null, status = 400, message }) => {
  switch (status) {
    case 400:
      return res.status(status).send({
        err,
        message: message ? message : "Bad request",
        success: false,
      });

    case 401:
      return res.status(status).send({
        err,
        message: message ? message : "User is not authorized",
        success: false,
      });

    case 404:
      return res.status(status).send({
        err,
        message: message ? message : "Not found",
        success: false,
      });

    case 500:
      return res.status(status).send({
        err,
        message: message ? message : "Server is not respond",
        success: false,
      });

    default:
      return res.send({
        err,
        message: message ? message : "Something went wrong",
        success: false,
      });
  }
};

module.exports = createErrorResponse;
