import PropTypes from 'prop-types'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Categorization({ form }) {
    // todo implement api request to fetch categories, subcategories and shop
  const categories = [
    { id: '1', name: 'Sarees' },
    { id: '2', name: 'Dhotis' },
  ]

  const subcategories = [
    { id: '1', name: 'Silk Sarees' },
    { id: '2', name: 'Cotton Sarees' },
  ]

  const shops = [
    { id: '1', name: 'Handloom Haven' },
    { id: '2', name: 'Weaver\'s Delight' },
  ]

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Choose the main category for your product.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="subcategory"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subcategory</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a subcategory" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {subcategories.map((subcategory) => (
                  <SelectItem key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Choose a subcategory for your product (optional).
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="shop"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Shop</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a shop" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {shops.map((shop) => (
                  <SelectItem key={shop.id} value={shop.id}>
                    {shop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Choose the shop for this product.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

Categorization.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
}

