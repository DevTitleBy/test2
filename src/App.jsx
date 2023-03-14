import {Route, Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import {BlogPage, blogLoader} from "./pages/BlogPage";
import {articleLoader, ArticlePage} from "./pages/ArticlePage";
import {CreateArticlePage, createArticleAction} from "./pages/CreateArticlePage";
import {EditArticlePage, editPostAction} from "./pages/EditArticlePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import {ErrorPage} from "./pages/ErrorPage";

import Layout from "./components/Layout";

import RequireAuth from "./hoc/RequireAuth";
import AuthProvider from "./hoc/AuthProvider";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout/>}>
    <Route index element={<HomePage/>}/>
    <Route path="about-us" element={<Navigate to="/about" replace/>}/>
    <Route path="about" element={<AboutPage/>}>
      <Route path="contacts" element={<p>Our Contacts</p>}/>
      <Route path="team" element={<p>Our Team</p>}/>
    </Route>
    <Route path="blog" element={<BlogPage/>} loader={blogLoader} errorElement={<ErrorPage/>}/>
    <Route path="blog/:id" element={<ArticlePage/>} loader={articleLoader}/>
    <Route path="blog/:id/edit" element={
      <RequireAuth>
        <EditArticlePage/>
      </RequireAuth>
    } loader={articleLoader} action={editPostAction}/>
    <Route path="blog/add" element={
      <RequireAuth>
        <CreateArticlePage/>
      </RequireAuth>
    } action={createArticleAction}/>
    <Route path="login" element={<LoginPage/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Route>
));

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  );
}

export default App;
