import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Label, TextInput, Checkbox } from 'flowbite-react';

const BACKEND_IP = process.env.REACT_APP_BACKEND_IP || '127.0.0.1';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  remember: z.boolean().optional(),
});

const Login = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data) => {
    try {
      setFormError('');

      const url = isRegister ? `http://${BACKEND_IP}:5000/auth/register` : `http://${BACKEND_IP}:5000/auth/login`;
      const response = await axios.post(url, data);
      localStorage.removeItem('token');
      localStorage.setItem('token', response.data.token);

      if (isRegister) {
        setIsRegister(false);
        return;
      }

      navigate('/dashboard');
    } catch (error) {
      setFormError(error.response?.data?.message || 'Authentication failed');

      console.error(error.response?.data || 'Authentication failed');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">{isRegister ? 'Register' : 'Login'}</h2>
        <div className="mb-4">
          <Label
            htmlFor="email"
            className="block mb-2"
          >
            Email
          </Label>
          <TextInput
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register('email')}
            className="w-full"
            color={errors.email ? 'failure' : 'default'}
            helperText={errors.email && <span className="text-red-600">{errors.email.message}</span>}
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="password"
            className="block mb-2"
          >
            Password
          </Label>
          <TextInput
            id="password"
            type="password"
            placeholder="••••••••"
            {...register('password')}
            className="w-full"
            color={errors.password ? 'failure' : 'default'}
            helperText={errors.password && <span className="text-red-600">{errors.password.message}</span>}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Checkbox
              id="remember"
              {...register('remember')}
            />
            <Label
              htmlFor="remember"
              className="ml-2"
            >
              Remember me
            </Label>
          </div>
          {!isRegister && (
            <a
              href="/"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          )}
        </div>
        {formError && <p className="text-red-600 text-start text-pretty mb-4 text-xs">{formError}</p>}
        <Button
          type="submit"
          className="w-full"
        >
          {isRegister ? 'Register' : 'Login'}
        </Button>
        <p className="mt-4 text-center text-sm">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Register'} here
          </span>
          .
        </p>
      </form>
    </div>
  );
};

export default Login;
