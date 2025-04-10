import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./Header.css";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="header-container">
        <Image src="/AceMock_logo.png" width={130} height={70} alt="img" />
      <div className="center-container">
        <Link href="/dashboard" className="navbar-ele">Dashboard</Link>
        <Link href="/questions" className="navbar-ele">Questions</Link>
        <Link href="/upgrade" className="navbar-ele">Upgrade</Link>
        <Link href="/how-it-works" className="navbar-ele">How it Works?</Link>
      </div>
      <UserButton />
    </div>
  );
};

export default Header;