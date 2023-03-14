import {useActionData, useLoaderData, useNavigation} from "react-router-dom";
import {EditArticle} from "../components/EditArticle";

const EditArticlePage = () => {
  const {post, id} = useLoaderData();
  const navigation = useNavigation();
  const data = useActionData();

  return (
    <>
      <h1>EditArticlePage {id}</h1>
      {data?.message && <div>{data.message}</div>}
      <EditArticle {...post} submitting={navigation.state === "submitting"}/>
    </>
  )
}

const editPost = async (post) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.get("id")}`, {
    method: "PUT",
    body: post
  });

  return res.json();
}

const editPostAction = async ({request}) => {
  const formData = await request.formData();

  if(!formData.get('title') || !formData.get('body')){
    return {message: `All field are required!`};
  }

  const updatePost = await editPost(formData);

  return {message: `Post ${updatePost.id} was successfully updated!`};
}

export {EditArticlePage, editPostAction}
