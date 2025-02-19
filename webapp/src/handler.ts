import { IncomingMessage, ServerResponse } from "http";

// Useful createServer configuration objects
// IncomingMessage // represents requests
// ServerResponse  // represents responses
// requestTimeout  // time allowed for client to send requests, afterwhich the request times out

// this code below omits the configuration object mentioned in server.ts
// which means that the default types will be used to represent the HTTP 
// request and response when the handler fcn for the request event is invoked.
import { URL } from "url";

export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
    const parsedURL = new URL(req.url ?? "", `http://${req.headers.host}`);
    if (req.method !== "GET" || parsedURL.pathname == "/favicon.ico") {resp.writeHead(404, "Not Found");
        resp.end();
        return;
    } else {
    resp.writeHead(200, "OK");
    if (!parsedURL.searchParams.has("keyword")) {
        resp.write("Hello, HTTP");
    }
    else {
        resp.write(`Hello, ${parsedURL.searchParams.get("keyword")}`);
    }
    resp.end();
    return;
    }
};
// This example generates 3 different responses.
//http://localhost:5000/favicon.ico ,
//http://localhost:5000?keyword=World , and
//http://localhost:5000