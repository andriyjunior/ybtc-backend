const { default: axios } = require("axios");
var fs = require("fs");
const { API_IMGBB_KEY } = process.env;

const requestUrl = `https://api.imgbb.com/1/upload?key=${API_IMGBB_KEY}`;

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(file);
}

const uploadPhoto = async (req, res) => {
  const files = req.files.image.data;
  console.log(files);
  res.send(base64_encode(files));
  // await axios
  //   .post(requestUrl, files, {
  //     headers: {
  //       "Content-Type":
  //         "multipart/form-data; boundary=<calculated when request is sent>",
  //     },
  //   })
  //   .then((res) => console.log(res.data));
  return;
};

module.exports = { uploadPhoto };
