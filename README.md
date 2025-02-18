# Mastering-Node.js-CH5

## Handling HTTP Requests
In this chapter we go over the Node.js API for creating HTTP servers and explain how it can be used to receive and respond to requests.

### Problems we will address
- Listing for HTTP requests
- Inspect an HTTP request
- Parse a request URL
- Create an HTTP response
- Listen for HTTPS requests
- Detect HTTPS requests
- Redirect insecure requests
- Simplify request processing

## Four Main Parts of an HTTP Request
 - HTTP Method (GET, POST, PUT, etc.)
 - The URL, which identifies the resource the request should be applied to
 - The headers, which supply additional info about the request and capabilities of the client
 - The request body, which provides the data required for the requested operation

 The IncomingMessage class provides access to the above building blocks

 Useful Incoming Messages properties
 - httpVersion, string value containing the version of http used in the request.
 - Method, string value containing the HTTP method specified by the request
 - URL, string value containing the request URL
 - socket, represents network socket used to receive that connection

 Rule of thumb, the headers property is more useful for displaying or logging headers while 
 the headersDistinct property is more useful when using headers to decide what kind of response to produce.

## Parsing URLs
Node.js provides the URL class in the url module to parse URLs into their parts, making it easier to inspect URls to make decisions about what kind of response will be sent.

URL properties
 - hostname, returns string containing the URL hostnmame component
 - pathname, returns string containing the URL pathname component
 - port, returns string containing the URL port component
 - potocol, returns string containing the URL protocol component
 - search, returns string containing the entire query portion of the URL
 - searchParams, returns a URLSearchParams object that provides key/val access to the query potion of the URL

 

