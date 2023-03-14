import {NavLink, Outlet, useNavigate} from "react-router-dom";
import CustomLink from "./CustomLink";

import useAuth from "../hook/useAuth";

const setActive = ({isActive}) => isActive ? "active-link" : "";
const setActiveStyle = ({isActive}) => ({color: isActive ? "green" : ""});

function Layout() {
  const {user, signout} = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header>
        <NavLink to="/" className={setActive}>Home</NavLink>&nbsp;
        <CustomLink to="/blog" className="blog-link">Blog</CustomLink>&nbsp;
        <CustomLink to="/about">About</CustomLink>&nbsp;
        <NavLink to="/test" style={setActiveStyle}>NotFound</NavLink>
        {user && (
          <button onClick={() => signout(() => navigate("/", {replace: true}))}>Log Out</button>
        )}
      </header>
      <main>
        <Outlet/>
      </main>
      <footer>2023</footer>
    </>
  );
}

export default Layout;
