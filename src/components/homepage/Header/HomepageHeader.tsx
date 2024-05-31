"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const HomePageHeader = () => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <header className="fixed w-full top-0">
      <nav>
        <ul className="flex justify-end bg-gray-900">
          <NavLink href="/">Home</NavLink>
          {user.userId !== "" ? (
            <>
              <NavLink href="/profile">{user.firstName}</NavLink>
              <NavLink href="/logout">Logout</NavLink>
            </>
          ) : (
            <>
              <NavLink href="/login">Login</NavLink>
              <NavLink href="/signup">Sign Up</NavLink>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <li className={`text-white px-5 py-5`}>
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default HomePageHeader;
