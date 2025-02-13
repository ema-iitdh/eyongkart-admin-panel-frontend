import { Loader } from '@/components/common/loader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  useEyongkartInfo,
  useUpdateEyongkartInfo,
} from '@/features/settings/hooks/useSetting';
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Schema definitions
const companyInfoSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  description: z.string().min(1, 'Description is required'),
  logo: z.string().url('Must be a valid URL'),
});

const contactInfoSchema = z.object({
  address: z.string(),
  mapURL: z.string(),
  phone: z.string(),
  email: z.string().email('Must be a valid email').optional(),
});

const socialLinksSchema = z.object({
  facebook: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.*$/.test(val), {
      message: 'Must be a valid URL if provided',
    }),
  twitter: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.*$/.test(val), {
      message: 'Must be a valid URL if provided',
    }),
  instagram: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.*$/.test(val), {
      message: 'Must be a valid URL if provided',
    }),
  linkedin: z
    .string()
    .optional()
    .refine((val) => !val || /^https?:\/\/.*$/.test(val), {
      message: 'Must be a valid URL if provided',
    }),
});

const otherInfoSchema = z.object({
  newsletter: z
    .object({
      description: z.string().optional(),
    })
    .optional(),
  copyright: z.string().optional(),
  customerService: z.array(z.string()).optional(),
  legalInfo: z.array(z.string()).optional(),
  developersMessage: z.string().optional(),
});

const settingsSchema = z.object({
  companyInfo: companyInfoSchema,
  contactInfo: contactInfoSchema,
  socialLinks: socialLinksSchema,
  ...otherInfoSchema.shape,
});

// Form section components
const CompanyInfoSection = ({ form }) => (
  <Card className='p-6 space-y-4'>
    <FormField
      control={form.control}
      name='companyInfo.name'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Company Name</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='companyInfo.description'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Company Description</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='companyInfo.logo'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Logo URL</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </Card>
);

const ContactInfoSection = ({ form }) => (
  <Card className='p-6 space-y-4'>
    <FormField
      control={form.control}
      name='contactInfo.address'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='contactInfo.mapURL'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Map URL</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='contactInfo.email'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='contactInfo.phone'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </Card>
);

const SocialLinksSection = ({ form }) => (
  <Card className='p-6 space-y-4'>
    <FormField
      control={form.control}
      name='socialLinks.facebook'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Facebook</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='socialLinks.twitter'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Twitter</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='socialLinks.instagram'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Instagram</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='socialLinks.linkedin'
      render={({ field }) => (
        <FormItem>
          <FormLabel>LinkedIn</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </Card>
);

const OtherInfoSection = ({ form }) => (
  <Card className='p-6 space-y-4'>
    <FormField
      control={form.control}
      name='newsletter.description'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Newsletter Description</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='copyright'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Copyright Text</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name='developersMessage'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Developer's Message</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </Card>
);

export default function SettingPage() {
  const { data: eyongkartInfo, isLoading: isEyongkartInfoLoading } =
    useEyongkartInfo();
  const updateEyongkartInfo = useUpdateEyongkartInfo();

  const info = eyongkartInfo?.[0];

  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyInfo: {
        name: info?.companyInfo?.name || '',
        description: info?.companyInfo?.description || '',
        logo: info?.companyInfo?.logo || '',
      },
      contactInfo: {
        address: info?.contactInfo?.address || '',
        mapURL: info?.contactInfo?.mapURL || '',
        phone: info?.contactInfo?.phone || '',
        email: info?.contactInfo?.email || '',
      },
      socialLinks: {
        facebook: info?.socialLinks?.facebook || '',
        twitter: info?.socialLinks?.twitter || '',
        instagram: info?.socialLinks?.instagram || '',
        linkedin: info?.socialLinks?.linkedin || '',
      },
      newsletter: {
        description: info?.newsletter?.description || '',
      },
      copyright: info?.copyright || '',
      customerService: info?.customerService || [],
      legalInfo: info?.legalInfo || [],
      developersMessage: info?.developersMessage || '',
    },
  });

  useEffect(() => {
    if (info) {
      form.reset(info);
    }
  }, [info, form]);

  const onSubmit = (data) => {
    try {
      updateEyongkartInfo.mutate({
        id: info?._id,
        ...data,
      });
    } catch (error) {
      toast({
        title: 'Error saving settings',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (isEyongkartInfoLoading) return <Loader />;

  return (
    <div className='p-6 space-y-6'>
      <h1 className='text-2xl font-bold'>Eyongkart Settings</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <Tabs defaultValue='company' className='space-y-4'>
            <TabsList className='flex flex-wrap gap-2 h-full xl:w-max'>
              <TabsTrigger value='company'>Company Info</TabsTrigger>
              <TabsTrigger value='contact'>Contact</TabsTrigger>
              <TabsTrigger value='social'>Social Links</TabsTrigger>
              <TabsTrigger value='other'>Other Info</TabsTrigger>
            </TabsList>

            <TabsContent value='company'>
              <CompanyInfoSection form={form} />
            </TabsContent>

            <TabsContent value='contact'>
              <ContactInfoSection form={form} />
            </TabsContent>

            <TabsContent value='social'>
              <SocialLinksSection form={form} />
            </TabsContent>

            <TabsContent value='other'>
              <OtherInfoSection form={form} />
            </TabsContent>
          </Tabs>

          <Button type='submit' disabled={updateEyongkartInfo.isPending}>
            {updateEyongkartInfo.isPending ? 'Saving...' : 'Save Settings'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
