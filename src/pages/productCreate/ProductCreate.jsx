import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { BasicDetails } from './_components/basic-details'
import { Categorization } from './_components/categorization'
import { Specifications } from './_components/specifications'
import { TargetAudience } from './_components/target-audience'
import { StatusVisibility } from './_components/status-visibility'
import { SEO } from './_components/seo'
import { ImageUpload } from './_components/image-upload'

const formSchema = z.object({
    // Basic Details
    name: z.string().min(1).max(100),
    description: z.string().min(1),
    shortDescription: z.string().max(200).optional(),
  
    // Categorization
    category: z.string(),
    subcategory: z.string().optional(),
    shop: z.string(),
  
    // Specifications
    specifications: z.object({
      material: z.string(),
      weaveType: z.string().optional(),
      craftTechnique: z.string().optional(),
      careInstructions: z.string().optional(),
      fabricCount: z.string().optional(),
      borderType: z.string().optional(),
      borderWidth: z.string().optional(),
      palluDetails: z.string().optional(),
      threadCount: z.number().optional(),
      zariType: z.string().optional(),
    }),
  
    // Target Audience
    gender: z.enum(['Male', 'Female', 'Unisex']),
    ageGroup: z.enum(['Adult', 'Kids', 'All']),
  
    // Status and Visibility
    status: z.enum(['draft', 'published', 'archived']),
    isVisible: z.boolean(),
  
    // SEO
    metaTitle: z.string().max(60).optional(),
    metaDescription: z.string().max(160).optional(),
    keywords: z.array(z.string()),
  
    // Images will be handled separately
  })
  
  export function ProductCreate() {
    const [images, setImages] = useState([])
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        gender: 'Unisex',
        ageGroup: 'Adult',
        status: 'draft',
        isVisible: true,
        keywords: [],
      },
    })
  
    async function onSubmit(values) {
      try {
        // todo send api request
        console.log(values, images)
        toast({
          title: "Product created",
          description: "Your product has been successfully created.",
        })
      } catch (error) {
        console.error('Failed to create product:', error)
        toast({
          title: "Error",
          description: "Failed to create product. Please try again.",
          variant: "destructive",
        })
      }
    }
  
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList>
                <TabsTrigger value="basic">Basic Details</TabsTrigger>
                <TabsTrigger value="categorization">Categorization</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="audience">Target Audience</TabsTrigger>
                <TabsTrigger value="status">Status & Visibility</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              <TabsContent value="basic">
                <BasicDetails form={form} />
              </TabsContent>
              <TabsContent value="categorization">
                <Categorization form={form} />
              </TabsContent>
              <TabsContent value="specifications">
                <Specifications form={form} />
              </TabsContent>
              <TabsContent value="audience">
                <TargetAudience form={form} />
              </TabsContent>
              <TabsContent value="status">
                <StatusVisibility form={form} />
              </TabsContent>
              <TabsContent value="seo">
                <SEO form={form} />
              </TabsContent>
              <TabsContent value="images">
                <ImageUpload images={images} setImages={setImages} />
              </TabsContent>
            </Tabs>
            <Button type="submit">Create Product</Button>
          </form>
        </Form>
      </div>
    )
  }
  
  export default ProductCreate
  