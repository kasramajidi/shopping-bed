import LeftSide from "@/components/home/LeftSide"
import ImageHome from "@/components/home/ImageHome"
import Featured from "@/components/home/Featured"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-10 py-20 flex flex-col">
      <div className="flex items-center justify-between gap-8">
        <LeftSide/>
        <ImageHome/>
      </div>
      <Featured/>
    </div>
  )
}
