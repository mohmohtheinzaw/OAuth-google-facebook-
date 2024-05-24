import axios from "axios";
import express from "express";
const { google } = require("googleapis");
const { OAuth2Client } = google.auth;
type GoogleUserInfo = {
  picture?: string;
  email: string;
  name: string;
};

export { GoogleUserInfo };

export class Google {
  static async getToken(req: express.Request, res: express.Response) {
    const oauth2Client = new OAuth2Client(
      "YOUR_CLIENT_ID",
      "YOUR_CLIENT_SECRET",
      "http://localhost:3000/api/v1/auth/google/callback",
      ["profile", "email"]
    );
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/drive"],
    });
    res.redirect(url);
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    return { tokens };
  }

  static async getAccountInfo(token: string): Promise<GoogleUserInfo> {
    const config = {
      method: "get",
      url: "https://www.googleapis.com/userinfo/v2/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      let response = await axios(config);
      let userInfo = response.data;
      return userInfo as GoogleUserInfo;
    } catch (error) {
      throw error;
    }
  }
}

//const express = require('express');
// const { google } = require('googleapis');
// const { OAuth2Client } = google.auth;
// const app = express();
// const port = 3000;
// const oauth2Client = new OAuth2Client(
//   'YOUR_CLIENT_ID',
//   'YOUR_CLIENT_SECRET',
//   'http://localhost:3000/oauth2callback'
// );
// app.get('/', (req, res) => {
//   const url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: ['https://www.googleapis.com/auth/drive'],
//   });
//   res.redirect(url);
// });
// app.get('/oauth2callback', async (req, res) => {
//   const { code } = req.query;
//   const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.setCredentials(tokens);
//   res.send('Successfully authenticated with Google Drive API!');
// });
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
