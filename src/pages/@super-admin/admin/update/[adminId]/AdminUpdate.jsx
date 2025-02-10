import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminById, useUpdateAdmin } from '@/features/admin/hooks/useAdmin';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  isActive: z.boolean(),
  isVerified: z.boolean(),
  password: z
    .string()
    .nullable()
    .refine(
      (password) => {
        if (password === null) return true;
        const passwordRegex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
      },
      {
        message:
          'Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one special character',
      }
    ),
});

export default function AdminUpdate() {
  const { adminId } = useParams();
  const navigate = useNavigate();
  const { data: admin, isLoading } = useAdminById(adminId);
  const [shouldUpdatePassword, setShouldUpdatePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: updateAdmin, isPending } = useUpdateAdmin();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      isActive: false,
      isVerified: false,
      password: null,
    },
  });

  useEffect(() => {
    if (admin) {
      form.reset({
        name: admin.name,
        email: admin.email,
        isActive: admin.isActive,
        isVerified: admin.isVerified,
        password: null,
      });
    }
  }, [admin, form]);

  const setShouldIncludePassword = (value) => {
    if (value === true) {
      form.setValue('password', '');
    } else {
      form.setValue('password', null);
    }
    setShouldUpdatePassword(value);
  };

  function onSubmit(values) {
    const { password, ...valuesWithoutPassword } = values;
    valuesWithoutPassword.role = admin.role;
    valuesWithoutPassword.adminId = admin._id;
    if (shouldUpdatePassword) {
      valuesWithoutPassword.password = password;
    }

    updateAdmin(valuesWithoutPassword);
  }

  if (isLoading) return <AdminUpdateSkeleton />;

  return (
    <div className='max-w-4xl mx-auto w-full p-4 md:p-6 lg:p-8'>
      <h1 className='text-2xl md:text-3xl font-bold mb-8'>Update Admin</h1>

      {/* Back Button */}
      <div className='mb-6'>
        <Button
          onClick={() => navigate(-1)}
          variant='secondary'
          className='flex items-center gap-2'
        >
          <ArrowLeft className='h-4 w-4' />
          Back
        </Button>
      </div>

      <div className='bg-white rounded-lg shadow-lg p-6'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter email' type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
              <div className='space-y-0.5'>
                <FormLabel className='text-base'>Update Password</FormLabel>
              </div>
              <Switch
                checked={shouldUpdatePassword}
                onCheckedChange={setShouldIncludePassword}
              />
            </FormItem>

            {shouldUpdatePassword && (
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          placeholder='Enter new password'
                          type={showPassword ? 'text' : 'password'}
                          {...field}
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          className='absolute right-2 top-1/2 -translate-y-1/2'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <span className='sr-only'>
                            {showPassword ? 'Hide password' : 'Show password'}
                          </span>
                          {showPassword ? <EyeOff /> : <Eye />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <FormField
                control={form.control}
                name='isActive'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>Active Status</FormLabel>
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
                name='isVerified'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>
                        Verification Status
                      </FormLabel>
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
            </div>

            <Button
              type='submit'
              className='w-full md:w-auto'
              disabled={isPending}
            >
              {isPending ? 'Updating...' : 'Update Admin'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

function AdminUpdateSkeleton() {
  return (
    <div className='max-w-4xl mx-auto w-full p-4 md:p-6 lg:p-8'>
      <Skeleton className='h-10 w-48 mb-8' />
      <Skeleton className='h-10 w-24 mb-6' />
      <div className='bg-white rounded-lg shadow-lg p-6 space-y-6'>
        <Skeleton className='h-20 w-full' />
        <Skeleton className='h-20 w-full' />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Skeleton className='h-20 w-full' />
          <Skeleton className='h-20 w-full' />
        </div>
        <Skeleton className='h-10 w-32' />
      </div>
    </div>
  );
}
