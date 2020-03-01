const http = require("http");
const calcul = require("./calcul");

//PORT
const normalizePort = val => {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
};

const port = normalizePort(process.env.PORT || "3000");

//Listening
const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    console.log("Listening on " + bind);
};

//Error
const onError = error => {
    console.log(error)
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};


//Server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });

    let a = 5;
    let b = 6;

    // Template Literals in ES6 in Javascript
    res.write(`<p>${a} + ${b} = ${calcul.sum(a, b)}</p>`);
    res.write(`<p>${a} * ${b} = ${calcul.mul(a, b)}</p>`);

    res.end();
});

server.on("error", onError);
server.on("listening", onListening);

server.listen(port);