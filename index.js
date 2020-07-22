//let jsdom = require('jsdom').JSDOM

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const https = require('https');
const express = require('express')
const app = express()
const port = 80

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    next();
});



testCode();
function testCode() {
    https.get('https://www.mcc-mnc.com/', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            html = data;
            const jsdom = new JSDOM(html);
            const { window } = jsdom;
            const { document } = window;
            global.window = window;
            global.document = document;
            const $ = global.jQuery = require( 'jquery' );
            var cnt = 100;
            $('#mncmccTable tbody tr').each( (tr_idx,tr) => {
                $(tr).children('td').each ((td_idx, td) => {
                    console.log( '[' +tr_idx+ ',' +td_idx+ '] => ' + $(td).text());
                });                 
            });
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send('Error: No dtaa');
    });    
}
function jsdomLocalTest(res) {
    html = ''+
    '<!DOCTYPE html>'+
        '<script>'+
            'console.log(\'I am a script tag.\');' +
        '</script>';
    new jsdom(html,{ runScripts: 'dangerously' });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ result: true }));
}



function getMccMncList(res) {
    https.get('https://www.mcc-mnc.com/', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            html = data;
            const jsdom = new JSDOM(html);
            const { window } = jsdom;
            const { document } = window;
            global.window = window;
            global.document = document;
            const $ = global.jQuery = require( 'jquery' );
            //console.log($('#mncmccTable').text());
            res.send($('#mncmccTable').html());
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send('Error: No dtaa');
    });    
}
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/mcc-mnc-list/', (req, res) => {
    getMccMncList(res);
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))




