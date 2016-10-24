var http = require('http');

// FQDN hybridconnmgr.hybridConnMgr.f6.internal.cloudapp.net

function call_onprem_server(response) {
    console.log('Making outbound request');
    var hcreq = http.get('http://hybridconnmgr', function (hcres) {
        response.writeHead(200, {'Content-type': 'text-plain'});
        response.write(hcres);
        response.end();
        console.log(hcres);
    });

    hcreq.setTimeout(7000, function () {
        console.log('Timeout hit');
        response.writeHead(200, {'Content-type': 'text-plain'});
        response.write('Unable to connect to remote server. Timeout hit.');
        response.end();
    });

    hcreq.on('error', function(error) {
        console.log(error.message);
        response.writeHead(200, {'Content-type': 'text-plain'});
        response.write(error.toString());
        response.end();
    });
}

function onRequest(request, response) {
    call_onprem_server(response);
}

http.createServer(onRequest).listen(process.env.PORT || 3000);
console.log('Listening for requests on port ' + (process.env.PORT || 3000));
