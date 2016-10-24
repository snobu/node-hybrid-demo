var http = require('http');

// FQDN hybridconnmgr.hybridConnMgr.f6.internal.cloudapp.net

function call_onprem_server(response) {
    var body = '';
    console.log('Making outbound request');
    var hcreq = http.get('http://hybridconnmgr', function (hcres) {
        hcres.setTimeout(7000, function () {
            console.log('Timeout hit');
            response.writeHead(200, {'Content-type': 'text-plain'});
            response.write('Unable to connect to remote server. Timeout hit.');
            response.end();
        });

        hcres.on('error', function(error) {
            console.log(error.message);
            response.writeHead(200, {'Content-type': 'text-plain'});
            response.write(error.toString());
            response.end();
        });

        hcres.on('data', function(chunk) {
            body += chunk;
            console.log(body);
        });

        hcres.on('end', function() {
            response.writeHead(200, {'Content-type': 'text-plain'});
            response.write(body);
            console.log('end');
            response.end();
        });
    });
}


function onRequest(request, response) {
    try {
        call_onprem_server(response);
    }
    catch (err) {
        console.log(err.message);
    }
}

http.createServer(onRequest).listen(process.env.PORT || 3000);
console.log('Listening for requests on port ' + (process.env.PORT || 3000));
