"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiLoaderAlt } from "react-icons/bi";
import customAxios from "@/lib/axiosInterceptor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { API_ENDPOINT_FOR_JOB } from "@/lib/constants";

const formSchema = z.object({
  jobTitle: z.string().min(2, { message: "Please enter a valid job title" }),
  jobDescription: z
    .string()
    .min(2, { message: "Please enter a valid job description" }),
  company: z.string().optional(),
  location: z.string().optional(),
  skillIDs: z.array(z.string()),
});

function AddJobForm() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      company: "",
      location: "",
      skillIDs: [],
    },
  });

  async function onSubmit(addJobFormData: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      setError(null);

      const response = await customAxios.post(
        `${API_ENDPOINT_FOR_JOB}`,
        addJobFormData
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
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="enter job title" {...field} />
                </FormControl>
                <FormDescription>Enter job title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl>
                  <Input placeholder="enter job description" {...field} />
                </FormControl>
                <FormDescription>Enter job description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(opional) enter company name"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter company name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="(optional) enter location" {...field} />
                </FormControl>
                <FormDescription>Enter location</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skillIDs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill IDs</FormLabel>
                <FormControl>
                  <Input placeholder="select skills" {...field} />
                </FormControl>
                <FormDescription>Enter skill IDs</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit">
            {loading ? (
              <>
                <BiLoaderAlt className="animate-spin" /> Creating Job...
              </>
            ) : (
              "Create Job"
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

export default AddJobForm;
