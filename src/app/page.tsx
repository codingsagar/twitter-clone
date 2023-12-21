import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import LeftSidebar from "@/components/LeftSidebar";
import Main from "@/components/Main";
import RightSidebar from "@/components/RightSidebar";
import AuthModal from "@/components/AuthModal";


export const revalidate = 0;

const Home = async () => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data : {user}, error } = await supabase.auth.getUser();
  const errorCode = error;


  const { data, error:emailError } = await supabase
                .from("profiles")
                .select("*")
  console.log(data,emailError);
  
    
  return (
    <div className="w-full h-full flex justify-center items-center text-white">
      {errorCode ? (
        <div className="grid h-screen place-content-center">
          <AuthModal />
        </div>
      ) : (
        <div className="max-w-screen-lg w-full h-full flex">
          <LeftSidebar user={user}/>
          <Main />
          <RightSidebar />
        </div>
      )}
    </div>
  );
};

export default Home;
