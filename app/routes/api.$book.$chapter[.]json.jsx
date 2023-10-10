import { json } from "@remix-run/node"
import prisma from "../lib/db.server"

export const loader = async ({ params }) => {
  // await new Promise(resolve => setTimeout(resolve, 3000));
  const book = await prisma.books.findFirst({
    where: {
      book_lds_url: params.book
    },
    select: {
      book_long_title: true,
      chapters: {
        where: {
          chapter_number: Number.parseFloat(params.chapter)
        },
        include: {
          verses: true
        }
      }
    }
  })
  if (!book) {
    throw json("Book not found", { status: 404 })
  }
  if (book.chapters.length === 0) {
    throw json("Chapter not found", { status: 404 })
  }
  return json(book, 200)
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      {caught.status}: {caught.data}
    </div>
  )
}