import { BsDot, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { LiaRetweetSolid } from "react-icons/lia";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosStats } from "react-icons/io";
import { FiShare } from "react-icons/fi";
import ComposeTweet from "./server-components/ComposeTweet";
import { getTweets } from "@/lib/supabase/getTweets";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Main = async () => {
  const data = await getTweets();

  return (
    <main className="shrink grow max-w-[600px] border-x border-slate-700 h-full min-h-screen">
      <h1 className="text-xl font-bold p-5 backdrop-blur sticky top-0 bg-black/10">
        Home
      </h1>
      {/* compose tweet using server action */}
      <ComposeTweet />
      <div className="flex flex-col">
        {data?.data?.map((tweet, i) => (
          <div key={i} className="flex border-t border-slate-700 py-5">
            <div className="px-5 flex space-x-2 w-full">
              <div>
                <div className="w-10 h-10 bg-slate-400 rounded-full">
                  <img
                    src={`https://api.multiavatar.com/default${i}.svg`}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex items-center justify-between">
                  <div className="flex text-sm space-x-1 items-center">
                    <div className="font-bold">
                      {tweet.profiles.full_name ?? ""}
                    </div>
                    <div className="text-slate-400 text-xs">
                      @{tweet.profiles.username}
                    </div>
                    <div>
                      <BsDot />
                    </div>
                    <div>{dayjs(tweet.created_at).fromNow()}</div>
                  </div>
                  <div className="cursor-pointer hover:bg-white/20 rounded-full p-1">
                    <BsThreeDots />
                  </div>
                </div>
                <div className="text-sm my-2">{tweet.text}</div>
                <div className="bg-slate-300 h-56 lg:h-72 w-full rounded-md">
                  <img
                    src={`https://picsum.photos/seed/${Math.random()}/224/224`}
                    alt=""
                    className="rounded-md h-56 lg:h-72 w-full"
                  />
                </div>
                <div className="flex items-center justify-between mt-4 text-sm">
                  <div className="flex items-center rounded-full hover:bg-white/20 cursor-pointer p-1">
                    <FaRegComment /> <pre> 2</pre>
                  </div>
                  <div className="flex items-center rounded-full hover:bg-white/20 cursor-pointer p-1">
                    <LiaRetweetSolid /> <pre> 10</pre>
                  </div>
                  <div className="flex items-center rounded-full hover:bg-white/20 cursor-pointer p-1">
                    <AiOutlineHeart /> <pre> 120</pre>
                  </div>
                  <div className="flex items-center rounded-full hover:bg-white/20 cursor-pointer p-1">
                    <IoIosStats /> <pre> 15.5k</pre>
                  </div>
                  <div className="flex items-center rounded-full hover:bg-white/20 cursor-pointer p-1">
                    <FiShare /> <pre> 20</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
