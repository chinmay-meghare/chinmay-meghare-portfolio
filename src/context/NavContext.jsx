"use client";

import React, { createContext, useState } from "react";
import { usePathname } from "next/navigation";

export const NavbarContext = createContext();

const NavContext = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);

  const pathname = usePathname();

  return (
    <NavbarContext.Provider value={[navOpen, setNavOpen]}>
        {children}
    </NavbarContext.Provider>
  );
};

export default NavContext;