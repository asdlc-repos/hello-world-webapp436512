import { useEffect, useRef, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@wso2/oxygen-ui";
import { handleCallback } from "../authz/session";

/** The OIDC redirect target. Finishes sign-in once, then lands on the app root. */
export function CallbackPage(): ReactElement {
  const navigate = useNavigate();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    void handleCallback().then(() => navigate("/", { replace: true }));
  }, [navigate]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
      <CircularProgress />
    </Box>
  );
}
