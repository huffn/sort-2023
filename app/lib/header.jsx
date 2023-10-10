import { Link } from "react-router-dom";

export default function Header({params, bookTitle, type, children}) {
  return (
    <>
      <nav aria-label="breadcrumb">
        <ul>
          <li>{params?.book ? (
            <Link to="/" reloadDocument>Home</Link>
          ) : ("Home")}</li>
          {params && params.book && 
            <li>
              {params.chapter ? (
                <Link to={`/${type}/${params.book}/toc`} reloadDocument>{bookTitle}</Link>
              ) : (bookTitle)}</li>
          }
          {params && params.chapter && <li>Chapter {params.chapter}</li>}
        </ul>
      </nav>
      <div className="headings">
        <h1>Search the Book of Mormon</h1>
        {children}
      </div>
    </>
  )
}