import { IncomingMessage, ServerResponse } from "http";

// Useful createServer configuration objects
// IncomingMessage // represents requests
// ServerResponse  // represents responses
// requestTimeout  // time allowed for client to send requests, afterwhich the request times out

export const handler = async (req: IncomingMessage, resp: ServerResponse) => {
    resp.end("Hello, World");
};