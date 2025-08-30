// components/Layout.tsx
import React from "react";

import Link from "next/link";

 function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow-md">
      <div className="flex-1">
        <Link href="/scan" className="btn btn-ghost normal-case text-xl">
          WebShield 🔒
        </Link>
      </div>
      <div className="flex-none space-x-2">
        <Link href="/scan" className="btn btn-ghost">
          Home
        </Link>
        <Link href="/results" className="btn btn-ghost">
          Scan Results
        </Link>
        <Link href="/api/auth/signout" className="btn btn-ghost">
          Signout
        </Link>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="footer footer-center p-4 bg-base-200 text-base-content mt-10">
      <aside>
        <p>© {new Date().getFullYear()} WebShield | Built with ❤️ by MD Soriful Islam</p>
      </aside>
    </footer>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
