import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateNewAdmin } from '@/features/admin/hooks/useAdmin';
import { toast } from '@/hooks/use-toast';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

const AdminCreate = () => {
  const { mutate: createAdmin } = useCreateNewAdmin();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return minLength && hasUpperCase && hasLowerCase && hasSpecialChar;
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate fields
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password && !validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters long, contain one uppercase, one lowercase, and one special character';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare form data for submission
    const submissionData = {
      ...formData,
      role:
        formData.role === 'Super Admin'
          ? 'Super_Admin'
          : 'Shop_Seller_Site_Admin',
    };

    createAdmin(submissionData, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'Product created successfully',
        });
        console.log('Form submitted:', submissionData);
        setFormData({ role: '', name: '', email: '', password: '' });
        navigate(`${ROUTES.DASHBOARD}`);
      },
    });
  };

  return (
    <div className='max-w-md mx-auto mt-10 min-w-[400px]'>
      <Card className='shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold text-center'>
            Create New Admin
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='role'>Role</Label>
              <Select onValueChange={(value) => handleChange('role', value)}>
                <SelectTrigger id='role'>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Super Admin'>Super Admin</SelectItem>
                  <SelectItem value='Seller'>Seller</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className='text-red-500 text-sm'>{errors.role}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className='w-full'
              />
              {errors.name && (
                <p className='text-red-500 text-sm'>{errors.name}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className='w-full'
              />
              {errors.email && (
                <p className='text-red-500 text-sm'>{errors.email}</p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                type='password'
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className='w-full'
              />
              {errors.password && (
                <p className='text-red-500 text-sm'>{errors.password}</p>
              )}
            </div>
            <Button type='submit' className='w-full mt-4'>
              Create Admin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCreate;
