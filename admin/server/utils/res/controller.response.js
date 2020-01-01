const ResponseFormat = require('../../core/response-format');

const postResponse = async (res, result) => {
  if (result.err) {
    return await res
      .status(400)
      .json(
        ResponseFormat
          .error(result.err.code, result.err.message, result.data)
      )
  } else if (result.res) {
    return await res
      .status(201)
      .json(
        ResponseFormat
          .success(result.res.code, result.res.message, result.data)
      );
  }
};

const getResponse = async (res, result) => {
  if (result.err) {
    return await res
      .status(400)
      .json(
        ResponseFormat
          .error(result.err.code, result.err.message, result.data)
      )
  } else if (result.res) {
    return await res
      .status(200)
      .json(
        ResponseFormat
          .success(result.res.code, result.res.message, result.data)
      );
  }
};

const updateResponse = async (res, result) => {
  if (result.err) {
    return await res
      .status(400)
      .json(
        ResponseFormat
          .error(result.err.code, result.err.message, result.data)
      )
  } else if (result.res) {
    return await res
      .status(201)
      .json(
        ResponseFormat
            .success(result.res.code, result.res.message, result.data)
      );
  }
};

const deleteResponse = async (res, result) => {
  if (result.err) {
    return await res
      .status(400)
      .json(
        ResponseFormat
          .error(result.err.code, result.err.message, result.data)
      )
  } else if (result.res) {
    return await res
      .status(200)
      .json(
        ResponseFormat
          .success(result.res.code, result.res.message, result.data)
      );
  }
};

const authenticateResponse = async (res, result) => {

};

const internalServerError = async (res, error) => {
  return await res
    .status(500)
    .json()
};

module.exports = {
  postResponse,
  getResponse,
  updateResponse,
  deleteResponse,
  authenticateResponse,
  internalServerError
};
