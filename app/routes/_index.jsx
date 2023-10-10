import { Link } from "react-router-dom"
import { useLoaderData } from "@remix-run/react";
import { loader as apiLoader } from "./api[.]json";
import Header from "../lib/header"


export const loader = async (args) => {
  return await apiLoader({...args})
}

export default function SSR_Chapter() {
  const data = useLoaderData()
  return (
    <>
    <Header>
      <div className="grid">
        <div>
          <hgroup>
            <h2>CSR</h2>
          </hgroup>
          {data && data?.volume?.books?.map(book => (
            <p key={book.id}><Link to={`/csr/${book.book_lds_url}/toc`} reloadDocument>{book.book_long_title}</Link></p>
          ))}
        </div>
        <div>
        <hgroup>
            <h2>SSR</h2>
          </hgroup>
          {data && data?.volume?.books?.map(book => (
            <p key={book.id}><Link to={`/ssr/${book.book_lds_url}/toc`} reloadDocument>{book.book_long_title}</Link></p>
          ))}
        </div>
      </div>
    </Header>
    </>
  )
}