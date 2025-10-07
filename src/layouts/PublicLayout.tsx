
import { Outlet } from "react-router";

function PublicLayout() {
  return (
    <div className="flex h-screen w-screen justify-center items-center bg-slate-100 relative">
        <div className="absolute left-0 right-0 top-0 h-[50%] z-[1] bg-linear-to-r from-red-500/30 to-violet-500/30 mask-b-from-0% mask-b-to-100% mix-blend-hard-light"></div>
      <div className="z-[2]">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-[400px] max-w-full flex flex-col gap-5">
          <img src="logo.png" className="max-w-full h-[100px] self-start" />
          <Outlet />

        </div>
      </div>
    </div>
  );
}

export default PublicLayout;
