// you will need to install via 'npm install jsonwebtoken' or in your package.json
var jwt = require("jsonwebtoken");

var METABASE_SITE_URL = "https://metabase.ayvu.net";
var METABASE_SECRET_KEY = "cbde0c7ef441745e6d554c3760b94210518262f2c6d0acddd6ca8f27cae6b377";

var payload = {
    resource: { dashboard: 110 },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
};
var token = jwt.sign(payload, METABASE_SECRET_KEY);

var acidentes = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";