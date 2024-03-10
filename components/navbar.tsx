import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import NavLinks from "./nav-links";
import StoreSwitcher from "./store-switcher";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="flex py-2 items-center px-10 justify-between border-b-2">
      <div>
        <StoreSwitcher items={stores} />
      </div>
      <div>
        <NavLinks />
      </div>
      <ThemeToggle/>
      <UserButton showName afterSignOutUrl="/"  />
    </div>
  );
};

export default Navbar;
