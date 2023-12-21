import { BiHomeCircle, BiUser } from "react-icons/bi";
import { FaHashtag } from "react-icons/fa";
import {
  BsBell,
  BsBookmark,
  BsTwitter,
  BsEnvelope,
  BsThreeDots,
} from "react-icons/bs";
import Link from "next/link";
import LogOutButton from "./client-components/LogOutButton";



export const revalidate = 0;

const NAVIGATION_ITEMS = [
  {
    title: "Twitter",
    icon: BsTwitter,
  },
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: FaHashtag,
  },
  {
    title: "Notifications",
    icon: BsBell,
  },
  {
    title: "Messages",
    icon: BsEnvelope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "Profile",
    icon: BiUser,
  },
];
const LeftSidebar = ({user}:any) => {
  return (
    <div className="shrink-0 basis-64 mr-2 hidden lg:block">
      <section className="fixed w-64 text-xl flex flex-col h-screen items-stretch">
        <div className="space-y-4 mt-4 h-full">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.title}
              href={`
            ${item.title === "Twitter" ? "/" : `/${item.title.toLowerCase()}`}
            `}
              className={`transition duration-200 rounded-3xl px-6 py-2 flex items-center justify-start space-x-4 ${
                item.title === "Twitter" ? null : "hover:bg-white/20"
              }`}
            >
              <div>
                <item.icon />
              </div>
              {item.title !== "Twitter" && <div>{item.title}</div>}
            </Link>
          ))}
          <button className="w-full rounded-full bg-primary text-white py-2 font-medium hover:bg-opacity-70 transition duration-300">
            Tweet
          </button>
          <LogOutButton/>
        </div>
        <button className="w-full rounded-full text-white py-2 font-medium hover:bg-white/10 transition duration-300 flex space-x-2 px-2 items-center justify-between">
          <div className="flex space-x-3 items-center">
            <div className="rounded-full h-10 w-10 bg-slate-400">
              <img src="https://api.multiavatar.com/user.svg" alt="" />
            </div>
            <div className="text-left">
              <div className="font-bold text-sm">{user.user_metadata.full_name}</div>
              <div className="text-xs text-slate-400">@{user.user_metadata.username}</div>
            </div>
          </div>
          <div>
            <BsThreeDots />
          </div>
        </button>
      </section>
    </div>
  );
};

export default LeftSidebar;
