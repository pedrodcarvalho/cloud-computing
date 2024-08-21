import React, { useEffect, useState } from 'react';
import { Table, TextInput, Button } from 'flowbite-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { nanoid } from 'nanoid';

const authSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  greeting: z.string().min(3, 'Greeting must be at least 3 characters long'),
  date: z.string().min(3, 'Date must be at least 3 characters long'),
});

const DashboardTable = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [greetings, setGreetings] = useState([]);

  useEffect(() => {
    const fetchGreetings = async () => {
      const response = await axios.get('http://localhost:5000/get-greetings', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      response.data.greetings.map((greeting) => (greeting.date = new Date(greeting.date).toLocaleDateString('pt-BR')));

      setGreetings(response.data.greetings);
    };

    fetchGreetings();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(authSchema),
  });

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleSaveClick = async () => {
    await axios.put('http://localhost:5000/update-greeting', greetings[editIndex], {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    setEditIndex(null);
  };

  const handleDeleteClick = async () => {
    await axios.post('http://localhost:5000/delete-greeting', greetings[editIndex], {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    setGreetings(greetings.filter((_, index) => index !== editIndex));
    setEditIndex(null);
  };

  const handleChange = (index, field, value) => {
    const newGreetings = [...greetings];
    newGreetings[index][field] = value;
    setGreetings(newGreetings);
  };

  const handleAddNewGreeting = async () => {
    const newGreeting = getValues();
    newGreeting.date = new Date(newGreeting.date).toLocaleDateString('pt-BR');
    newGreeting.id = nanoid();
    await axios.post('http://localhost:5000/set-greeting', newGreeting, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    setGreetings([...greetings, newGreeting]);
    reset({
      name: '',
      email: '',
      greeting: '',
      date: '',
    });
  };

  return (
    <div className="overflow-x-auto border-b-2 rounded-b-xl">
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="bg-zinc-100">Name</Table.HeadCell>
          <Table.HeadCell className="bg-zinc-100">E-mail</Table.HeadCell>
          <Table.HeadCell className="bg-zinc-100">Greeting</Table.HeadCell>
          <Table.HeadCell className="bg-zinc-100">Date</Table.HeadCell>
          <Table.HeadCell className="bg-zinc-100">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {greetings.map((greeting, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {editIndex === index ? (
                  <TextInput
                    type="text"
                    value={greeting.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                    className="w-full bg-transparent focus:outline-none"
                  />
                ) : (
                  greeting.name
                )}
              </Table.Cell>
              <Table.Cell>
                {editIndex === index ? (
                  <TextInput
                    type="email"
                    value={greeting.email}
                    onChange={(e) => handleChange(index, 'email', e.target.value)}
                    className="w-full bg-transparent focus:outline-none"
                  />
                ) : (
                  greeting.email
                )}
              </Table.Cell>
              <Table.Cell>
                {editIndex === index ? (
                  <TextInput
                    type="text"
                    value={greeting.greeting}
                    onChange={(e) => handleChange(index, 'greeting', e.target.value)}
                    className="w-full bg-transparent focus:outline-none"
                  />
                ) : (
                  greeting.greeting
                )}
              </Table.Cell>
              <Table.Cell>
                {editIndex === index ? (
                  <TextInput
                    type="text"
                    value={greeting.date}
                    onChange={(e) => handleChange(index, 'date', e.target.value)}
                    className="w-full bg-transparent focus:outline-none"
                  />
                ) : (
                  greeting.date
                )}
              </Table.Cell>
              <Table.Cell>
                {editIndex === index ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className="font-medium bg-transparent text-cyan-700 hover:underline"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleDeleteClick(greeting.id)}
                      className="font-medium bg-transparent text-red-600 hover:underline ml-4"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditClick.bind(null, index)}
                    className="font-medium bg-transparent text-cyan-700 hover:underline"
                  >
                    Edit
                  </button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
          {/* New greeting input row */}
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              <TextInput
                type="text"
                placeholder="Name"
                {...register('name')}
                className="w-full bg-transparent focus:outline-none"
                color={errors.name ? 'failure' : 'default'}
                helperText={errors.name && <span className="text-red-600">{errors.name.message}</span>}
              />
            </Table.Cell>
            <Table.Cell>
              <TextInput
                type="email"
                placeholder="E-mail"
                {...register('email')}
                className="w-full bg-transparent focus:outline-none"
                color={errors.email ? 'failure' : 'default'}
                helperText={errors.email && <span className="text-red-600">{errors.email.message}</span>}
              />
            </Table.Cell>
            <Table.Cell>
              <TextInput
                type="text"
                placeholder="Greeting"
                {...register('greeting')}
                className="w-full bg-transparent focus:outline-none"
                color={errors.greeting ? 'failure' : 'default'}
                helperText={errors.greeting && <span className="text-red-600">{errors.greeting.message}</span>}
              />
            </Table.Cell>
            <Table.Cell>
              <TextInput
                type="text"
                placeholder="Date"
                {...register('date')}
                className="w-full bg-transparent focus:outline-none"
                color={errors.date ? 'failure' : 'default'}
                helperText={errors.date && <span className="text-red-600">{errors.date.message}</span>}
              />
            </Table.Cell>
            <Table.Cell>
              <Button
                onClick={handleSubmit(handleAddNewGreeting)}
                className="font-medium hover:underline"
              >
                Add
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default DashboardTable;
