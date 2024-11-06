import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full p-6 shadow-light-300 dark:shadow-none sm:px-12 gap-5 ">
      <Link href="/" className="flex items-center gap-1">
        <Image src="/logo.svg" width={30} height={30} alt="UIGM Team Logo" />
        <p className="h2-bold font-space-grotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          UIGM<span className="text-primary-500">Team</span>
        </p>
      </Link>
      <p>Heryerde Ara</p>
      <div className="flex-between gap-5">Theme Seç</div>
    </nav>
  );
};

export default Navbar;
