import {Suspense} from "react";
import {Link, useLoaderData, useSearchParams, Await, defer, json} from "react-router-dom";
import BlogFilter from "../components/BlogFilter";

const BlogPage = () => {
  const {posts} = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  const titleQuery = searchParams.get("title") || "";
  const latestQuery = searchParams.has("latest");
  const startsFrom = latestQuery ? 80 : 1;

  return (
    <>
      <h1>BlogPage</h1>
      <BlogFilter titleQuery={titleQuery} latestQuery={latestQuery} setSearchParams={setSearchParams}/>
      <Link to="/blog/add">Add new</Link>
      <ul>
        <Suspense fallback={<h2>loading...</h2>}>
          <Await resolve={posts}>
            {
              (resolvedPosts) => (
                <>
                  {resolvedPosts.filter(
                    post => post.title.includes(titleQuery) && post.id >= startsFrom
                  ).map(post => (
                    <li key={post.id}>
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </li>
                  ))}
                </>
              )
            }
          </Await>
        </Suspense>
      </ul>
    </>
  )
}

async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  //lesson 9 variant 1
  // if(!res.ok){
  //    throw new Response("", {status: res.status, statusText: 'Not found'})
  // }

  return res.json();
}

const blogLoader = async () => {
  const posts = await getPosts();

  //lesson 9 variant 2
  if (!posts.length) {
    throw json({message: "Not Found", reason: "Wrong Url"}, {status: 404})
  }

  return defer({
    posts
  });
}

export {BlogPage, blogLoader}