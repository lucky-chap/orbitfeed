import React from 'react'
import Image from 'next/image'

import logo from "@/public/images/logo.png";

export default function Logo() {
  return (
    <Image src={logo} alt='Logo' height={30} />
  )
}
