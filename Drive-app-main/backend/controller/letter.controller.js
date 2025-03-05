import { google } from "googleapis";
import letterModel from "../model/letter.model.js";

const saveLetter = async (req, res) => {
  try {
    const { content, title, accessToken } = req.body;

    if (!content || !title || !accessToken) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.CALLBACK_URL
    );

    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });

    const fileMetadata = {
      name: title,
      mimeType: "application/vnd.google-apps.document",
    };

    const media = {
      mimeType: "text/plain",
      body: content,
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    const letter = new letterModel({
      userId: req.user.id,
      content,
      title,
      googleDriveId: file.data.id
    });

    await letter.save();

    res.status(200).json({ success: true, data: file.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getLetter = async (req, res) => {
  try {
    const letters = await letterModel.find({ userId: req.user.id });
    res.json(letters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export { saveLetter, getLetter };
