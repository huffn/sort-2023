import { useLoaderData, useParams } from "@remix-run/react";
// import chapterCss from '~/css/chapter.css'
import { loader as apiLoader } from "./api.$book[.]json";
import Header from "../lib/header";
import { Link } from "react-router-dom";

export const loader = async (args) => {
  return await apiLoader({...args})
}

export default function SSR_Chapter() {
  const data = useLoaderData()
  const params = useParams()

  return (
    <>
      <Header params={params} bookTitle={data.book_long_title} type="ssr">
        <h2>{data.book_long_title}</h2>
      </Header>
      
      {data?.chapters?.map((chapter) => (
        <p key={chapter.id}>
          <Link to={`/ssr/${params.book}/${chapter.chapter_number}`} reloadDocument>Chapter {chapter.chapter_number}</Link>
        </p>
      ))}
    </>
  )
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      {caught.status}: {caught.data}
    </div>
  )
}