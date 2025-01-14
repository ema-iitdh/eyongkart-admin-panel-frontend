import PropTypes from "prop-types";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export function StatusVisibility({ form }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="isActive"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                Active Status <span className="text-red-500">*</span>
              </FormLabel>
              <FormDescription>Enable or disable this category</FormDescription>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="displayOrder"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Display Order</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter display order"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Order in which this category will be displayed
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="slug"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              URL Slug<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter URL slug" {...field} />
            </FormControl>
            <FormDescription>
              URL-friendly version of the category name
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

StatusVisibility.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
};
