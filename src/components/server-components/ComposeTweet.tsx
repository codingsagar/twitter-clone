import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import PostTweetForm from "../client-components/PostTweetForm";
import { revalidatePath } from "next/cache";

const ComposeTweet = () => {
  async function submitTweet(formData: FormData) {
    "use server";

    const tweet = formData.get("tweet");

    if (!tweet) return { error: "⚠️ Something wrong with the tweet !" };

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

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) return { error: "👤 User not logged in !" };

    const { data: postedTweetData, error: postedTweetError } = await supabase
      .from("tweets")
      .insert([{ id: randomUUID(), text: tweet, user_id: userData.user.id }])
      .select();
    
    revalidatePath("/");
    return {postedTweetData,postedTweetError};
  }

  return (
    <div className="px-5 border-t border-slate-700 py-2">
      <PostTweetForm submitTweet={submitTweet} />
    </div>
  );
};

export default ComposeTweet;
