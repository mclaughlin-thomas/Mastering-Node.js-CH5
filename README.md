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

## Understanding HTTP Responses
The purpose of inspecting an HTTP request is to determine what kind of response is required.

## Supporting HTTPS Requests
Most web applications use HTTPS, where HTTP requests are sent over an encrypted network connection using the TSL/SSL protocol. With HTTPS we can ensure that the request and response cannot be inspected as they traverse public networks.

Supporting SSL requires a certificate that establishes the ID of the server and this is used as the basis for the encryption that secures HTTPS requests. For the next commits we are going to use a self-signed certificate, which is sufficient for development and testing, but should not be used for deployment.

## Creating the self-signed certificate
The easiest way to create a self-signed certificate is to sue the OpenSSL package. It can be found at https://www.openssl.org but is part of many popular distros. The Git client includes OpenSSL! On windows: C:\Program Files\Git\usr\bin.
There we can create self-signed certificates without needing to install the OpenSSL package.

To check if you have openSSL, run: openssl version

Let's generate a self-signed certificate. First be in webapp.

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -sha256 -days 3650 -nodes

Then press enter on every prompt to get default value on everything. This is fine for development.

Once the command completes, we will have two new files in webapp directory: the cert.pem file that has the self-signed certificate, and the key.pem file that has the private key for the cert.

## Handling HTTPS Requests After Generating Certificate
The next step is to use the API provided by Node.js to receive HTTPS requests. For this, we edit the server.ts. Modified server.ts. So, the process is largely the same as HTTP.

import { createServer as createHttpsServer } from"https";
createHttpsServer is an alias

A config object is required to specify the cert files that we created with properties named key and cert. These two properties can be assigned string or Buffer values. To read teh file, we use the readFileSync functions from the fs module: this allows us to read the contents of key.pem and cert.pem files, which produces Buffer values that contain byte arrays. My implementation in server.ts will block main thread, but I think this is okay, using callbacks or promises make the code hideous.

There are many options, but the key and cert optiona are enough to get started. That configuration object that has key and cert is then passed to the createServer fcn that we have aliased as createHttpsServer. Then listen method is called on the result to start listening for HTTPS requests.

Go to https://localhost:5500

Browsers will display warnings for self-signed certs, and you typically have to confirm you want to proceed.

Note! Node.js is still listening for regular HTTP requests on port 5000

Go to http://localhost:5000

## Detecting HTTPS requests

Node.js API, uses the IncomingMessage and ServerResponse classes for both HTTP and HTTPS requests. However, it can be useful to know which kind of request is being proceesed so that different responses can be generated.

## Redirecting Insecure Requests

HTTPS is the norm now and it is common practice to respond to regualr HTTP request w a response that redirects the client to use HTTPS instead. That is what we will now do.

Go to
http://localhost:5000 , the response
sent by the new handler will cause the browser to request
https://localhost:5500

Redirecting HTTP reqs to an HTTPS URL means that the init communication betweeen the client and server is unencrypted, which means it can be susceptible to Man in the Middle attacks.

All examples in this chapter use HTTP/1.1 which tends to be the defualt in Node.js web app dev.

HTTP/2 is an update to the HTTP protocol thats intended to improve performance.

Node.js provides support for HTTP/2 in the http2 module.
HTTP/2 is not always the first choice for Node.js projects, even though it is more efficient.
HTTP/2 benefits applications that have a large volume of reqs, and applications of that suze use a proxy to receive requests and fan them out to multiple mode.js servers. The proxy receives HTTP/2 reqs from clients but communicates with Node.js using HTTP/1.1 res because HTTP/2 features dont have much impact inside the data center.

For apps that do not use a proxy, the volume fo requests is small enough where the efficients of HTTP/2 do not justify the additional complexity that HTTP/2 adds to development, such as requiring encryption for all requests.

Most node.js apps still use HTTP/1.1

## Using Third-Party Enhancements
One nice thing about js development is there is a huge range of open-source packages that 
are available and many are built on the Node.js API to simplify request handling.

One of the most popular is Express.

Listing 5.13: Installing the Express package
npm install express@4.18.2
npm install --save-dev @types/express@4.17.20

Express has many useful features, but the two most useful are the requests router and
the enhanced request/response types, which this subsection will go over.

## Using the Express Router
Supporting a new URL in the handler.ts file

This current setup is a complicated. Each new addition makes the code more complex and increases the chance of errors.

Express router can solve this problem..
It can solve it by separating request matching from generating responses. To do this, we have to refactor the handler code into separate functions that generate responses without the statements that inspect requests

After refactoring, code looks much much cleaner.
//

get(path, handler)
This method routes HTTP GET
requests that match the path to the
specified handler function.

post(path, handler)
This method routes HTTP POST
requests that match the path to the
specified handler function.

put(path, handler)
This method routes HTTP PUT
requests that match the path to the
specified handler function.

delete(path, handler)
This method routes HTTP DELETE
requests that match the path to the
specified handler function.

all(path, handler)
This method routes all requests that
match the path to the specified handler
function.

use(handler)
This method adds a middleware
component, which is able to inspect
and intercept all requests. Later
chapters contain examples that use
middleware.

## Using The Request and Response Enhancements

Aside from routing, Express can do other things like enhancing the IncomingRequest and ServerResponse objects that are passed to handler functions.

The object that represents the HTTP req is named Request and it extends the IncomingRequest type.

The object that Express uses to represent the HTTP response is named Response and extends the ServerResponse type.

Implementing the enhancements
We see now that Express automatically parses the request URL and makes its parts accessible through the response properties. Which means I do not have to parse the URL explicitly. The secure property means I can remove the isHTTPs function!

The Response methods reduce the number of statements required to produce responses.
The send method for example takes care of setting the response status code, set some useful headers, and calls the end method to tell Node.js that the response is complete.

## Using Express Route Parameters
d