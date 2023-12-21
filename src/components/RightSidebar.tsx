import { HiMagnifyingGlass } from "react-icons/hi2";
import { AiOutlineSetting } from "react-icons/ai";

const RightSidebar = () => {
  return (
    <section className="basis-64 shrink-0 mr-2 hidden lg:block">
          <section className="ml-4 mt-4 sticky top-3 flex h-screen flex-col overflow-scroll space-y-4 rightside">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Twitter"
                className="rounded-full bg-neutral-800/80 px-8 py-2 focus:border-primary focus:border focus:outline-none peer"
              />
              <div className="absolute top-3 left-2 peer-focus:text-primary">
                <HiMagnifyingGlass />
              </div>
            </div>
            <div className="bg-neutral-800/80 rounded-lg text-lg flex flex-col">
              <div className="flex justify-between items-center border-b border-slate-600 px-3 py-4">
                <h1 className="font-bold text-white">What's happening</h1>
                <div className="text-primary cursor-pointer">
                  <AiOutlineSetting />
                </div>
              </div>
              <div className="">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="hover:bg-white/10 px-4 py-3 cursor-pointer transition duration-30000"
                  >
                    <div className="font-semibold text-base">
                      #trending {i + 1}
                    </div>
                    <div className="text-sm text-neutral-400">15.5k tweets</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-800/80 rounded-lg text-lg flex flex-col">
              <div className="flex justify-between items-center border-b border-slate-600 px-3 py-4">
                <h1 className="font-bold text-white">Who to follow</h1>
                <div className="text-primary cursor-pointer">
                  <AiOutlineSetting />
                </div>
              </div>
              <div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div className="w-full text-white py-2 font-medium hover:bg-white/10 transition duration-300 flex space-x-2 px-2 items-center justify-between">
                    <div className="flex space-x-3 items-center">
                      <div className="rounded-full h-10 w-10 bg-slate-400">
                        <img
                          src={`https://api.multiavatar.com/${i}.svg`}
                          alt=""
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-sm">Sagar Bhat</div>
                        <div className="text-xs text-slate-400">
                          @codingsagar
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-800 bg-white w-fit py-1 rounded-full text-sm font-bold px-2 hover:bg-white/80 transition duration-200">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
  )
}

export default RightSidebar