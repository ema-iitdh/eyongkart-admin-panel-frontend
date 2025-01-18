import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { FormNavigation } from '../productCreate/_components/form-navigation'
import { BasicDetails } from '../productCreate/_components/basic-details'
import { Categorization } from '../productCreate/_components/categorization'
import { Specifications } from '../productCreate/_components/specifications'
import { TargetAudience } from '../productCreate/_components/target-audience'
import { StatusVisibility } from '../productCreate/_components/status-visibility'
import { SEO } from '../productCreate/_components/seo'
import { ImageUpload } from '../productCreate/_components/image-upload'
import { Variants } from '../productCreate/_components/variants'

import { Loader } from '@/components/common/loader'
import { useProductById, useUpdateProduct } from '@/features/products/hooks/useProducts'
import { formSchema } from '@/constants'
import { ROUTES } from '@/constants/routes'

export function ProductUpdate() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState('basic')
  const [baseImage, setBaseImage] = useState(null)
  const [variantImages, setVariantImages] = useState({})

  const { data: product, isLoading, error } = useProductById(productId)
  const { mutate: updateProduct } = useUpdateProduct()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      shortDescription: '',
      category: '',
      subcategory: '',
      shop: '',
      specifications: {
        material: '',
        weaveType: '',
        craftTechnique: '',
        careInstructions: '',
        fabricCount: '',
        borderType: '',
        borderWidth: '',
        palluDetails: '',
        threadCount: 0,
        zariType: '',
      },
      gender: 'Unisex',
      ageGroup: 'Adult',
      status: 'published',
      isVisible: true,
      metaTitle: '',
      metaDescription: '',
      keywords: [],
      variants: [],
    },
  })

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription,
        category: product.category._id,
        subcategory: product.subcategory._id,
        shop: product.shop._id,
        specifications: product.specifications,
        gender: product.gender,
        ageGroup: product.ageGroup,
        status: product.status,
        isVisible: product.isVisible,
        metaTitle: product.metaTitle,
        metaDescription: product.metaDescription,
        keywords: product.keywords,
        variants: product.variants.map(variant => ({
          color: variant.color,
          pattern: variant.pattern,
          size: variant.size,
          price: variant.price,
          stock: variant.stock,
          isActive: variant.isActive,
          showInCarousel: variant.showInCarousel,
          certifications: variant.certifications,
          geographicIndication: variant.geographicIndication,
        })),
      })
      setBaseImage(product.baseImage)
      setVariantImages(product.variants.map(variant => variant.images))
    }
  }, [product, form])

  async function onSubmit(values) {
    try {
      const formData = new FormData()
      
      // Append all form fields
      Object.keys(values).forEach(key => {
        if (key !== 'variants' && key !== 'specifications') {
          formData.append(key, values[key])
        }
      })

      // Append specifications
      formData.append('specifications', JSON.stringify(values.specifications))

      // Append base image
      if (baseImage && baseImage instanceof File) {
        formData.append('baseImage', baseImage)
      }

      // Append variants as JSON string
      const variantsWithImages = values.variants.map((variant, index) => ({
        ...variant,
        images: variantImages[index] || [],
      }))
      formData.append('variants', JSON.stringify(variantsWithImages))

      // Append variant images
      variantImages.forEach((variantImageSet, variantIndex) => {
        variantImageSet.forEach((image, imageIndex) => {
          if (image instanceof File) {
            formData.append(
              `variant_${Number.parseInt(variantIndex)+1}`,
              image
            );
          }
        })
      })

      updateProduct({ productId, formData }, 
        {
            onSuccess: () => {
                toast({
                    title: "Product updated",
                    description: "Your product has been successfully updated.",
                  });
                  navigate(ROUTES.PRODUCT.LIST)
            },
            onError: (error) => {
              console.error('Product creation error:', error);
              toast({
                title: "Error",
                description: error.response?.data?.message || "Failed to create product",
                variant: "destructive",
              });
            },
          }
      )
    } catch (error) {
      console.error('Failed to update product:', error)
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const steps = [
    { id: 'basic', component: <BasicDetails form={form} /> },
    { id: 'categorization', component: <Categorization form={form} /> },
    { id: 'specifications', component: <Specifications form={form} /> },
    { id: 'audience', component: <TargetAudience form={form} /> },
    { id: 'status', component: <StatusVisibility form={form} /> },
    { id: 'seo', component: <SEO form={form} /> },
    { id: 'baseImage', component: <ImageUpload 
        title="Base Image" 
        description="Upload the main image for your product" 
        images={baseImage} 
        setImages={setBaseImage} 
        multiple={false}
      /> 
    },
    { id: 'variants', component: <Variants form={form} variantImages={variantImages} setVariantImages={
      setVariantImages
    //   (newImages, key) => {
    //   setVariantImages(prev => {
    //     return {
    //       ...prev,
    //       [key]: newImages,
    //     }
    //   })
    // }
    }/> },
  ]

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)
  const isLastStep = currentStepIndex === steps.length - 1
  const isFirstStep = currentStepIndex === 0

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(steps[currentStepIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(steps[currentStepIndex - 1].id)
    }
  }

  if (isLoading) return <Loader />
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Update Product</h1>
      <FormNavigation currentStep={currentStep} onStepChange={setCurrentStep} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {steps.find(step => step.id === currentStep)?.component}
          <div className="flex justify-between mt-8">
            {!isFirstStep && (
              <Button type="button" variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {!isLastStep && (
              <Button type="button" onClick={handleNext} className="ml-auto">
                Next
              </Button>
            )}
            {isLastStep && (
              <Button type="submit" className="ml-auto">
                Update Product
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ProductUpdate

