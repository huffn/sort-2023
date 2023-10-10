import { json } from "@remix-run/node"
import prisma from "../lib/db.server"

export const loader = async () => {
  const data = {
    volume: await prisma.volumes.findFirst({
      where: {
        volume_lds_url: 'bofm'
      },
      include: {
        books: true
      }
    })
  }
  if (!data.volume) {
    throw json("Volume not found", { status: 404 })
  }
  return data
}

export function CatchBoundary() {
  const caught = useCatch()

  return (
    <div>
      {caught.status}: {caught.data}
    </div>
  )
}