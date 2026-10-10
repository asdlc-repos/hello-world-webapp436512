import ballerina/http;

listener http:Listener ep0 = new (9090);

service http:InterceptableService / on ep0 {
    public function createInterceptors() returns AssertionInterceptor => new;

    resource function get greeting(http:RequestContext ctx) returns Greeting|http:Unauthorized {
        GatewayCaller|http:Unauthorized caller = requireGatewayCaller(ctx);
        if caller is http:Unauthorized {
            ErrorResponse body = {
                code: 401,
                message: "Unauthorized",
                description: "no verified caller on this request"
            };
            return <http:Unauthorized>{body};
        }
        return {message: "Hello, World!"};
    }
}
