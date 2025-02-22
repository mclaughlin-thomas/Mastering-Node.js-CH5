"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.isHttps = void 0;
// Useful createServer configuration objects
// IncomingMessage // represents requests
// ServerResponse  // represents responses
// requestTimeout  // time allowed for client to send requests, afterwhich the request times out
// this code below omits the configuration object mentioned in server.ts
// which means that the default types will be used to represent the HTTP 
// request and response when the handler fcn for the request event is invoked.
// Detecting HTTPS requests
// The socket property defined by the IncomingMessage class will return
// an instance of the TLSSocket class for secure requests and this class
// defines an encrypted property that always returns true . Checking if this
// property exists allows HTTPS and HTTP connections to be identified so that
// different responses can be produced.
const tls_1 = require("tls");
const url_1 = require("url");
const isHttps = (req) => {
    return req.socket instanceof tls_1.TLSSocket && req.socket.encrypted;
};
exports.isHttps = isHttps;
const handler = (req, resp) => {
    const protocol = (0, exports.isHttps)(req) ? "https" : "http";
    const parsedURL = new url_1.URL(req.url ?? "", `${protocol}://${req.headers.host}`);
    if (req.method !== "GET" || parsedURL.pathname == "/favicon.ico") {
        resp.writeHead(404, "Not Found");
        resp.end();
        return;
    }
    else {
        resp.writeHead(200, "OK");
        if (!parsedURL.searchParams.has("keyword")) {
            resp.write(`Hello, ${protocol.toUpperCase()}`);
        }
        else {
            resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
        }
        resp.end();
        return;
    }
};
exports.handler = handler;
// This example generates 3 different responses.
//http://localhost:5000/favicon.ico ,
//http://localhost:5000?keyword=World , and
//http://localhost:5000
