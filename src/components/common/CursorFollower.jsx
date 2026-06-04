"use client"

import gsap from "gsap"
import { useEffect } from "react"

export default function CursorFollower() {

  useEffect(() => {

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      gsap.to("#cursor", {
        x: clientX - 20 / 2,
        y: clientY - 20 / 2,
        duration: 0.8,
        ease: "power3.out",
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div id="cursor" className="fixed top-0 left-0 h-5 w-5 bg-white rounded-full z-10 pointer-events-none mix-blend-difference "></div>
  )
}