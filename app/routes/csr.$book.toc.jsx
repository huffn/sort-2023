import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "../lib/header";
import { Link } from "react-router-dom";

export default function CSR_Chapter() {
  const params = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `/api/${params.book}.json`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setData(actualData);
        setError(null);
      } catch(err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }  
    }
    getData()
  }, [])

  return (
    <>
      {loading && <>
        <Header params={params} bookTitle="CSR Scripture Example" type="csr">
          <h2>CSR Scripture Example</h2>
        </Header>
        <div>A moment please...</div>
      </>}
      {error && (
        <div>{`There was a problem loading the data - ${error}`}</div>
      )}
      {data && <Header params={params} bookTitle={data.book_long_title} type="csr"><h2>{data.book_long_title}</h2></Header>}
      {data && data?.chapters?.map(chapter => (
        <p key={chapter.id}>
          <Link to={`/csr/${params.book}/${chapter.chapter_number}`}>Chapter {chapter.chapter_number}</Link>
        </p>
      ))}
    </>
  );
}