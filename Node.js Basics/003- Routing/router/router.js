const url = require("url");
const controller = require("./controller")

const router = (req, res) => {
    try {
        // Parsing and saving our url data in the req
        let baseURI = url.parse(req.url, true)
        req.queryData = {
            query: baseURI.query,
            baseURI: baseURI.pathname
        }

        // Searching for routes
        let handler = (routes[req.method]) ? routes[req.method][baseURI.pathname] : null
        if (handler) {
            // Handler of this route found
            handler(req, res)
        } else {
            // No route found matching the url
            routes["notFound"](req, res)
        }
    } catch (error) {
        // In case of error
        console.log(error)
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end("<h1>An error occured</h1>");
    }

}

// routes in form of: route[method][url]
let routes = {
    "GET": {
        "/": controller.home,
        "/posts": controller.getPosts
    },
    "POST": {
        "/posts": controller.insertPost
    },
    "notFound": (req, res) => {
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end("<h1>Not found</h1>");
    }
}

module.exports = router;