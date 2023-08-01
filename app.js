const express = require("express");
const bodyParser = require("body-parser");
const request = require("request")
const https = require("https")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    var jsonData = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/37362e6bcf"

    const options = {
        methods: "POST",
        auth: "donsimeone:b3d29a7c69e5823cbbf308afb05493c3-us9"
    }

    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})


app.listen(3000, function() {
    console.log("server is running on port 3000");
})

// API key 
// b3d29a7c69e5823cbbf308afb05493c3-us9
// 1037931