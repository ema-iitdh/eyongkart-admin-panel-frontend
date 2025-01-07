import PropTypes from 'prop-types'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function TargetAudience({ form }) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Unisex" id="unisex" />
                  <Label htmlFor="unisex">Unisex</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Select the target gender for this product.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="ageGroup"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Age Group</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Adult" id="adult" />
                  <Label htmlFor="adult">Adult</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Kids" id="kids" />
                  <Label htmlFor="kids">Kids</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="All" id="all" />
                  <Label htmlFor="all">All</Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormDescription>
              Select the target age group for this product.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

TargetAudience.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
}

