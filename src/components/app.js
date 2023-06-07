const express = require("express");
const multer = require("multer");
const cors = require('cors');

const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

const CLIENT_ID =
  "617940386148-g6rlgt0si63480rgmptk6k5jnem71ca7.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//041EXYGzupFy6CgYIARAAGAQSNwF-L9Ir7iLCMJtmUJ7uNIgJp9PG1uuIUqixm3d-cim-d3h0YOKNbIQjTH5-1Sy8DzqyNLvlQD8";

// Initialize the oauth client
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Set credentials to the oauth client
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

// Initialize the drive
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
const generatePublicUrl = async (id) => {
  try {
    const fileId = id;
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });
    const result = await drive.files.get({
      fileId: fileId,
      fields: "webViewLink, webContentLink", //webContentLink is the download link, webViewLink is the view link
    });
    // console.log(result.data.webContentLink, result.data.webViewLink);
    return result.data;
  } catch (error) {
    console.log(error.message);
  }
};

// Upload file route
app.post("/upload", upload.single("file"), async (req, res) => {
  const { file } = req; // Access the uploaded file object

  if (!file) {
    return res.status(400).json({ error: "No file provided" });
  }

  const filePath = path.join(__dirname, "uploads", file.filename);

  try {
    const response = await drive.files.create({
      requestBody: {
        name: file.originalname,
        mimeType: file.mimetype,
      },
      media: {
        mimeType: file.mimetype,
        body: fs.createReadStream(filePath),
      },
    });
    // console.log(response.data.id);
    var name, id, webContentLink, webViewLink ;
    generatePublicUrl(response.data.id).then((x) => {
      name =  response.data.name;
      id = response.data.id;
      webContentLink = x.webContentLink;
      webViewLink = x.webViewLink;
      // console.log(webContentLink, webViewLink);
      return res.status(200).json({ name, id, webContentLink, webViewLink });
    });

  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while uploading the file" });
  }
});

// Generate public URL route
app.use(express.json());
// Delete file route
app.post("/delete", async (req, res) => {
  id=req.body.id;
  console.log(id);
  try {
    const response = await drive.files.delete({
      fileId: id,
    });
    console.log(response.data, response.status);
    res.sendStatus(200);
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
