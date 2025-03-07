import Link from "next/link"

export default function register() {
  return (
    <section className="bg-[rgb(16,10,55)] py-2">
      <div className="max-w-5xl mx-auto flex items-center justify-end gap-x-6 text-[#C7C9D1]">
          <Link href={"/login"} className="link link-hover text-xs sm:text-sm">Sign in / Guest</Link>
          <Link href={"/signup"} className="link link-hover text-xs sm:text-sm">Create Account</Link>
      </div>  
    </section>
  )
}

