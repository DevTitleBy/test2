import {Suspense} from "react";
import {Link, useLoaderData, useNavigate, Await, useAsyncValue, defer} from "react-router-dom";

const Post = () => {
  const post = useAsyncValue();
  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </>
  )
}

const Comments = () => {
  const comments = useAsyncValue();
  return (
    <div>
      <h2>Comments</h2>
      {
        comments.map(comment => (
          <>
            <hr/>
            <h3>{comment.email}</h3>
            <h4>{comment.name}</h4>
            <p>{comment.body}</p>
            <hr/>
          </>
        ))
      }
    </div>
  )
}

const ArticlePage = () => {
  const {post, comments, id} = useLoaderData();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <button onClick={goBack}>back</button>
      <Suspense fallback={<h2>Post loading...</h2>}>
        <Await resolve={post}>
          <Post/>
        </Await>
      </Suspense>
      <Suspense fallback={<h2>Comments loading...</h2>}>
        <Await resolve={comments}>
          <Comments/>
        </Await>
      </Suspense>
      <Link to={`/blog/${id}/edit`}>Edit</Link>
    </div>
  )
}

async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  return res.json();
}

async function getComments(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);

  return res.json();
}

const articleLoader = async ({params}) => {
  const id = params.id;

  return defer({
    post: await getPost(id), //будет на предыдущей странице дожидаться пока не загрузятся посты
    // post: getPost(id),
    comments: getComments(id),
    id
  });
}

export {ArticlePage, articleLoader}