import Sidebar from "@/app/(routes)/(with-bar)/_sidebar";
import Navbar from "@/app/(routes)/(with-bar)/_navbar";

export default function withSidebarLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="min-h-screen w-full bg-blue-50 overflow-auto flex-grow pt-16 text-black">
          <div className="p-10">{children}</div>
        </div>
      </div>
    </>
  );
}
