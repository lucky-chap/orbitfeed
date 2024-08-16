import Image from "next/image"
import Link from "next/link"
import folder from "@/public/images/folder.png"

import { Button } from "./ui/button"

export default function Empty({
  image,
  heading,
  subheading,
  icon,
}: {
  image?: boolean
  heading: string
  subheading: string
  icon?: boolean
}) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-64 w-full flex-col items-center justify-center rounded-lg">
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          {image && <Image src={folder} alt="folder" height={42} width={42} />}
          <p className="mb-2 mt-4 text-lg font-medium text-zinc-600">
            <span className="">{heading}</span>{" "}
          </p>
          <p className="text-zinc-500">{subheading}</p>
          {icon && (
            <Link href={"/create"}>
              <Button
                variant={"ghost"}
                className="mr-2 mt-2 rounded-md bg-blue-500 px-5 py-2 font-medium text-white transition-all duration-100 ease-linear hover:bg-blue-600 hover:text-white"
              >
                New orbit
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
