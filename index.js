module.exports = ({ url, iosManifest, config }) => {
  const { webhookUrl } = config;
  const slack = require('slack-notify')(webhookUrl);

  return new Promise((resolve, reject) => {
    
    const releaseChannel = iosManifest.releaseChannel || 'default';
    const queryString = releaseChannel === 'default' ? '' :
      '?release-channel='+encodeURIComponent(releaseChannel)
   
    slack.send(
      {
        text: `${iosManifest.name} v${iosManifest.version} (${iosManifest.ios.buildNumber}) published to ${url + queryString}`,
        unfurl_links: 0,
      },
      err => {
        if (err) {
          reject(err);
        } else {
          resolve('Posted notification to Slack!');
        }
      }
    );
  });
};
