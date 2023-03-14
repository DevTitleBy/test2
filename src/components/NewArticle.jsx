import {Form} from "react-router-dom";

const NewArticle = ({submitting}) => {
  return (
    <Form action="/blog/add" method="post">
      <label>
        Title:
        <input type="text" name="title"/>
      </label>
      <label>
        Description:
        <input type="text" name="body"/>
      </label>
      <input type="hidden" name="userId" value="1"/>
      <button disabled={submitting}>Submit</button>
    </Form>
  )
}

export {NewArticle}