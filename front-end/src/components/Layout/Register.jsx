import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import Logout from "../Logout/Logout"
import { useTheme } from "./../../context/ThemeContext"
export default function register() {
  const { isAuthenticated } = useAuth()
  const { isDarkMode } = useTheme()
  return (
    <section className={`${isDarkMode ? "dark:bg-[rgb(65,68,87)]" : "bg-[rgb(16,10,55)]"} py-2`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center lg:justify-end gap-4 px-8 text-[#C7C9D1]">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <span className="text-xs  sm:text-sm">Hello, demo user</span>
            <Logout />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href={"/Login"} className="link link-hover text-xs sm:text-sm">Sign in / Guest</Link>
            <Link href={"/Signup"} className="link link-hover text-xs sm:text-sm">Create Account</Link>
          </div>
        )}
      </div>
    </section>
  )
}

