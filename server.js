var http = require('http');

function call_onprem_server(response) {
    try {
        console.log('Making outbound request');
        http.get('http://hybridconnmgr.hybridConnMgr.f6.internal.cloudapp.net', function (hcres) {
            response.writeHead(200, {'Content-type': 'text-plain'});
            response.write(hcres);
            response.end();
            console.log(hcres);
        });
    }
    catch (error) {
        response.writeHead(200, {'Content-type': 'text-plain'});
        response.write(error);
        response.end();
        console.log(error);
    }
}

function onRequest(request, response) {
    call_onprem_server(response);
}

http.createServer(onRequest).listen(process.env.PORT || 3000);
console.log('Listening for requests on port ' + (process.env.PORT || 3000));
