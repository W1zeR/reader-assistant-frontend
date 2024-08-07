import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useAuth(shouldRedirect: boolean) {
  const { data: session } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/signin", redirect: shouldRedirect });
    }

    if (session === null) {
      setIsAuthenticated(false);
    } else if (session !== undefined) {
      setIsAuthenticated(true);
    }
  }, [session, shouldRedirect]);

  return isAuthenticated;
}
