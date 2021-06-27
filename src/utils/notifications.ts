const https = require('https');

const APP_KEY = 'NDczM2ViNmEtMzI5Zi00ZWJiLTk0ZmEtZjJjYTc2NGQ1Zjkw';
const APP_ID = '75c10a26-b37a-4efa-9b72-fc70b51ca8a5';

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  Authorization: `Basic ${APP_KEY}`
};

const options = {
  host: 'onesignal.com',
  port: 443,
  path: '/api/v1/notifications',
  url: 'https://onesignal.com/api/v1/notifications',
  method: 'POST',
  headers
};

export class NotificationsService {
  constructor() {}

  sendNotificationTo = (player_ids: string[], title: string, message: string, object: object) => {
    const data = {
      app_id: APP_ID,
      headings: { en: title },
      contents: { en: message ? message : 'Without description' },
      include_player_ids: player_ids,
      data: object,
      android_visibility: 1
    };

    const req = https.request(options, function (res) {
      res.on('data', function (data) {
        console.log('Response:');
        console.log(JSON.parse(data));
      });
    });

    req.on('error', function (e) {
      console.log('ERROR:');
      console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
  };
}

export default new NotificationsService();
