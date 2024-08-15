import React from "react"

export default function AvatarGroup() {
  return (
    <div className="my-4">
      <div className="flex -space-x-2">
        <img
          className="inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
          src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="Avatar"
        />
        <img
          className="inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
          src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="Avatar"
        />
        <img
          className="inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
          src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80"
          alt="Avatar"
        />
        <img
          className="inline-block size-[26px] rounded-full ring-2 ring-white dark:ring-neutral-900"
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
          alt="Avatar"
        />
        <div className="hs-dropdown relative inline-flex [--placement:top-left]">
          <button
            id="hs-avatar-group-dropdown"
            className="hs-dropdown-toggle inline-flex size-[26px] items-center justify-center rounded-full border-2 border-white bg-gray-100 align-middle text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:bg-gray-300 focus:outline-none dark:border-neutral-800 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
            aria-haspopup="menu"
            aria-expanded="false"
            aria-label="Dropdown"
          >
            <span className="font-medium leading-none">9+</span>
          </button>

          <div
            className="hs-dropdown-menu hs-dropdown-open:opacity-100 z-10 mb-2 hidden w-48 rounded-lg bg-white p-2 opacity-0 shadow-md transition-[margin,opacity] duration-300 dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="hs-avatar-group-dropdown"
          >
            <a
              className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
              href="#"
            >
              Chris Lynch
            </a>
            <a
              className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
              href="#"
            >
              Maria Guan
            </a>
            <a
              className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
              href="#"
            >
              Amil Evara
            </a>
            <a
              className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
              href="#"
            >
              Ebele Egbuna
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
