function getPreviousEntries() {
  var entries = {};

  entries.timezone = Office.context.roamingSettings.get('WFtimezone');
  entries.timeslider = Office.context.roamingSettings.get('WFtimeSlider');

  return entries;
}


function getConfig() {
    var config = {};

    config.gitHubUserName = Office.context.roamingSettings.get('gitHubUserName');
    config.defaultGistId = Office.context.roamingSettings.get('defaultGistId');

    return config;
}

function setConfig(config, callback) {
    Office.context.roamingSettings.set('gitHubUserName', config.gitHubUserName);
    Office.context.roamingSettings.set('defaultGistId', config.defaultGistId);

    Office.context.roamingSettings.saveAsync(callback);
}