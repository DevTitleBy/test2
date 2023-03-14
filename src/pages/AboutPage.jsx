import {Link, Outlet} from "react-router-dom";


export default function AboutPage() {
  return (
    <>
      <h1>AboutPage</h1>
      <ul>
        <li>
          <Link to="contacts">Contacts</Link>
        </li>
        <li>
          <Link to="team">Team</Link>
        </li>
      </ul>
      {/*Можно делать и так, но лучше все роуты хранить в одном месте*/}
      {/*<Routes>*/}
      {/*  <Route path="contacts" element={<p>Our Contacts</p>}/>*/}
      {/*  <Route path="team" element={<p>Our Team</p>}/>*/}
      {/*</Routes>*/}
      <Outlet/>
    </>
  )
}
