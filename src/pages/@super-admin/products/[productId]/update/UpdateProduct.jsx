import * as React from 'react';
import { useParams } from 'react-router-dom';
import {
  useProductById,
  useUpdateProduct,
} from '@/features/products/hooks/useProducts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader } from '@/components/ui/loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { CloudinaryConfig } from '../../../../../../Cloudinary';
import { useDropzone } from 'react-dropzone';
import { PlusCircle, Trash2, Upload } from 'lucide-react';
import { useGetAllCategories } from '@/features/categories/hooks/useCategory';
import { useGetSubcategoryByCategoryId } from '@/features/subcategories/hooks/useSubcategory';
import { useGetAllShops } from '@/features/shop/hooks/useShop';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  gender: z.enum(['Male', 'Female', 'Unisex']),
  ageGroup: z.enum(['Kids', 'Adults', 'All']),
  status: z.enum(['draft', 'published']),
  isVisible: z.boolean(),
  baseImage: z.object({
    url: z.string(),
    altText: z.string(),
  }),
  category: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  shop: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  variants: z.array(
    z.object({
      color: z.object({
        name: z.string(),
        code: z.string(),
      }),
      pattern: z.object({
        name: z.string(),
        description: z.string(),
      }),
      size: z.object({
        measurements: z.object({
          length: z.object({
            value: z.number(),
            unit: z.string(),
          }),
          width: z.object({
            value: z.number(),
            unit: z.string(),
          }),
        }),
        value: z.string(),
      }),
      price: z.object({
        basePrice: z.number(),
        discount: z.number(),
        markup: z.number(),
        markedUpPrice: z.number(),
        discountedPrice: z.number(),
      }),
      stock: z.object({
        quantity: z.number(),
        status: z.string(),
      }),
      images: z.array(
        z.object({
          url: z.string(),
          altText: z.string(),
          isDefault: z.boolean(),
        })
      ),
    })
  ),
});

