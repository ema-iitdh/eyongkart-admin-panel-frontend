import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { FormNavigation } from "./_components/form-navigation";
import { BasicDetails } from "./_components/basic-details";
import { Categorization } from "./_components/categorization";
import { Specifications } from "./_components/specifications";
import { TargetAudience } from "./_components/target-audience";
import { StatusVisibility } from "./_components/status-visibility";
import { SEO } from "./_components/seo";
import { ImageUpload } from "./_components/image-upload";
import { Variants } from "./_components/variants";
import { useCreateProductPost } from "@/features/products/hooks/useProducts";
import { formSchema } from "@/constants";
import { ROUTES } from "@/constants/routes";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useAuthenticationStore from "@/store/useAuthenticationStore";

export function ProductCreate() {
  const { user } = useAuthenticationStore();
  const isSuperAdmin = user?.role === "Super_Admin";
  const navigate = useNavigate();
  const [baseImage, setBaseImage] = useState(null);
  const [variantImages, setVariantImages] = useState({});
  const [currentStep, setCurrentStep] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createProduct } = useCreateProductPost();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gender: "Unisex",
      ageGroup: "Adult",
      status: "published",
      isVisible: true,
      variants: [],
    },
  });

  async function onSubmit(values) {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Append basic fields
      for (const [key, value] of Object.entries(values)) {
        if (key !== "variants" && key !== "specifications") {
          if (Array.isArray(value)) {
            formData.append(key, JSON.stringify(value));
          } else if (typeof value === "object" && value !== null) {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value);
          }
        }
      }

      // Append specifications if they exist
      if (values.specifications) {
        formData.append(
          "specifications",
          JSON.stringify(values.specifications)
        );
      }

      // Append base image
      if (baseImage) {
        formData.append("baseImage", baseImage);
      }

      // Process variants and their images
      if (values.variants?.length) {
        const processedVariants = values.variants.map((variant, index) => {
          const variantCopy = { ...variant, id: index + 1 };
          if (variantImages[index]) {
            variantCopy.imageRefs = variantImages[index].map(
              (_, imgIndex) => `variant_${index + 1}`
            );
          }
          return variantCopy;
        });

        formData.append("variants", JSON.stringify(processedVariants));

        // Append variant images
        Object.entries(variantImages).forEach(([variantIndex, images]) => {
          images.forEach((image, imageIndex) => {
            if (image instanceof File) {
              formData.append(
                `variant_${Number.parseInt(variantIndex) + 1}`,
                image
              );
            }
          });
        });
      }

      // Log formData contents for debugging
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      console.log("createProduct reached");
      createProduct(formData, {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Product created successfully",
          });
          // Optional: Reset form or redirect
          // form.reset();
          if (isSuperAdmin) {
            navigate(ROUTES.PRODUCT.LIST);
          } else {
            navigate(ROUTES.SELLER_PRODUCT);
          }
        },
        onError: (error) => {
          console.error("Product creation error:", error);
          toast({
            title: "Error",
            description:
              error.response?.data?.message || "Failed to create product",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "Failed to process form data",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const steps = [
    { id: "basic", component: <BasicDetails form={form} /> },
    { id: "categorization", component: <Categorization form={form} /> },
    { id: "specifications", component: <Specifications form={form} /> },
    { id: "audience", component: <TargetAudience form={form} /> },
    { id: "status", component: <StatusVisibility form={form} /> },
    { id: "seo", component: <SEO form={form} /> },
    {
      id: "baseImage",
      component: (
        <ImageUpload
          title="Base Image"
          description="Upload the main image for your product"
          images={baseImage}
          setImages={setBaseImage}
          multiple={false}
        />
      ),
    },
    {
      id: "variants",
      component: (
        <Variants
          form={form}
          variantImages={variantImages}
          setVariantImages={
            setVariantImages
            //   (newImages, key) => {
            //   setVariantImages(prev => {
            //     return {
            //       ...prev,
            //       [key]: newImages,
            //     }
            //   })
            // }
          }
        />
      ),
    },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep);
  const isLastStep = currentStepIndex === steps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const handleNext = async () => {
    let isValid = true;
    if (currentStep === "basic") {
      isValid = await form.trigger(["name", "description"]);
    } else if (currentStep === "categorization") {
      isValid = await form.trigger(["category", "shop"]);
    }
    if (isValid && !isLastStep) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleStepChange = async (step) => {
    let isValid = true;
    switch (currentStep) {
      case "basic":
        isValid = await form.trigger(["name", "description"]);
        break;
      case "categorization":
        isValid = await form.trigger(["category", "shop"]);
        break;
      // Add more cases if needed for other steps
      default:
        break;
    }
    if (isValid) {
      setCurrentStep(step);
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill all mandatory fields before proceeding.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6"
      >
        <ArrowLeft className="w-8 h-8" />{" "}
        <span className="text-lg">Back to Products</span>
      </Button>
      <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
      <FormNavigation
        currentStep={currentStep}
        onStepChange={handleStepChange}
        form={form}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {steps.find((step) => step.id === currentStep)?.component}
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
                Create Product
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ProductCreate;
