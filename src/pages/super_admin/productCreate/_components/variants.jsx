import PropTypes from 'prop-types';
import { useFieldArray } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImageUpload } from './image-upload';

export function Variants({ form, variantImages, setVariantImages }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'variants',
  });

  return (
    <div className='space-y-6'>
      {/* info */}
      <div className='space-y-4 p-4 border rounded bg-blue-50'>
        <h3 className='text-lg font-semibold text-blue-900'>
          Product Information
        </h3>
        <p className='text-blue-800'>
          You need to create at least one variant for your product. Each variant
          can have different colors, patterns, and sizes.
        </p>
        <p className='text-blue-700'>
          Please click on the <span className='font-medium'>Add Variant</span>{' '}
          button below to create your product variants.
        </p>
      </div>

      {/* Required error from form */}
      {form.formState.errors.variants && (
        <p className='text-red-500'>{form.formState.errors.variants.message}</p>
      )}

      {/* variants */}
      {fields.map((field, index) => (
        <div key={field.id} className='space-y-4 p-4 border rounded'>
          <h3 className='text-lg font-semibold'>Variant {index + 1}</h3>

          <FormField
            control={form.control}
            name={`variants.${index}.color.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.color.code`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.pattern.name`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pattern Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.size.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.size.measurements.length.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.size.measurements.length.unit`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Length Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select unit' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='cm'>cm</SelectItem>
                    <SelectItem value='inches'>inches</SelectItem>
                    <SelectItem value='meters'>meters</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.size.measurements.width.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.size.measurements.width.unit`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Width Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select unit' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='cm'>cm</SelectItem>
                    <SelectItem value='inches'>inches</SelectItem>
                    <SelectItem value='meters'>meters</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.price.basePrice`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Base Price</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.price.discount`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount (%)</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseFloat(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.stock.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.stock.status`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='in_stock'>In Stock</SelectItem>
                    <SelectItem value='out_of_stock'>Out of Stock</SelectItem>
                    <SelectItem value='low_stock'>Low Stock</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.isActive`}
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Active</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variants.${index}.showInCarousel`}
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Show in Carousel</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <ImageUpload
            title={`Variant ${index + 1} Images`}
            description='Upload images for this variant (max 5)'
            images={variantImages[index] || []} // Use existing images or an empty array
            setImages={setMultipleImages(index, setVariantImages)}
            multiple={true}
            maxFiles={5}
          />

          <Button
            type='button'
            variant='destructive'
            onClick={() => remove(index)}
          >
            Remove Variant
          </Button>
        </div>
      ))}
      <Button
        type='button'
        onClick={() => {
          // Initialize the image array for the new variant
          const newIndex = fields.length;
          setVariantImages((prev) => ({
            ...prev,
            [newIndex]: [],
          }));
          // Add the new variant
          append({
            color: { name: '', code: '' },
            pattern: { name: '', description: '' },
            size: {
              value: '',
              measurements: {
                length: { value: 0, unit: 'cm' },
                width: { value: 0, unit: 'cm' },
              },
            },
            price: { basePrice: 0, discount: 0 },
            stock: { quantity: 0, status: 'in_stock' },
            isActive: true,
            showInCarousel: false,
          });
        }}
      >
        Add Variant
      </Button>
    </div>
  );
}

Variants.propTypes = {
  form: PropTypes.shape({
    control: PropTypes.object.isRequired,
  }).isRequired,
  variantImages: PropTypes.object.isRequired,
  setVariantImages: PropTypes.func.isRequired,
};

function setMultipleImages(index, setVariantImages) {
  return (newImages) => {
    setVariantImages((prev) => {
      // Handle the case where newImages is a single file or an array
      const imagesToAdd = Array.isArray(newImages) ? newImages : [newImages];

      return {
        ...prev,
        [index]: Array.isArray(prev[index])
          ? [...prev[index], ...imagesToAdd].slice(0, 5) // Limit to 5 images
          : imagesToAdd.slice(0, 5),
      };
    });
  };
}
