var http = require('http');

function call_onprem_server(response) {
    var options = {
      host: 'hybridconnmgr.hybridConnMgr.f6.internal.cloudapp.net',
      //host: 'checkip.amazonaws.com',
      path: '/'
    };

    callback = function(hcres) {
        var str = '';

        hcres.on('data', function (chunk) {
            str += chunk;
        });

        hcres.on('error', function (error) {
            console.error(error);
            response.writeHead(200, {'Content-type': 'text-plain'});
            response.write(error);
            response.end();
            console.log(str);
        });

        hcres.on('timeout', function (error) {
            console.error(error);
            response.writeHead(200, {'Content-type': 'text-plain'});
            response.write(error);
            response.end();
            console.log(error);
        });

        // We have the entire response
        hcres.on('end', function () {
            response.writeHead(200, {'Content-type': 'text-plain'});
            response.write(str);
            response.end();
            console.log(str);
        });
    }

    // Make the request over Hybrid Connection
    try {
        http.request(options, callback).end();
    }
    catch (error) {
        console.error(error);
        response.writeHead(200, {'Content-type': 'text-plain'});
        response.write(error);
        response.end();
        console.log('error in catch ' + error);
    }
}

function onRequest(request, response) {
    call_onprem_server(response);
}

http.createServer(onRequest).listen(process.env.PORT || 3000);
console.log('Listening for requests on port ' + (process.env.PORT || 3000));
