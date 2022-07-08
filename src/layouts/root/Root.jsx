import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="flex flex-col w-screen overflow-x-hidden">
      <div className="flex flex-row w-full py-5 pl-10 bg-sky-400 text-black sticky z-10 top-0 mb-10">
        <a href="/news">
          <img
            className="w-[5rem] md:w-[8rem] h-auto"
            src="https://trulyexperiences.com/skin/frontend/limesharp/truly/images/truly-logo.svg"
            alt="Truly Logo"
          />
        </a>
      </div>
      <Outlet />
    </div>
  );
};

export default Root;
