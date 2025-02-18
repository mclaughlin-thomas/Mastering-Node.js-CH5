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
const handler = async (req, resp) => {
    // Logging request details!
    console.log(`---- HTTP Method: ${req.method},URL: ${req.url}`);
    console.log(`host: ${req.headers.host}`);
    console.log(`accept: ${req.headers.accept}`);
    console.log(`user-agent: ${req.headers["user-agent"]}`);
    resp.end("Hello, World");
    // This example writes out the HTTP method, request url, and three headers:
    // the host header, which specifies the hostname and port to which the request was sent
    // the accept header which specifies the formats the client is willing to accept in the 
    // response
    // and the user-agent header which identifies the client
};
exports.handler = handler;
