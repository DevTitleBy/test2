import {Form} from "react-router-dom";

const EditArticle = ({id, title, body, userId, submitting}) => {
  return (
    <Form action={`/blog/${id}/edit`} method="post">
      <label>
        Title:
        <input type="text" name="title" defaultValue={title}/>
      </label>
      <label>
        Description:
        <input type="text" name="body" defaultValue={body}/>
      </label>
      <input type="hidden" name="id" value={id}/>
      <input type="hidden" name="userId" value={userId}/>
      <button disabled={submitting}>Submit</button>
    </Form>
  )
}

export {EditArticle}