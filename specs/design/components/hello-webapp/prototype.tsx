import type { ReactNode } from "react";
import {
  Alert, AppShell, Button, Detail, Heading, Screen, Section, Text, defineApp, useDisplayState, useValue,
} from "@wso2/prototype-kit";

interface Greeting { message: string }

const greeting: Greeting = { message: "Hello, World!" };

const user = { name: "Sam Perera", email: "sam@acme.example" };

function Shell({ children }: { children: ReactNode }) {
  return (
    <AppShell
      id="shell"
      user={user}
      nav={[{ id: "nav.greeting", label: "Greeting", to: "screen.greeting" }]}
      account="screen.account"
      settings="screen.settings"
      signOut="screen.signed-out"
    >
      {children}
    </AppShell>
  );
}

function GreetingScreen() {
  const state = useDisplayState();
  const [data] = useValue<Greeting>("greeting");
  return (
    <Shell>
      <Heading id="heading.greeting" text="Greeting" />
      <Section id="section.greeting" title="Message" subtitle="Fetched from the API">
        {state === "state.failed" ? (
          <Alert
            id="alert.api-failed"
            tone="error"
            title="Greeting unavailable"
            text="The greeting could not be loaded because the API cannot be reached."
          />
        ) : (
          <Text id="text.message" text={data.message} tone="primary" />
        )}
      </Section>
    </Shell>
  );
}

function Account() {
  return (
    <Shell>
      <Heading id="heading.account" text="Account" />
      <Detail
        id="detail.account"
        fields={[
          { label: "Name", value: user.name },
          { label: "Email", value: user.email },
        ]}
      />
    </Shell>
  );
}

function Settings() {
  return (
    <Shell>
      <Heading id="heading.settings" text="Settings" />
      <Text id="text.settings" text="There are no settings to change in this app." />
    </Shell>
  );
}

function SignedOut() {
  return (
    <Screen>
      <Heading id="heading.signed-out" text="You are signed out" />
      <Button id="btn.sign-in" label="Sign in" emphasis="primary" to="screen.greeting" />
    </Screen>
  );
}

export default defineApp({
  screens: {
    "screen.greeting": GreetingScreen,
    "screen.account": Account,
    "screen.settings": Settings,
    "screen.signed-out": SignedOut,
  },
  data: { greeting },
});
