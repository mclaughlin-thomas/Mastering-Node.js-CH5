import { IncomingMessage, ServerResponse } from "http";

// Useful createServer configuration objects
// IncomingMessage // represents requests
// ServerResponse  // represents responses
// requestTimeout  // time allowed for client to send requests, afterwhich the request times out

// this code below omits the configuration object mentioned in server.ts
// which means that the default types will be used to represent the HTTP 
// request and response when the handler fcn for the request event is invoked.
export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
    resp.end("Hello, World");
};