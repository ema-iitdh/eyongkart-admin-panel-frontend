import PropTypes from 'prop-types';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetAllCategories } from '@/features/categories/hooks/useCategory';
import { useGetSubcategoryByCategoryId } from '@/features/subcategories/hooks/useSubcategory';
import { useEffect, useState } from 'react';
import {
  useGetAllShops,
  useShopBySellerId,
} from '@/features/shop/hooks/useShop';
import useAuthenticationStore from '@/store/useAuthenticationStore';

export function EditCategorization({ form }) {
  const { user } = useAuthenticationStore();
  const sellerId = user?.id;
  const isSuperAdmin = user?.role === 'Super_Admin';
  const { data: categories = [] } = useGetAllCategories();

  // Initialize selectedCategory with form's initial value
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const initialCategory = form.getValues().category;
    return initialCategory || '';
  });

  const {
    data: subcategories = [],
    isLoading,
    refetch: fetchSubcategories,
  } = useGetSubcategoryByCategoryId(selectedCategory);

  // Fetch subcategories when component mounts if there's an initial category
  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories();
    }
  }, [selectedCategory, fetchSubcategories]);

  // Initialize subcategory when subcategories are loaded
  useEffect(() => {
    const currentSubcategory = form.getValues().subcategory;
    if (subcategories.length > 0 && currentSubcategory) {
      const subcategoryExists = subcategories.some(sub => sub.id === currentSubcategory);
      if (subcategoryExists) {
        form.setValue('subcategory', currentSubcategory);
      }
    }
  }, [subcategories, form]);

  const { data: shops = [] } = useGetAllShops();
  const { data: shopOfSeller = [] } = useShopBySellerId(sellerId);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Category<span className="text-red-500">*</span>
            </FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedCategory(value);
                // Clear subcategory when category changes
                form.setValue('subcategory', '');
              }}
              value={field.value || ''}
            >
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
            <Select
              onValueChange={field.onChange}
              value={field.value || ''}
              disabled={isLoading || !selectedCategory}
            >
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
            <FormLabel>
              Shop<span className="text-red-500">*</span>
            </FormLabel>
            {isSuperAdmin ? (
              <Select onValueChange={field.onChange} value={field.value || ''}>
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
            ) : (
              <Select onValueChange={field.onChange} value={field.value || ''}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a shop" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {shopOfSeller.map((shop) => (
                    <SelectItem key={shop.id} value={shop.id}>
                      {shop.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <FormDescription>
              Choose the shop for this product.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

EditCategorization.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
    getValues: PropTypes.func.isRequired,
  }).isRequired,
};

export default EditCategorization;