import { getCurrentUser } from "@/lib/auth/session";
import NavbarClient from "./navbar.client";

export default async function Navbar() {
  const user = await getCurrentUser();
  let isLoggedIn = false;
  if (user) {
    isLoggedIn = true;
  }

  return <NavbarClient isLoggedIn={isLoggedIn} />;
}
