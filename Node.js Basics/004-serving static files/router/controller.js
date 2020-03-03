const url = require("url");

exports.home = (req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end("<h1>Hello</h1>");
}

exports.getPosts = (req, res) => {
    let posts = [
        { id: 1, title: "article1" },
        { id: 2, title: "article2" }
    ]
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(JSON.stringify(posts));
}

exports.insertPost = (req, res) => {
    let bodyString = ""
    req.on("data", data => {
        bodyString += data
    })

    req.on("end", () => {
        let body = JSON.parse(bodyString);
        let post = {
            id: 1,
            title: body.title
        }
        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(post));
    })
}