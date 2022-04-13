const https = require('https');

const APP_KEY = process.env.ONE_SIGNAL_KEY;
const APP_ID = process.env.ONE_SIGNAL_ID;

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
