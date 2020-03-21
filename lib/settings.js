/**
* The Settings Module reads the settings out of settings.json and provides
* this information to the other modules
*/

var fs = require("fs");
var jsonminify = require("jsonminify");

//The app title, visible e.g. in the browser window
exports.title = "HASH explorer";

//The url it will be accessed from
exports.address = "62.171.160.137:3001";

//logo
exports.logo = "/images/logo.png";

//The app favicon fully specified url, visible e.g. in the browser window
exports.favicon = "public/favicon.ico";

//What is displayed for the home button in the top-left corner (valid options are: title, coin, logo)
exports.homelink = "logo";

// home link logo height (value in px, only valid if using homelink = 'logo')
exports.logoheight = 50;

//Theme
exports.theme = "Cyborg";

//The Port ep-lite should listen to
exports.port = process.env.PORT || 3001;

//coin symbol, visible e.g. MAX, LTC, HVC
exports.symbol = "HASH";

//coin name, visible e.g. in the browser window
exports.coin = "Hash";

//This setting is passed to MongoDB to set up the database
exports.dbsettings = {
  "user": "eiquidus",
  "password": "ChangeMe!!DB",
  "database": "explorerdb",
  "address" : "localhost",
  "port" : 27017
};

//This setting is passed to the wallet
exports.wallet = 
{ "host" : "127.0.0.1",
  "port" : 4187,
  "user" : "hashrpc",
  "pass" : "ChangeMe!!RPC"
};

//Locale file
exports.locale = "locale/en.json",

//Menu and panel items to display
// set a number to pnl variables to change the panel display order. lowest # = far left panel, highest # = far right panel, 0 = do not show panel
exports.display = {
  "api": true,
  "market": true,
  "twitter": true,
  "facebook": false,
  "googleplus": false,
  "bitcointalk": false,
  "website": true,
  "slack": false,
  "github": true,
  "discord": true,
  "telegram": true,
  "reddit": false,
  "youtube": false,
  "search": true,
  "richlist": true,
  "movement": true,
  "network": true,
  "networkpnl": 1,
  "difficultypnl": 2,
  "masternodespnl": 3,
  "coinsupplypnl": 4,
  "pricepnl": 5
};

//API view
exports.api = {
  "blockindex": 639086,
  "blockhash": "5a6ffc736074800e246ca29fe5419d77d3f369cf8fa792bf2a8948029f0151a3",
  "txhash": "2af5cc842d18814b45db44b62411c8a47987fc3c56294af38572989de5c1f7d5",
  "address": "HDCBEht2KDtquV3SHhH6YKcGUBaiFSeEG2",
};

// markets
exports.markets = {
  "coin": "HASH",
  "exchange": "BTC",
  "enabled": ["crex"],
  "cryptopia_id": "",
  "ccex_key" : "Get-Your-Own-Key",
  "coinexchange_id": "",
  "stex_id": "",
  "default": "crex"
};

// richlist/top100 settings
exports.richlist = {
  "distribution": true,
  "received": true,
  "balance": true
};

exports.movement = {
  "min_amount": 10000,
  "low_flag": 50000,
  "high_flag": 1000000
},

//index
exports.index = {
  "show_hashrate": false,
  "difficulty": "POS",
  "last_txs": 100
};

// twitter, facebook, googleplus, bitcointalk, github, slack, discord, telegram, reddit, youtube, website
exports.twitter = "hashplatform";
exports.facebook = "your-facebook-username";
exports.googleplus = "your-google-plus-username";
exports.bitcointalk = "your-bitcointalk-topic-value";
exports.github = "hashplatform/HASH/releases";
exports.slack = "your-full-slack-invite-url";
exports.discord = "https://discord.gg/ZXDkGwY";
exports.telegram = "hashplatformofficial";
exports.reddit = "your-subreddit-name";
exports.youtube = "your-full-youtube-url";
exports.website = "http://62.171.160.137/";

exports.confirmations = 15;

//timeouts
exports.update_timeout = 125;
exports.check_timeout = 250;

//genesis
exports.genesis_tx = "e42f36769ebc4dbf65fc045e003c885c14e8df0de323c81da1c2ae35069de340";
exports.genesis_block = "000001bf7d704efe6fe7e87cad75e56b7ab10f2f828038dd596f4e22e70e1bda";

exports.heavy = false;
exports.txcount = 100;
exports.show_sent_received = true;
exports.supply = "TXOUTSET";
exports.nethash = "getnetworkhashps";
exports.nethash_units = "G";

// simple Cross-Origin Resource Sharing (CORS) support
// enabling this feature will add a new output header to all requests like this: Access-Control-Allow-Origin: <corsorigin>
// corsorigin "*" will allow any origin to access the requested resource while specifying any other value for corsorigin will allow cross-origin requests only when the request is made from a source that matches the corsorigin filter
exports.usecors = false;
exports.corsorigin = "*";

exports.labels = {};
exports.burned_coins = [];

// Customized API commands
exports.api_cmds = {
  "masternode_count": "getmasternodecount"
};

exports.reloadSettings = function reloadSettings() {
  // Discover where the settings file lives
  var settingsFilename = "settings.json";
  settingsFilename = "./" + settingsFilename;

  var settingsStr;
  try{
    //read the settings sync
    settingsStr = fs.readFileSync(settingsFilename).toString();
  } catch(e){
    console.warn('No settings file found. Continuing using defaults!');
  }

  // try to parse the settings
  var settings;
  try {
    if(settingsStr) {
      settingsStr = jsonminify(settingsStr).replace(",]","]").replace(",}","}");
      settings = JSON.parse(settingsStr);
    }
  }catch(e){
    console.error('There was an error processing your settings.json file: '+e.message);
    process.exit(1);
  }

  //loop trough the settings
  for(var i in settings)
  {
    //test if the setting start with a low character
    if(i.charAt(0).search("[a-z]") !== 0)
    {
      console.warn("Settings should start with a low character: '" + i + "'");
    }

    //we know this setting, so we overwrite it
    if(exports[i] !== undefined)
    {
      exports[i] = settings[i];
    }
    //this setting is unkown, output a warning and throw it away
    else
    {
      console.warn("Unknown Setting: '" + i + "'. This setting doesn't exist or it was removed");
    }
  }
};

// initially load settings
exports.reloadSettings();
