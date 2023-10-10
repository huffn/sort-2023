import { useLoaderData, useParams } from "@remix-run/react";
// import chapterCss from '~/css/chapter.css'
import { loader as apiLoader } from "./api.$book.$chapter[.]json";
import Header from "../lib/header";

export const loader = async (args) => {
  return await apiLoader({...args})
}

export default function SSR_Chapter() {
  const data = useLoaderData()
  const params = useParams()

  return (
    <>
      <Header params={params} bookTitle={data.book_long_title} type="ssr">
        <h2>{data.book_long_title} – {params.chapter}</h2>
      </Header>
      
      {data?.chapters?.[0]?.verses.map((verse) => (
        <p key={verse.id}>{verse.verse_number}. {verse.scripture_text}</p>
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