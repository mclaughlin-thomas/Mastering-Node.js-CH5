"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// Useful createServer configuration objects
// IncomingMessage // represents requests
// ServerResponse  // represents responses
// requestTimeout  // time allowed for client to send requests, afterwhich the request times out
// this code below omits the configuration object mentioned in server.ts
// which means that the default types will be used to represent the HTTP 
// request and response when the handler fcn for the request event is invoked.
const url_1 = require("url");
const handler = async (req, resp) => {
    console.log(`---- HTTP Method: ${req.method},URL: ${req.url}`);
    // console.log(`host: ${req.headers.host}`);
    // console.log(`accept: ${req.headers.accept}`);
    // console.log(`user-agent: ${req.headers["user-agent"]}`)
    const parsedURL = new url_1.URL(req.url ?? "", `http://${req.headers.host}`);
    console.log(`protocol: ${parsedURL.protocol}`);
    console.log(`hostname: ${parsedURL.hostname}`);
    console.log(`port: ${parsedURL.port}`);
    console.log(`pathname: ${parsedURL.pathname}`);
    parsedURL.searchParams.forEach((val, key) => {
        console.log(`Search param: ${key}: ${val}`);
    });
    resp.end("Hello, World");
    // try 
    // http://localhost:5000/myrequest?first=Bob&last=Smith
    // ---- HTTP Method: GET, URL: /myrequest?first=Bob&last=Smith
    // protocol: http:
    // hostname: localhost
    // port: 5000
    // pathname: /myrequest
    // Search param: first: Bob
    // Search param: last: Smith
};
exports.handler = handler;
