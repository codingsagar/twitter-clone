"use client";

import { createBrowserClient } from "@supabase/ssr";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

import { useToast } from "./ui/use-toast";

import { useState } from "react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AuthModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { toast } = useToast();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign in</Button>
      </DialogTrigger>
      <DialogContent className="text-white">
        <DialogHeader>
          <DialogTitle className="mb-2 text-white">Sign in</DialogTitle>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setIsLoading(true);

              const { data, error } = await supabase
                .from("profiles")
                .select()
                .eq("username", username.trim());

              if (data && data.length > 0)
                toast({
                  description:
                    "Sorry 😞, Username not available ! Try some different username.",
                  style: { color: "blue", backgroundColor: "#333333" },
                });

              const { data: res, error: err } =
                await supabase.auth.signInWithOtp({
                  email: email.trim(),
                  options: {
                    data: {
                      username: username?.trim(),
                    },
                  },
                });
              if (res)
                toast({
                  description: "Email sent to " + email,
                  style: { color: "white", backgroundColor: "green" },
                });

              setIsLoading(false);
            }}
            className="flex flex-col gap-y-3"
          >
            <Input
              placeholder="Enter your email 📧"
              className="text-slate-400"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-red-500 text-xs">Enter username only if you are creating new account.</span>
            <Input
              placeholder="Enter your username 🤩"
              className="text-slate-400"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <DialogDescription>
              You will receive a magic link on your email.
            </DialogDescription>
            <Button
              disabled={
                isLoading || email.length === 0
              }
            >
              Submit
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
