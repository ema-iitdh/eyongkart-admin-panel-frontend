import PropTypes from 'prop-types'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function Specifications({ form }) {
  return (
    <div className="space-y-4 grid gap-4 sm:grid-cols-2">
      <FormField
        control={form.control}
        name="specifications.material"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Material</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Cotton, Silk, Wool" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specifications.weaveType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weave Type</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Plain, Twill, Satin" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specifications.craftTechnique"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Craft Technique</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Ikat, Block Print" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specifications.careInstructions"
        render={({ field }) => (
          <FormItem className="sm:col-span-2">
            <FormLabel>Care Instructions</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter care instructions"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specifications.fabricCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fabric Count</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 60x60" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specifications.borderType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Border Type</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Zari, Contrast" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specifications.borderWidth"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Border Width</FormLabel>
            <FormControl>
              <Input placeholder="e.g., 2 inches" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specifications.palluDetails"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pallu Details</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Contrast pallu with zari work" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specifications.threadCount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Thread Count</FormLabel>
            <FormControl>
              <Input type="number" placeholder="e.g., 120" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specifications.zariType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Zari Type</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Gold, Silver, Copper" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

Specifications.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
}

