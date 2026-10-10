Feature: F2 Greeting API

  @story-F2.1
  Rule: A signed-in caller always receives the fixed greeting

    Scenario: A signed-in user asks for the greeting
      Given Sam the signed-in user holds a valid sign-in
      When Sam requests the greeting
      Then the greeting returned is "Hello, World!"

  @story-F2.2
  Rule: Only signed-in callers may get the greeting

    @negative
    Scenario: A caller with no sign-in
      Given Vera has no sign-in
      When Vera requests the greeting
      Then the request is rejected as unauthorized
      And no greeting is returned to Vera
