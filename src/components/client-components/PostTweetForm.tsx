"use client";
import { useToast } from "../ui/use-toast";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="text-white bg-primary w-fit py-2 rounded-full px-5 self-end"
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Posting 
        </>
      ) : (
        "Tweet"
      )}
    </Button>
  );
};

const PostTweetForm = (props: any) => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement | null>(null);

  async function clientSubmitTweet(formData: FormData) {
    const result = await props.submitTweet(formData);
    formRef.current?.reset();
    if (result?.error || result?.postedTweetError) {
      toast({
        description: result?.error || result.postedTweetError,
        variant: "destructive",
        style: { color: "white" },
      });
    }
    else {
        toast({
            description: "Tweet Posted Successfully 🚀🥳",
            style:{color:"white", backgroundColor:"#50c878"}
          });
    }
  }

  return (
    <form
      className="flex flex-col space-y-4 w-full my-2"
      ref={formRef}
      action={clientSubmitTweet}
    >
      <div className="flex space-x-4 w-full">
        <div className="h-10 w-10 rounded-full bg-slate-400 flex-none">
          <img src="https://api.multiavatar.com/user.svg" alt="" />
        </div>
        <textarea
          placeholder="What's happening?"
          name="tweet"
          className="w-full h-24 bg-transparent active:outline-none focus:outline-none resize-none text-lg"
          maxLength={250}
        ></textarea>
      </div>
      <SubmitButton />
    </form>
  );
};

export default PostTweetForm;
