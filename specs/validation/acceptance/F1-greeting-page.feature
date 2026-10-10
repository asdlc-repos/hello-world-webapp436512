Feature: F1 Greeting page

  @story-F1.1
  Rule: A signed-in user sees the API's hello message and nothing personalised

    Scenario: Opening the page after signing in
      Given Sam the signed-in user has signed in
      When Sam opens the greeting page
      Then the page shows "Hello, World!"
      And the page does not show Sam's name

  @story-F1.1
  Rule: Only signed-in users see the greeting

    @negative
    Scenario: A visitor who is not signed in
      Given Vera has not signed in
      When Vera opens the greeting page
      Then the page does not show "Hello, World!"
      And Vera is asked to sign in

  @story-F1.2
  Rule: A signed-in user can sign out from the page

    Scenario: Signing out
      Given Sam the signed-in user is on the greeting page
      When Sam signs out with the sign-out button
      Then Sam is no longer signed in
      And the greeting page no longer shows "Hello, World!" to Sam

  @story-F1.3
  Rule: When the API cannot be reached the page shows a plain error message instead of the greeting

    @negative
    Scenario: The API is unreachable
      Given Sam the signed-in user has signed in
      And the greeting API cannot be reached
      When Sam opens the greeting page
      Then the page shows an error message
      And the page does not show "Hello, World!"
