public type Greeting record {|
    string message;
|};

public type ErrorResponse record {|
    int code;
    string message;
    string description?;
    string moreInfo?;
|};
