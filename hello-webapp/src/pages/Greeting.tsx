import { useCallback, useEffect, useState, type ReactElement } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  PageContent,
  PageTitle,
  Typography,
} from "@wso2/oxygen-ui";
import { LogOut } from "@wso2/oxygen-ui-icons-react";
import { helloApi } from "../api";
import { ForbiddenError } from "../authz/client";
import { signOut } from "../authz/session";

type State =
  | { kind: "loading" }
  | { kind: "ready"; message: string }
  | { kind: "error" };

/**
 * Greeting and GreetingError are one route: the error replaces the message in
 * place when the API cannot be reached or fails.
 */
export function GreetingPage(): ReactElement {
  const [state, setState] = useState<State>({ kind: "loading" });

  const load = useCallback(async () => {
    setState({ kind: "loading" });
    try {
      const { data, response } = await helloApi.GET("/greeting");
      if (response.ok && data) setState({ kind: "ready", message: data.message });
      else setState({ kind: "error" });
    } catch (err) {
      // A refusal already routed to /forbidden; leave the screen alone.
      if (err instanceof ForbiddenError) return;
      setState({ kind: "error" });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <PageContent>
      <PageTitle>
        <PageTitle.Header>Greeting</PageTitle.Header>
        <PageTitle.Actions>
          <Button variant="outlined" startIcon={<LogOut size={18} />} onClick={() => void signOut()}>
            Sign out
          </Button>
        </PageTitle.Actions>
      </PageTitle>

      {state.kind === "loading" && (
        <Box sx={{ display: "flex", p: 2 }}>
          <CircularProgress />
        </Box>
      )}
      {state.kind === "ready" && (
        <Card>
          <CardContent>
            <Typography variant="overline" color="text.secondary">
              Message
            </Typography>
            <Typography variant="h4">{state.message}</Typography>
            <Typography variant="caption" color="text.secondary">
              fetched from the API
            </Typography>
          </CardContent>
        </Card>
      )}
      {state.kind === "error" && (
        <Alert severity="error">The greeting could not be loaded. The API cannot be reached.</Alert>
      )}
    </PageContent>
  );
}
