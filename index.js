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

// testCode_2();
function testCode_2() {
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

            var header = []
            $('#mncmccTable thead tr').each( (tr_idx,tr) => {
                $(tr).children('th').each ((th_idx, th) => {
                    header.push($(th).text().trim());
                });                 
            });

            var body = []
            $('#mncmccTable tbody tr').each( (tr_idx,tr) => {
                var row = {};
                $(tr).children('td').each ((td_idx, td) => {
                    row[header[td_idx]] = $(td).text().trim();
                });
                row['PLMN_NUM']=row['MCC']+row['MNC'];
                row['PLMN_NAME']=row['Network'];
                body.push(row);
            });
            var jsonObj = {}
            jsonObj['plmn_list'] = body;
            console.log(JSON.stringify(jsonObj));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.send('Error: No dtaa');
    });    
}

function testCode_1() {
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

            var header = []
            $('#mncmccTable thead tr').each( (tr_idx,tr) => {
                $(tr).children('th').each ((th_idx, th) => {
                    header.push($(th).text().trim());
                });                 
            });

            var body = []
            $('#mncmccTable tbody tr').each( (tr_idx,tr) => {
                var row = {};
                $(tr).children('td').each ((td_idx, td) => {
                    row[header[td_idx]] = $(td).text().trim();
                });
                row['PLMN_NUM']=row['MCC']+row['MNC'];
                row['PLMN_NAME']=row['Network'];
                body.push(row);
            });
            var jsonObj = {}
            jsonObj['plmn_list'] = body;
            //console.log(JSON.stringify(jsonObj));
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(jsonObj, null, 4));
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        var jsonObj = {}
        jsonObj['plmn_list'] = [];
        jsonObj['error_message'] = 'Cannot get data from https://www.mcc-mnc.com/';
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(jsonObj));
    });    
}
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/mcc-mnc-list/', (req, res) => {
    getMccMncList(res);
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(`If you want to get current .json file mapping to current information, you can open browser with this url http://localhost:${port}/mcc-mnc-list/`);
})





