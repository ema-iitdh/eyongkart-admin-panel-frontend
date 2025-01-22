import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllAdmins } from "@/features/admin/hooks/useAdmin";
import { ImageUpload } from "./_components/image-uploads";
import { useCreateShopPost } from "@/features/shop/hooks/useShop";
import { useNavigate } from "react-router-dom";
import useAuthenticationStore from "@/store/useAuthenticationStore";
import { useGetSellerById } from "@/features/seller/hooks/useSeller";
import { ROUTES } from "@/constants/routes";

const formSchema = z.object({
  name: z.string().min(1, "Shop name is required").max(100),
  description: z.string().min(1, "Description is required"),
  owner: z.string().min(1, "Owner selection is required"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(1, "Contact phone is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().min(1, "Pincode is required"),
  country: z.string().default("India"),
  status: z.enum(["active", "inactive", "suspended"]).default("active"),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  website: z.string().optional(),
  logoAltText: z.string().optional(),
  bannerImageAltText: z.string().optional(),
});

export function ShopCreate() {
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState("basic");
  const { toast } = useToast();
  const createShopMutation = useCreateShopPost();
  const navigate = useNavigate();

  const { user } = useAuthenticationStore();
  const isSuperAdmin = user.role === "Super_Admin";
  const sellerId = user?.id;
  console.log(sellerId);
  const { data: seller } = useGetSellerById(sellerId);

  const { data: admins = [], isLoading: isLoadingAdmins } = useGetAllAdmins();
  console.log(seller, "seller");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "active",
      country: "India",
    },
  });

  useEffect(() => {
    if(!isSuperAdmin && seller?.sellerAdmin) {
      form.setValue('owner', sellerId);
    }
  }, [seller, isSuperAdmin, sellerId, form])

  const goToNextTab = () => {
    switch (currentTab) {
      case "basic":
        setCurrentTab("address");
        break;
      case "address":
        setCurrentTab("social");
        break;
      case "social":
        setCurrentTab("images");
        break;
      default:
        break;
    }
  };

  async function onSubmit(values) {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      if (logoFile) {
        formData.append("logo", logoFile);
      }
      if (bannerFile) {
        formData.append("bannerImage", bannerFile);
      }

      const response = await createShopMutation.mutateAsync(formData);
      console.log(response);
      if (!response.success) {
        throw new Error("Failed to create shop");
      }

      toast({
        title: "Success",
        description: "Shop created successfully",
      });

      form.reset();
      isSuperAdmin ? navigate("/dashboard/shops") : navigate(ROUTES.SELLER_SHOP);
    } catch (error) {
      console.error("Shop creation error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create shop",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  // (()=>toast({title:"Test", description:"This is a test toast"}))()
  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <h1 className="text-3xl font-bold">Create New Shop</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs
            defaultValue="basic"
            value={currentTab}
            onValueChange={setCurrentTab}
            className="space-y-4"
          >
            <TabsList>
              <TabsTrigger value="basic">Basic Details</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="owner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shop Owner</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isLoadingAdmins || !isSuperAdmin}
                          ><SelectTrigger className="w-full">
                                  <SelectValue placeholder={isSuperAdmin ? "Select shop owner" : `${seller.sellerAdmin.name} (${seller.sellerAdmin.email})`} />
                                </SelectTrigger>
                            {isSuperAdmin ? (
                                <SelectContent>
                                  {admins.map((admin) => (
                                    <SelectItem
                                      key={admin._id}
                                      value={admin._id}
                                    >
                                      {admin.name} ({admin.email})
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                            ): null}
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shop Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter shop name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Enter shop description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter contact email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter contact phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  onClick={async () => {
                    const result = await form.trigger([
                      "owner",
                      "name",
                      "description",
                      "contactEmail",
                      "contactPhone",
                      "status",
                    ]);
                    if (result) {
                      goToNextTab();
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="address">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter street address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter city" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter state" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="pincode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pincode</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter pincode" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter country"
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  onClick={async () => {
                    const result = await form.trigger([
                      "street",
                      "city",
                      "state",
                      "pincode",
                      "country",
                    ]);
                    if (result) {
                      goToNextTab();
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="social">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="facebook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Facebook</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter Facebook URL" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="instagram"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Instagram</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter Instagram URL" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter Twitter URL" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter website URL" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <div className="mt-4 flex justify-end">
                <Button
                  type="button"
                  onClick={async () => {
                    const result = await form.trigger([
                      "facebook",
                      "instagram",
                      "twitter",
                      "website",
                    ]);
                    if (result) {
                      goToNextTab();
                    }
                  }}
                >
                  Next
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="images">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-4">
                    <FormLabel>Shop Logo</FormLabel>
                    <ImageUpload
                      title="Logo"
                      description="Upload your shop logo"
                      value={logoFile}
                      onChange={setLogoFile}
                      multiple={false}
                      className="w-full max-w-md"
                    />
                    <FormField
                      control={form.control}
                      name="logoAltText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo Alt Text</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Describe the logo for accessibility"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormLabel>Banner Image</FormLabel>
                    <ImageUpload
                      title="Banner"
                      description="Upload your shop banner"
                      value={bannerFile}
                      onChange={setBannerFile}
                      multiple={false}
                      className="w-full max-w-md"
                    />
                    <FormField
                      control={form.control}
                      name="bannerImageAltText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Banner Alt Text</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Describe the banner for accessibility"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="mt-4 flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || isLoadingAdmins}
                >
                  {isSubmitting ? "Creating..." : "Create Shop"}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}

export default ShopCreate;
