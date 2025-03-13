import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import Logout from "../Logout/Logout"

export default function register() {
  const {isAuthenticated} = useAuth()
  return (
    <section className="bg-[rgb(16,10,55)] py-2">
      <div className="max-w-5xl mx-auto flex items-center justify-end gap-x-6 text-[#C7C9D1]">
        {isAuthenticated ? (
          <>
            <span className="text-xs">Hello, demo user</span>
            <Logout/>
          </>
        ) : (
          <>
            <Link href={"/pages/Login"} className="link link-hover text-xs sm:text-sm">Sign in / Guest</Link>
            <Link href={"/pages/Signup"} className="link link-hover text-xs sm:text-sm">Create Account</Link>
          </>
        )}
      </div>
    </section>
  )
}