export function SelectCategory({ form, name }) {
  const { data: categories, isLoading } = useGetAllCategories();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Select
              key={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select category' />
                {isLoading && <Loader />}
              </SelectTrigger>
              <SelectContent>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectSubCategory({ categoryId, form, name }) {
  const { data: subCategories, isLoading } =
    useGetSubcategoryByCategoryId(categoryId);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Sub Category</FormLabel>
          <FormControl>
            <Select
              key={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select sub category' />
                {isLoading && <Loader />}
              </SelectTrigger>
              <SelectContent>
                {subCategories?.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function SelectShop({ form, name }) {
  const { data: shops, isLoading } = useGetAllShops();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Shop</FormLabel>
          <FormControl>
            <Select
              key={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select shop' />
                {isLoading && <Loader />}
              </SelectTrigger>
              <SelectContent>
                {shops?.map((shop) => (
                  <SelectItem key={shop.id} value={shop.id}>
                    {shop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default function UpdateProduct() {
  const { productId } = useParams();
  const { data: productData, isLoading } = useProductById(productId);
  const updateProductMutation = useUpdateProduct();
  const [imageFiles, setImageFiles] = React.useState({});
  const [previewImages, setPreviewImages] = React.useState({});

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: productData?.name,
      description: productData?.description,
      gender: productData?.gender,
      ageGroup: productData?.ageGroup,
      status: productData?.status,
      specifications: {
        material: productData?.specifications?.material,
      },
      isVisible: productData?.isVisible,
      baseImage: productData?.baseImage,
      variants: productData?.variants || [],
      category: productData?.category,
      subCategory: productData?.subCategory,
      shop: productData?.shop,
    },
  });

  React.useEffect(() => {
    if (productData) {
      form.reset({
        name: productData?.name,
        description: productData?.description,
        gender: productData?.gender,
        ageGroup: productData?.ageGroup,
        status: productData?.status,
        specifications: {
          material: productData?.specifications?.material,
        },
        isVisible: productData?.isVisible,
        baseImage: productData?.baseImage,
        variants: productData?.variants || [],
        category: productData?.category,
        subCategory: productData?.subCategory,
        shop: productData?.shop,
      });
    }
  }, [productData, form]);

  const onSubmit = async (data) => {
    try {
      // Handle base image upload
      if (imageFiles.baseImage) {
        const formData = new FormData();
        formData.append('file', imageFiles.baseImage);
        formData.append('upload_preset', CloudinaryConfig.UPLOAD_PRESET);

        const response = await fetch(
          `${CloudinaryConfig.CLOUDINARY_URL}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );
        const result = await response.json();
        data.baseImage.url = result.secure_url;
      }

      // Handle variant images upload
      for (const [key, file] of Object.entries(imageFiles)) {
        if (key !== 'baseImage') {
          const [_, variantIndex, __, imageIndex] = key.split('.');
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', CloudinaryConfig.UPLOAD_PRESET);

          const response = await fetch(
            `${CloudinaryConfig.CLOUDINARY_URL}/image/upload`,
            {
              method: 'POST',
              body: formData,
            }
          );
          const result = await response.json();
          data.variants[variantIndex].images[imageIndex].url =
            result.secure_url;
        }
      }

      await updateProductMutation.mutateAsync({
        productId,
        ...data,
      });
      toast({
        title: 'Success',
        description: 'Product updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update product',
        variant: 'destructive',
      });
    }
  };

  const addVariant = () => {
    const variants = form.getValues('variants') || [];
    form.setValue('variants', [
      ...variants,
      {
        color: { name: '', code: '' },
        pattern: { name: '', description: '' },
        size: {
          measurements: {
            length: { value: 0, unit: 'cm' },
            width: { value: 0, unit: 'cm' },
          },
          value: '',
        },
        price: {
          basePrice: 0,
          discount: 0,
          markup: 0,
          markedUpPrice: 0,
          discountedPrice: 0,
        },
        stock: { quantity: 0, status: 'in_stock' },
        images: [],
      },
    ]);
  };

  const removeVariant = (index) => {
    const variants = form.getValues('variants');
    form.setValue(
      'variants',
      variants.filter((_, i) => i !== index)
    );
  };

  const addVariantImage = (variantIndex) => {
    const variants = form.getValues('variants');
    const variant = variants[variantIndex];
    form.setValue(`variants.${variantIndex}.images`, [
      ...variant.images,
      { url: '', altText: '', isDefault: false },
    ]);
  };

  const removeVariantImage = (variantIndex, imageIndex) => {
    const variants = form.getValues('variants');
    const variant = variants[variantIndex];
    form.setValue(
      `variants.${variantIndex}.images`,
      variant.images.filter((_, i) => i !== imageIndex)
    );
  };

  const handleImageAttach = (file, path) => {
    setImageFiles((prev) => ({
      ...prev,
      [path]: file,
    }));

    // Create local preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewImages((prev) => ({
      ...prev,
      [path]: previewUrl,
    }));
  };

  const ImageDropzone = ({ onDrop, value, path }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      },
      onDrop: (acceptedFiles) => {
        if (acceptedFiles?.[0]) {
          onDrop(acceptedFiles[0]);
        }
      },
    });

    // Use preview URL if available, otherwise use original value
    const displayUrl = previewImages[path] || value;

    return (
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        {displayUrl ? (
          <img
            key={displayUrl}
            src={
              previewImages?.[path] ||
              `${CloudinaryConfig.CLOUDINARY_URL}/${displayUrl}`
            }
            alt='Preview'
            className='w-full h-48 object-cover rounded mb-2'
          />
        ) : (
          <div className='flex flex-col items-center justify-center py-4'>
            <Upload className='w-8 h-8 mb-2 text-gray-500' />
            <p className='text-sm text-gray-500'>
              {isDragActive
                ? 'Drop the file here'
                : 'Drag & drop or click to select'}
            </p>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) return <Loader />;

  return (
    <div className='container mx-auto py-6 space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Update Product</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className='grid gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter product name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem className='md:col-span-2'>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Enter product description'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select gender' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Male'>Male</SelectItem>
                        <SelectItem value='Female'>Female</SelectItem>
                        <SelectItem value='Unisex'>Unisex</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SelectCategory form={form} name='category._id' />
              <SelectSubCategory
                categoryId={form.getValues('category._id')}
                form={form}
                name='subCategory._id'
              />
              <SelectShop form={form} name='shop._id' />

              <FormField
                control={form.control}
                name='ageGroup'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Group</FormLabel>
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select age group' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Kids'>Kids</SelectItem>
                        <SelectItem value='Adults'>Adults</SelectItem>
                        <SelectItem value='All'>All</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='specifications.material'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter material' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='draft'>Draft</SelectItem>
                        <SelectItem value='published'>Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Base Image Fields */}
              <FormField
                control={form.control}
                name='baseImage.url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Image</FormLabel>
                    <FormControl>
                      <ImageDropzone
                        onDrop={(file) => handleImageAttach(file, 'baseImage')}
                        value={field.value}
                        path='baseImage'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='baseImage.altText'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Image Alt Text</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter alt text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Variants Card */}
          <Card>
            <CardHeader className='flex flex-row items-center justify-between'>
              <CardTitle>Variants</CardTitle>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={addVariant}
              >
                <PlusCircle className='w-4 h-4 mr-2' />
                Add Variant
              </Button>
            </CardHeader>
            <CardContent>
              {form.watch('variants')?.map((variant, variantIndex) => (
                <div
                  key={`variant-${variant?.name}`}
                  className='border p-4 mb-4 rounded'
                >
                  <div className='flex justify-between items-center mb-4'>
                    <h3 className='text-lg font-semibold'>
                      Variant {variantIndex + 1}
                    </h3>
                    {/* Allow only when variant is not the first one */}
                    {variantIndex > 0 && (
                      <Button
                        type='button'
                        variant='destructive'
                        size='sm'
                        onClick={() => removeVariant(variantIndex)}
                      >
                        <Trash2 className='w-4 h-4 mr-2' />
                        Remove
                      </Button>
                    )}
                  </div>

                  {/* Color */}
                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <FormField
                      control={form.control}
                      name={`variants.${variantIndex}.color.name`}
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
                      name={`variants.${variantIndex}.color.code`}
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
                  </div>

                  {/* Size */}
                  <div className='mb-4'>
                    <FormField
                      control={form.control}
                      name={`variants.${variantIndex}.size.value`}
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
                  </div>

                  {/* Price */}
                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <FormField
                      control={form.control}
                      name={`variants.${variantIndex}.price.basePrice`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Price</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseFloat(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`variants.${variantIndex}.price.discount`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Discount</FormLabel>
                          <FormControl>
                            <Input
                              type='number'
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  Number.parseFloat(e.target.value)
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Stock */}
                  <div className='grid grid-cols-2 gap-4 mb-4'>
                    <FormField
                      control={form.control}
                      name={`variants.${variantIndex}.stock.quantity`}
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
                      name={`variants.${variantIndex}.stock.status`}
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
                              <SelectItem value='out_of_stock'>
                                Out of Stock
                              </SelectItem>
                              <SelectItem value='low_stock'>
                                Low Stock
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Variant Images */}
                  <div className='space-y-4'>
                    <div className='flex justify-between items-center'>
                      <h4 className='font-medium'>Variant Images</h4>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={() => addVariantImage(variantIndex)}
                      >
                        <PlusCircle className='w-4 h-4 mr-2' />
                        Add Image
                      </Button>
                    </div>
                    {variant.images?.map((image, imageIndex) => (
                      <div key={`image-${image?.url}`} className='space-y-4'>
                        <div className='grid grid-cols-2 gap-4'>
                          <FormField
                            control={form.control}
                            name={`variants.${variantIndex}.images.${imageIndex}.url`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                  <ImageDropzone
                                    onDrop={(file) =>
                                      handleImageAttach(
                                        file,
                                        `variants.${variantIndex}.images.${imageIndex}`
                                      )
                                    }
                                    value={field.value}
                                    path={`variants.${variantIndex}.images.${imageIndex}`}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className='space-y-4'>
                            <FormField
                              control={form.control}
                              name={`variants.${variantIndex}.images.${imageIndex}.altText`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Alt Text</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button
                              type='button'
                              variant='destructive'
                              size='sm'
                              onClick={() =>
                                removeVariantImage(variantIndex, imageIndex)
                              }
                              className='w-full'
                            >
                              <Trash2 className='w-4 h-4 mr-2' />
                              Remove Image
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className='flex justify-end gap-4'>
            <Button
              type='submit'
              disabled={updateProductMutation.isLoading}
              className='w-full md:w-auto'
            >
              {updateProductMutation.isLoading ? (
                <>
                  <Loader className='mr-2 h-4 w-4' />
                  Updating...
                </>
              ) : (
                'Update Product'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
