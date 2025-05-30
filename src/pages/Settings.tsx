import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const passwordChangeSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required('Old password is required')
    .min(8, 'Password must be at least 8 characters'),
  newPassword: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('last-7-days');
  const [selectedSalesRep, setSelectedSalesRep] = useState('all');
  const { toast } = useToast();

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordChangeSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Here you would typically make an API call to change the password
        // For now, we'll simulate a successful password change
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        toast({
          title: "Password changed successfully",
          description: "Your password has been updated.",
        });
        
        formik.resetForm();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to change password. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 lg:p-6">
      <div className="mb-6">
         
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border dark:border-gray-800 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Change Password
                </h1>
                
              </div>
              
            </div>
          </div>
        </div>
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Current Password</Label>
                  <Input
                    id="oldPassword"
                    type="password"
                    placeholder="Enter your current password"
                    {...formik.getFieldProps('oldPassword')}
                  />
                  {formik.touched.oldPassword && formik.errors.oldPassword && (
                    <p className="text-sm text-red-500">{formik.errors.oldPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    {...formik.getFieldProps('newPassword')}
                  />
                  {formik.touched.newPassword && formik.errors.newPassword && (
                    <p className="text-sm text-red-500">{formik.errors.newPassword}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    {...formik.getFieldProps('confirmPassword')}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <p className="text-sm text-red-500">{formik.errors.confirmPassword}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings; 