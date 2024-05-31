"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BiLoaderAlt } from "react-icons/bi";
import axios from "axios";
import { useRouter } from "next/navigation";
import { API_ENDPOINT_FOR_USER } from "@/lib/constants";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Please enter a password.",
  }),
});

function LoginForm() {
  const router = useRouter();
  axios.defaults.withCredentials = true;

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(loginFormData: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${API_ENDPOINT_FOR_USER}/login`,
        loginFormData
      );

      if (response.status === 200) {
        router.push("/ai-interview");
        console.log(response.data);
      }
    } catch (error: any) {
      console.log("error while logging in = ", error);
      setLoading(false);
      if (error.response.data.message === "invalid email or password") {
        setError("Invalid email or password");
      } else setError("Something went wrong");
    }
  }

  return (
    <div className={`max-w-96 mx-auto mt-20 border rounded-lg shadow-lg p-8`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="e-mail" {...field} />
                </FormControl>
                <FormDescription>Enter your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>Enter your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <BiLoaderAlt className="animate-spin" /> Loging In...
              </>
            ) : (
              "Log In"
            )}
          </Button>
          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
