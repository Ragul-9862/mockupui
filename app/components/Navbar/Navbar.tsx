"use client";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { getImagePath } from "../../../lib/utils";
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Registerdialog from "./Registerdialog";
import Signdialog from "./Signdialog";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);

  // Open Register dialog from Sign In
  const openRegister = () => {
    setShowSignIn(false);
    setTimeout(() => setShowRegister(true), 300);
  };

  // ✅ Automatically show Sign In popup after 3s if not logged in
  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowSignIn(true);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Disclosure as="nav" className="navbar">
      <>
        <div className="mx-auto max-w-7xl px-6 lg:py-4 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
              {/* LOGO */}
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="block h-12 w-40 lg:hidden"
                  src={getImagePath("/assets/logo/logo.png")}
                  alt="logo"
                />
                <img
                  className="hidden h-full w-full lg:block"
                  src={getImagePath("/assets/logo/logo.png")}
                  alt="logo"
                />
              </div>
            </div>

            {/* Sign In / Register Dialogs */}
            <Signdialog
              show={showSignIn}
              setShow={setShowSignIn}
              openRegister={openRegister}
            />

           

            {/* Mobile Drawer */}
            <div className="block lg:hidden">
              <Bars3Icon
                className="block h-6 w-6 cursor-pointer"
                aria-hidden="true"
                onClick={() => setIsOpen(true)}
              />
            </div>

            <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
              <Drawerdata />
            </Drawer>
          </div>
        </div>
      </>
    </Disclosure>
  );
};

export default Navbar;
