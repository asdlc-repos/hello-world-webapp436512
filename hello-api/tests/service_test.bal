import ballerina/http;
import ballerina/jwt;
import ballerina/os;
import ballerina/test;

// Run with GATEWAY_ASSERTION_CERTIFICATE/_ISSUER/_HEADER exported, plus
// TEST_PRIVATE_KEY_FILE (matching key) and TEST_OTHER_PRIVATE_KEY_FILE (a different key).
const string TEST_ISSUER = "aep-gateway-test";
const string TEST_HEADER = "x-jwt-assertion";

function mint(string keyFile) returns string|error {
    jwt:IssuerConfig config = {
        issuer: os:getEnv("GATEWAY_ASSERTION_ISSUER"),
        username: "user-1",
        expTime: 300,
        customClaims: {"scope": "openid greetings:read"},
        signatureConfig: {algorithm: jwt:RS256, config: {keyFile}}
    };
    return jwt:issue(config);
}

function callGreeting(string? token) returns http:Response|error {
    http:Client cl = check new ("http://localhost:9090");
    map<string> headers = {};
    if token is string {
        headers[os:getEnv("GATEWAY_ASSERTION_HEADER")] = token;
    }
    return cl->get("/greeting", headers);
}

@test:Config {}
function validAssertion() returns error? {
    string token = check mint(os:getEnv("TEST_PRIVATE_KEY_FILE"));
    http:Response res = check callGreeting(token);
    test:assertEquals(res.statusCode, 200);
    json body = check res.getJsonPayload();
    test:assertEquals(body, {"message": "Hello, World!"});
}

@test:Config {}
function missingAssertion() returns error? {
    http:Response res = check callGreeting(());
    test:assertEquals(res.statusCode, 401);
    json body = check res.getJsonPayload();
    test:assertEquals(body.code, 401);
}

@test:Config {}
function wrongKeyAssertion() returns error? {
    string token = check mint(os:getEnv("TEST_OTHER_PRIVATE_KEY_FILE"));
    http:Response res = check callGreeting(token);
    test:assertEquals(res.statusCode, 401);
}

@test:Config {}
function tamperedAssertion() returns error? {
    string token = check mint(os:getEnv("TEST_PRIVATE_KEY_FILE"));
    string[] parts = re `\.`.split(token);
    string payload = parts[1];
    string altered = payload.substring(0, payload.length() - 2) + "AA";
    http:Response res = check callGreeting(parts[0] + "." + altered + "." + parts[2]);
    test:assertEquals(res.statusCode, 401);
}
