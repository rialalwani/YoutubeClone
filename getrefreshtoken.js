import { google } from 'googleapis';
import readline from 'readline';
import dotenv from "dotenv"

dotenv.config()
const CLIENT_ID =process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Generate the URL for authorization
const getAuthUrl = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline', // This is needed to get the refresh token
    scope:[
      "https://mail.google.com/",
      'https://www.googleapis.com/auth/gmail.send',
      "https://www.googleapis.com/auth/gmail.modify"
      ] // Gmail API scope
  });
  console.log('Authorize this app by visiting this URL:', authUrl);
};

// Exchange the authorization code for tokens
const getToken = async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Tokens:', tokens);
    console.log("Refresh token:",tokens.refresh_token);
  } catch (error) {
    console.log('Error getting token:', error.response?error.response.data:error.message);
  }
};

// Step 1: Run this function to get the auth URL
getAuthUrl();

// Step 2: After visiting the URL and granting access, copy the code from the URL
rl.question('Enter the code from the URL: ', (code) => {
  // Step 3: Call this function to get the refresh token
  getToken(code);
  rl.close();
});
