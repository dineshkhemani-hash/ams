## CORS
-- Its security feature added in browser which prevent websites to making the request to different domain other then own domain.
--  protect users from malicious websites that could try to steal data from other sites.
-- It helps prevent cross-site request forgery (CSRF) attacks and other malicious activities by ensuring that only trusted origins can access certain resources.

## How it works
When a web page makes a request to a different domain (cross-origin request), the browser sends an HTTP request with an Origin header. The server can respond with specific headers to indicate whether the request is allowed.

Key headers involved in CORS:

Access-Control-Allow-Origin: Specifies which origins are allowed to access the resource.
Access-Control-Allow-Methods: Specifies which HTTP methods are allowed.
Access-Control-Allow-Headers: Specifies which headers can be used in the actual request.
Access-Control-Allow-Credentials: Indicates whether the request can include user credentials (cookies, HTTP authentication).

## Preflight requests
preflight request is a CORS request that checks to see if the CORS protocol is understood and a server is aware of using specific methods and headers. This is done using an OPTIONS request before the actual request.

The browser sends a preflight request if:

The request method is not a simple method (GET, POST, HEAD).
The request includes custom headers.
The request includes credentials (cookies, HTTP authentication).
Why Preflight Requests for DELETE and PATCH but Not GET
Simple Methods: GET, POST, and HEAD are considered simple methods and do not trigger a preflight request.
Non-Simple Methods: DELETE, PUT, PATCH, and other methods are considered non-simple methods and trigger a preflight request to ensure the server allows these methods.