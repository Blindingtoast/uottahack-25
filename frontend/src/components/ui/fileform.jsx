import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

/* This is a form for submitting files at competition, like XML, JSON probably */
function FileForm({ ...props }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "/api/upload";
    const data = new FormData(e.target);

    // This is how you can send extra information in the POST
    data.append("time", (new Date()).toString());

    fetch(url, {
      method: "POST",
      body: data,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Couldn't submit the form");
      }
      return response.json()
    })
    .then(responsejson => {
      console.log(`response for from submission: ${responsejson.status}`);
      let date = new Date(Math.floor((Number(responsejson.result["processing-done"]) * 1000)));
      console.log(`processing done at: ${date}`);
    });
  };

  const form = useForm({
    defaultValues: {
      "extra-input": "",
      "upload-file": "",
    }
  })
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} encType="multipart/form-data" {...props}>
        <FormField
        control={form.control}
        name="upload-file"
        render={({ field }) => (
          <FormItem>
            <FormLabel>File Upload</FormLabel>
            <FormControl>
              <Input className="bg-background" type="file" multiple {...field} />
            </FormControl>
            <FormDescription className="pb-3">A file to upload</FormDescription>
            <FormMessage />
          </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="extra-input"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Extra Input</FormLabel>
            <FormControl>
              <Input className="bg-background" type="text" {...field} />
            </FormControl>
            <FormDescription className="pb-3">Some extra input</FormDescription>
            <FormMessage /> 
          </FormItem>
        )}
        />
        <Button className="w-full" type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export { FileForm };
