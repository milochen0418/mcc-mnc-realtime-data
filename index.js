let jsdom = require('jsdom').JSDOM
const express = require('express')
const app = express()
const port = 80

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.get('/mcc-mnn-list/', (req, res) => {

    //jsdom testing
    html = ''+
    '<!DOCTYPE html>'+
        '<script>'+
            'console.log(\'I am a script tag.\');' +
        '</script>';
     
    new jsdom(html,{ runScripts: 'dangerously' });
    
    //return json 
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ result: true }));
    
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
