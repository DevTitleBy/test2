import {useState} from "react";

export default function BlogFilter({titleQuery, latestQuery, setSearchParams}) {

  const [searchTitle, setSearchTitle] = useState(titleQuery);
  const [searchLatest, setSearchLatest] = useState(latestQuery);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.search.value;
    const isLatest = form.latest.checked;

    const params = {};

    if (title.length) {
      params.title = title;
    }

    if (isLatest) {
      params.latest = true;
    }

    setSearchParams(params);
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input type="search" name="search" value={searchTitle} onChange={e => setSearchTitle(e.target.value)}/>
      <label>
        <input type="checkbox" name="latest" checked={searchLatest} onChange={e => setSearchLatest(e.target.checked)}/>
        Latest
      </label>
      <button>Search</button>
    </form>
  )
}
