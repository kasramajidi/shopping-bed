import LeftSide from "./../../components/home/LeftSide";
import ImageHome from "./../../components/home/ImageHome";
import Featured from "./../../components/home/Featured";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-20 flex flex-col dark:text-[rgb(247,247,241)]">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
        <LeftSide />
        <ImageHome />
      </div>

      <Featured />
    </div>
  );
}
