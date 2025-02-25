"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.redirectionHandler = exports.isHttps = void 0;
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
//REWRITE isHTTPS & adding redirectionHandler for HTTP to HTTPS redirection
const isHttps = (req) => {
    return req.socket instanceof tls_1.TLSSocket && req.socket.encrypted;
};
exports.isHttps = isHttps;
const redirectionHandler = (req, resp) => {
    resp.writeHead(302, { "Location": "https://localhost:5500" });
    // 302 denotes redirection and sets the Location header to new URL
    resp.end();
};
exports.redirectionHandler = redirectionHandler;
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
        if (parsedURL.pathname == "/newurl") {
            resp.write("Hello, New URL");
        }
        else if (!parsedURL.searchParams.has("keyword")) {
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
