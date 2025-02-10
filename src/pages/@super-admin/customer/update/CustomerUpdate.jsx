import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  useGetCustomerById,
  useUpdateCustomer,
} from '@/features/customer/hooks/useCustomer';
import { Loader } from '@/components/ui/loader';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  userName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email.',
  }),
  phone: z.string().refine(
    (value) => {
      const regex = /^\d{10}$/;
      return regex.test(value);
    },
    {
      message: 'Phone number must be exactly 10 digits and must be a number.',
    }
  ),
  password: z
    .string()
    .nullable()
    .refine(
      (value) => {
        if (value === null) return true;

        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return value === null || regex.test(value);
      },
      {
        message:
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
      }
    ),
});

export default function CustomerUpdate() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [shouldUpdatePassword, setShouldUpdatePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data: customer, isLoading: isCustomerLoading } =
    useGetCustomerById(customerId);
  const { mutate: updateCustomer, isLoading: isUpdatingCustomer } =
    useUpdateCustomer(customerId);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: customer?.userName || '',
      email: customer?.email || '',
      phone: customer?.phone?.toString() || '',
      password: null,
    },
  });

  const setShouldSubmitPassword = (value) => {
    if (value === true) {
      form.setValue('password', '');
    } else {
      form.setValue('password', null);
    }
    setShouldUpdatePassword(value);
  };

  useEffect(() => {
    if (customer) {
      form.reset({
        userName: customer?.userName,
        email: customer?.email,
        phone: customer?.phone?.toString(),
        password: null,
      });
    }
  }, [customer, form]);

  function onSubmit(values) {
    const { password, ...dataWithoutPassword } = values;

    if (shouldUpdatePassword) dataWithoutPassword.password = password;

    updateCustomer(dataWithoutPassword);
  }

  if (isCustomerLoading) return <Loader />;

  if (!customer) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Customer not found
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto w-full p-4 md:p-6 lg:p-8'>
      <h1 className='text-2xl md:text-3xl font-bold mb-8'>Update Customer</h1>

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
              name='userName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter username' {...field} />
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

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter phone number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex items-center gap-2'>
              <Switch
                id='updatePassword'
                checked={shouldUpdatePassword}
                onCheckedChange={setShouldSubmitPassword}
              />
              <Label htmlFor='updatePassword'>Update Password</Label>
            </div>

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
                        <button
                          type='button'
                          onClick={() => setShowPassword(!showPassword)}
                          className='absolute right-3 top-1/2 -translate-y-1/2'
                        >
                          {showPassword ? (
                            <EyeOff className='h-4 w-4 text-gray-500' />
                          ) : (
                            <Eye className='h-4 w-4 text-gray-500' />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className='flex justify-end gap-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={isUpdatingCustomer}>
                {isUpdatingCustomer ? 'Updating...' : 'Update Customer'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
