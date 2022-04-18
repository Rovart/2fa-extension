# 2fa-extension
2FA chrome extension filler - Requires local server

## How to run

  - Run server script on your Raspbarry Pi or local device (Download and instructions on the following repository)
  - Edit "totp.js" file with the local IP server and port of your 2FA server (Pending from UI integration)
  - Load the current extension as an unpackaged extension file at chrome://extensions.

##Known bugs

  - Filled values may not get submited once clicking "Log in" button, plese delete and add last 2FA number from the TOTP field manually
