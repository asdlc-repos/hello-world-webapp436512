screen Greeting "Signed-in home: shows the hello message from the API"
  navbar "Hello World"
  sidebar "Greeting | Sign out"
  heading "Greeting"
  card "Message | Hello, World! | fetched from the API"
  button "Sign out"

screen GreetingError "Shown in place of the message when the API cannot be reached"
  navbar "Hello World"
  sidebar "Greeting -> Greeting | Sign out"
  heading "Greeting"
  text "The greeting could not be loaded. The API cannot be reached."
  button "Sign out"

flow "View greeting"
  role "Greeter"
  description "A signed-in user sees the hello message, or an error when the API is down, and signs out"
  Greeting
  GreetingError
