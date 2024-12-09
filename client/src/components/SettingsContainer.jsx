import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Label, TextInput } from 'flowbite-react';

const BACKEND_IP = process.env.REACT_APP_BACKEND_IP || '127.0.0.1';

const authSchema = z.object({
  username: z.string().email('Invalid email address'),
  remember: z.boolean().optional(),
});

const SettingsContainer = () => {
  const [username, setUsername] = useState('');
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(authSchema),
    values: {
      username: username,
    },
  });

  const onSubmit = async (data) => {
    try {
      setFormError('');
      setSuccessMessage('');

      const response = await axios.post(`http://${BACKEND_IP}:5000/update-user`, data, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      setFormError(error.response?.data?.message || 'Update failed');
      console.error(error.response?.data || 'Update failed');
    }
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await axios.get(`http://${BACKEND_IP}:5000/get-username`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      setUsername(response.data.username);
    };

    fetchUsername();
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-50 py-10 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Settings</h2>
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
            {...register('username')}
            className="w-full"
            color={errors.username ? 'failure' : 'default'}
            helperText={errors.username && <span className="text-red-600">{errors.username.message}</span>}
          />
        </div>
        {formError && <p className="text-red-600 text-start text-pretty mb-4 text-xs">{formError}</p>}
        {successMessage && <p className="text-green-600 text-start text-pretty mb-4 text-xs">{successMessage}</p>}
        <Button
          type="submit"
          className="w-full"
        >
          Change E-mail
        </Button>
      </form>
    </div>
  );
};

export default SettingsContainer;
