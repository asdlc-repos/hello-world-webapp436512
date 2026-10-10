import type { ReactElement } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  AppShell as OxygenShell,
  ColorSchemeToggle,
  Divider,
  Footer,
  Header,
  Sidebar,
  UserMenu,
} from "@wso2/oxygen-ui";
import { Hand, LogOut } from "@wso2/oxygen-ui-icons-react";
import { Can, useAuthz } from "../authz/gates";
import { SCREEN_ROUTES } from "../authz/screens";
import { signOut } from "../authz/session";
import { APP_NAME } from "../appName";

const ICONS: Record<string, ReactElement> = { greeting: <Hand /> };

export function AppShell(): ReactElement {
  const { pathname } = useLocation();
  const { username } = useAuthz();
  const active = SCREEN_ROUTES.find((s) => pathname.startsWith(s.path))?.key ?? "";

  return (
    <OxygenShell>
      <OxygenShell.Navbar>
        <Header>
          <Header.Toggle />
          <Header.Brand>
            <Header.BrandTitle>{APP_NAME}</Header.BrandTitle>
          </Header.Brand>
          <Header.Spacer />
          <Header.Actions>
            <ColorSchemeToggle />
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <UserMenu>
              <UserMenu.Trigger name={username || "Signed in"} />
              <UserMenu.Item icon={<LogOut />} label="Sign out" onClick={() => void signOut()} />
            </UserMenu>
          </Header.Actions>
        </Header>
      </OxygenShell.Navbar>

      <OxygenShell.Sidebar>
        <Sidebar activeItem={active}>
          <Sidebar.Nav>
            <Sidebar.Category>
              {SCREEN_ROUTES.map((screen) =>
                screen.loads === null ? null : (
                  <Can key={screen.key} op={screen.loads}>
                    <Sidebar.Item id={screen.key} link={<Link to={screen.path} />}>
                      <Sidebar.ItemIcon>{ICONS[screen.key]}</Sidebar.ItemIcon>
                      <Sidebar.ItemLabel>{screen.label}</Sidebar.ItemLabel>
                    </Sidebar.Item>
                  </Can>
                ),
              )}
              <Sidebar.Item
                id="sign-out"
                link={
                  <Link
                    to="#"
                    onClick={(e) => {
                      e.preventDefault();
                      void signOut();
                    }}
                  />
                }
              >
                <Sidebar.ItemIcon>
                  <LogOut />
                </Sidebar.ItemIcon>
                <Sidebar.ItemLabel>Sign out</Sidebar.ItemLabel>
              </Sidebar.Item>
            </Sidebar.Category>
          </Sidebar.Nav>
        </Sidebar>
      </OxygenShell.Sidebar>

      <OxygenShell.Main>
        <Outlet />
      </OxygenShell.Main>

      <OxygenShell.Footer>
        <Footer>
          <Footer.Copyright>© WSO2 LLC</Footer.Copyright>
        </Footer>
      </OxygenShell.Footer>
    </OxygenShell>
  );
}
