import { useParams, useNavigate, Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, Tag, MapPin, Calendar, Edit, Mail, Phone,
  Facebook, Instagram, Twitter, Globe, Star 
} from 'lucide-react'
import { Loader } from "@/components/common/loader"
import { useShopById } from "@/features/shop/hooks/useShop"
import { CloudinaryConfig } from "/Cloudinary"

export function ShopDetail() {
  const { shopId } = useParams()
  const navigate = useNavigate()
  const { data: shop = [], isLoading, error } = useShopById(shopId)

  if (isLoading) return <Loader />
  if (error) return <div className="flex justify-center items-center h-screen text-destructive">Error loading shop: {error.message}</div>
  if (!shop) return <div className="flex justify-center items-center h-screen">Shop not found</div>

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-secondary"
        >
          <ArrowLeft className="w-6 h-6" /> 
          <span className="text-lg">Back to Shops</span>
        </Button>
        <Link 
          to={`/dashboard/shops/${shopId}/edit`}
          className={buttonVariants({ variant: "default" }) + " flex items-center gap-2"}
        >
          <Edit className="w-4 h-4" /> Edit Shop
        </Link>
      </div>

      {/* Banner Image */}
      <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
        {shop.bannerImage?.url ? (
          <img 
            src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${shop?.bannerImage?.url}`} 
            alt={shop.bannerImage.altText || 'Shop banner'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No banner image
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info Card */}
        <Card className="drop-shadow-xl bg-card border-muted lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center gap-4">
              {shop.logo?.url ? (
                <img 
                  src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${shop?.logo?.url}`}
                  alt={shop.logo.altText || 'Shop logo'} 
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Tag className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
              <div>
                <CardTitle className="text-2xl">{shop.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">
                    {shop.ratings.averageRating.toFixed(1)} ({shop.ratings.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Description</span>
              <p className="font-medium text-card-foreground">{shop.description}</p>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant={shop.status === 'active' ? "success" : "destructive"}>
                {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Contact Information</span>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{shop.contactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{shop.contactPhone}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <span className="text-sm text-muted-foreground">Social Media</span>
              <div className="flex gap-4">
                {shop.socialMedia?.facebook && (
                  <a href={shop.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </a>
                )}
                {shop.socialMedia?.instagram && (
                  <a href={shop.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-5 h-5 text-pink-600" />
                  </a>
                )}
                {shop.socialMedia?.twitter && (
                  <a href={shop.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-5 h-5 text-blue-400" />
                  </a>
                )}
                {shop.socialMedia?.website && (
                  <a href={shop.socialMedia.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-5 h-5 text-gray-600" />
                  </a>
                )}
              </div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Created</span>
                  <span>{new Date(shop.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-muted-foreground">Updated</span>
                  <span>{new Date(shop.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card className="drop-shadow-xl bg-card border-muted">
          <CardHeader className="border-b">
            <CardTitle className="text-xl flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Shop Address
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Street</span>
                <span className="font-medium text-right">{shop.address.street}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">City</span>
                <span className="font-medium">{shop.address.city}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">State</span>
                <span className="font-medium">{shop.address.state}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pincode</span>
                <Badge variant="outline">{shop.address.pincode}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Country</span>
                <span className="font-medium">{shop.address.country}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ShopDetail