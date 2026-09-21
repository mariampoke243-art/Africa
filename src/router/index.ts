import { useNavigate, useRoutes, type NavigateFunction } from "react-router-dom";
import { useEffect } from "react";
import routes from "./config";

let navigateResolver: (navigate: NavigateFunction) => void;

declare global {
  interface Window {
    REACT_APP_NAVIGATE: NavigateFunction;
  }
}

export const navigatePromise = new Promise<NavigateFunction>((resolve) => {
  navigateResolver = resolve;
});

export function AppRoutes() {
  const navigate = useNavigate();
  const element = useRoutes(routes);

  useEffect(() => {
    window.REACT_APP_NAVIGATE = navigate;
    navigateResolver(navigate);
  }, [navigate]);

  return element;
}
