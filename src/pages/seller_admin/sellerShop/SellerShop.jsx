import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/constants/routes';
import { useShopBySellerId } from '@/features/shop/hooks/useShop';
import useAuthenticationStore from '@/store/useAuthenticationStore';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  Instagram,
  Twitter,
  Star,
  Calendar,
  Facebook,
  Globe2,
  Tag,
  Edit,
} from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { CloudinaryConfig } from '../../../../Cloudinary';
import { Badge } from '@/components/ui/badge';

function SellerShop() {
  const { user } = useAuthenticationStore();
  const userId = user?.id;
  const navigate = useNavigate();
  const { data: shops } = useShopBySellerId(userId);

  if (!shops || shops.length === 0) {
    return (
      <div className='h-screen flex flex-col items-center justify-center'>
        <Button
          className='border border-input bg-green-500 shadow-sm hover:bg-green-400 text-white'
          onClick={() => navigate(`${ROUTES.SHOP.CREATE}`)}
        >
          Create a shop
        </Button>
        <p className='mt-4 text-gray-500'>
          Create your first shop and start selling right away.
        </p>
      </div>
    );
  }

  const shop = shops[0]; // Assuming we're displaying the first shop

  return (
    <div className='container mx-auto px-4 py-6 space-y-8'>
      {/* Header Section */}
      <div className='flex justify-between items-center'>
        <Link
          to={`/seller/shop/edit/${shop?._id}`}
          className={
            buttonVariants({ variant: 'default' }) + ' flex items-center gap-2'
          }
        >
          <Edit className='w-4 h-4' /> Edit Shop
        </Link>
      </div>

      {/* Banner Image */}
      <div className='relative w-full h-48 rounded-lg overflow-hidden bg-muted'>
        {shop.bannerImage?.url ? (
          <img
            src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${shop?.bannerImage?.url}`}
            alt={shop.bannerImage.altText || 'Shop banner'}
            className='w-full h-full object-cover'
          />
        ) : (
          <div className='w-full h-full flex items-center justify-center text-muted-foreground'>
            No banner image
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Info Card */}
        <Card className='drop-shadow-xl bg-card border-muted lg:col-span-2'>
          <CardHeader className='border-b'>
            <div className='flex items-center gap-4'>
              {shop.logo?.url ? (
                <img
                  src={`${CloudinaryConfig.CLOUDINARY_URL}/image/upload/${shop?.logo?.url}`}
                  alt={shop.logo.altText || 'Shop logo'}
                  className='w-16 h-16 rounded-full object-cover'
                />
              ) : (
                <div className='w-16 h-16 rounded-full bg-muted flex items-center justify-center'>
                  <Tag className='w-8 h-8 text-muted-foreground' />
                </div>
              )}
              <div>
                <CardTitle className='text-2xl'>{shop.name}</CardTitle>
                <div className='flex items-center gap-2 mt-1'>
                  <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />
                  <span className='text-sm'>
                    {shop.ratings.averageRating.toFixed(1)} (
                    {shop.ratings.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4 pt-6'>
            <div className='flex flex-col gap-2'>
              <span className='text-sm text-muted-foreground'>Description</span>
              <p className='font-medium text-card-foreground'>
                {shop.description}
              </p>
            </div>
            <Separator />
            <div className='flex justify-between items-center'>
              <span className='text-sm text-muted-foreground'>Status</span>
              <Badge
                variant={shop.status === 'active' ? 'success' : 'destructive'}
              >
                {shop.status.charAt(0).toUpperCase() + shop.status.slice(1)}
              </Badge>
            </div>
            <Separator />
            <div className='space-y-2'>
              <span className='text-sm text-muted-foreground'>
                Contact Information
              </span>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Mail className='w-4 h-4 text-muted-foreground' />
                  <span>{shop.contactEmail}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='w-4 h-4 text-muted-foreground' />
                  <span>{shop.contactPhone}</span>
                </div>
              </div>
            </div>
            <Separator />
            <div className='space-y-2'>
              <span className='text-sm text-muted-foreground'>
                Social Media
              </span>
              <div className='flex gap-4'>
                {shop.socialMedia?.facebook && (
                  <a
                    href={shop.socialMedia.facebook}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Facebook className='w-5 h-5 text-blue-600' />
                  </a>
                )}
                {shop.socialMedia?.instagram && (
                  <a
                    href={shop.socialMedia.instagram}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Instagram className='w-5 h-5 text-pink-600' />
                  </a>
                )}
                {shop.socialMedia?.twitter && (
                  <a
                    href={shop.socialMedia.twitter}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Twitter className='w-5 h-5 text-blue-400' />
                  </a>
                )}
                {shop.socialMedia?.website && (
                  <a
                    href={shop.socialMedia.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Globe2 className='w-5 h-5 text-gray-600' />
                  </a>
                )}
              </div>
            </div>
            <Separator />
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-muted-foreground' />
                <div className='flex flex-col'>
                  <span className='text-muted-foreground'>Created</span>
                  <span>{new Date(shop.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Calendar className='w-4 h-4 text-muted-foreground' />
                <div className='flex flex-col'>
                  <span className='text-muted-foreground'>Updated</span>
                  <span>{new Date(shop.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Card */}
        <Card className='drop-shadow-xl bg-card border-muted'>
          <CardHeader className='border-b'>
            <CardTitle className='text-xl flex items-center gap-2'>
              <MapPin className='w-5 h-5 text-primary' />
              Shop Address
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6 space-y-4'>
            <div className='space-y-4'>
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>Street</span>
                <span className='font-medium text-right'>
                  {shop.address.street}
                </span>
              </div>
              <Separator />
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>City</span>
                <span className='font-medium'>{shop.address.city}</span>
              </div>
              <Separator />
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>State</span>
                <span className='font-medium'>{shop.address.state}</span>
              </div>
              <Separator />
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>Pincode</span>
                <Badge variant='outline'>{shop.address.pincode}</Badge>
              </div>
              <Separator />
              <div className='flex justify-between items-center'>
                <span className='text-sm text-muted-foreground'>Country</span>
                <span className='font-medium'>{shop.address.country}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SellerShop;
