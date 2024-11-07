import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNavigation from "./MobileNavigation";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-12 gap-5 ">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/logo.svg" width={50} height={50} alt="Uigm Team Logo" />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Uigm<span className="text-primary-500">Team</span>
        </p>
      </Link>
      <p>Heryerde Ara</p>
      <div className="flex-between gap-5">
        <Theme />
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
