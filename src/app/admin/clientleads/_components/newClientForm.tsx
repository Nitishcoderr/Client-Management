"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone_number: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  service_type: z.enum(["new_project", "maintenance"], { required_error: "Select a service type." }),
  project_description: z.string().optional(),
  website_url: z.string().url().optional(),
  current_issues: z.string().optional(),
  maintenance_scope: z.string().optional(),
  frequency_of_updates: z.enum(["weekly", "monthly", "as_needed"]).optional(),
  support_level: z.enum(["on_call", "scheduled", "emergency"]).optional(),
  maintenance_budget: z.string().optional(),
  project_name: z.string().min(2, { message: "Project name must be at least 2 characters long." }),
  target_audience: z.string().optional(),
  core_features: z.array(z.string()).optional(),
  reference_links: z.string().optional(),
  launch_date: z.date().optional(),
  technology: z.enum(["wordpress", "react", "nextjs", "android", "ios", "shopify"]).optional(),

});


const NewClientForm = () => {
    const [serviceType, setServiceType] = useState<"new_project" | "maintenance">("new_project");

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        phone_number: "",
        service_type: "new_project",
        project_description: "",
        website_url: "",
        current_issues: "",
        maintenance_scope: "",
        frequency_of_updates: "weekly",
        support_level: "on_call",
        maintenance_budget: "",
        project_name: "",
        target_audience: "",
        core_features: [],
        reference_links: "",
        launch_date: undefined,
        technology: "wordpress",
      },
      
    });
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
    }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Service Type */}
        <FormField
          control={form.control}
          name="service_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Type</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setServiceType(value as "new_project" | "maintenance");
                }}
                defaultValue={field.value}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new_project">New Project</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

{serviceType === "new_project" && (
  <>
    {/* Project Name */}
    <FormField
      control={form.control}
      name="project_name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Project Name</FormLabel>
          <FormControl>
            <Input placeholder="Enter project name" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Technology */}
    <FormField
      control={form.control}
      name="technology"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Technology</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select technology" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wordpress">WordPress</SelectItem>
              <SelectItem value="react">React</SelectItem>
              <SelectItem value="nextjs">Next.js</SelectItem>
              <SelectItem value="android">Android</SelectItem>
              <SelectItem value="ios">iOS</SelectItem>
              <SelectItem value="shopify">Shopify</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Target Audience */}
    <FormField
      control={form.control}
      name="target_audience"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Target Audience</FormLabel>
          <FormControl>
            <Textarea placeholder="Describe the target audience" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Core Features */}
    <FormField
      control={form.control}
      name="core_features"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Core Features</FormLabel>
          <FormControl>
            <Textarea placeholder="List required core features" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Reference Links */}
    <FormField
      control={form.control}
      name="reference_links"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Reference Websites/Links</FormLabel>
          <FormControl>
            <Textarea placeholder="Provide reference websites or links" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Launch Date */}
    <FormField
  control={form.control}
  name="launch_date"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Launch Date</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                format(field.value, "PPP") // Format the date using date-fns
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
                date < new Date()
              }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )}
/>

    
  </>
)}

        {/* Conditional Fields for Maintenance */}
        {serviceType === "maintenance" && (
          <>
            {/* Website URL */}
            <FormField
              control={form.control}
              name="website_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="Enter website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Current Issues */}
            <FormField
              control={form.control}
              name="current_issues"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Issues</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe any current issues" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Maintenance Scope */}
            <FormField
              control={form.control}
              name="maintenance_scope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scope of Maintenance</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., Bug Fixes, Security Updates" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Frequency of Updates */}
            <FormField
              control={form.control}
              name="frequency_of_updates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency of Updates</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="as_needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Support Level */}
            <FormField
              control={form.control}
              name="support_level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Support Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select support level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on_call">On-call Support</SelectItem>
                      <SelectItem value="scheduled">Scheduled Updates</SelectItem>
                      <SelectItem value="emergency">Emergency Only</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Maintenance Budget */}
            <FormField
              control={form.control}
              name="maintenance_budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Monthly Budget</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter budget range" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}



        <Button className="w-full" type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default NewClientForm
