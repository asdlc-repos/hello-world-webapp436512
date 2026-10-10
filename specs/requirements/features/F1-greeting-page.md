# Greeting page

## Purpose

A web page where a signed-in user sees a hello message fetched from the API.

Needs: F2.

## User Stories

- F1.1 As a signed-in user, I see the hello message from the API on the page.
- F1.2 As a signed-in user, I sign out with a button on the page.
- F1.3 As a signed-in user, I see a plain error message when the API can't be reached.

## Decisions

- The page shows the API's hello message only, not the user's name.
- A user who is not signed in is sent to SSO sign-in before seeing the page. \[org default\]

