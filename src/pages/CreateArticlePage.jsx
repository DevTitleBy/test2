import {NewArticle} from "../components/NewArticle";
import {redirect, useNavigation} from "react-router-dom";

const CreateArticlePage = () => {
  const navigation = useNavigation();

  return (
    <>
      <h1>CreateArticlePage</h1>
      <NewArticle submitting={navigation.state === "submitting"} />
    </>
  )
}

const createArticle = async ({title, body, userId}) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title, body, userId})
  });

  const newPost = await res.json();

  return newPost;
}

const createArticleAction = async ({request}) => {
  const formData = await request.formData();

  const newPost = {
    title: formData.get("title"),
    body: formData.get("body"),
    userId: formData.get("userId"),
  }

  const post = await createArticle(newPost);

  return redirect("/blog/"+post.id);
}

export {CreateArticlePage, createArticleAction}