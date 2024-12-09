import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import DashboardTable from '../components/DashboardTable';
import axios from 'axios';
import { nanoid } from 'nanoid';
jest.mock('axios');

const mockGreetings = [
  { id: nanoid(), name: 'John Doe', email: 'john@example.com', greeting: 'Hello', date: '2024-12-09' },
  { id: nanoid(), name: 'Jane Smith', email: 'jane@example.com', greeting: 'Good morning', date: '2024-12-09' },
];

describe('DashboardTable Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { greetings: mockGreetings } });

    axios.post.mockResolvedValue({});
    axios.put.mockResolvedValue({});
  });

  test('renders the component without errors', async () => {
    render(<DashboardTable />);
    await waitFor(() => screen.getByText('Greeting'));
  });

  test('handles add new greeting form submission', async () => {
    render(<DashboardTable />);
    await waitFor(() => screen.getByText('Greeting'));

    const nameInput = screen.getByPlaceholderText('Name');
    const emailInput = screen.getByPlaceholderText('E-mail');
    const greetingInput = screen.getByPlaceholderText('Greeting');

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'testuser@example.com' } });
    fireEvent.change(greetingInput, { target: { value: 'Hi there!' } });

    await act(async () => {
      fireEvent.click(screen.getByText('Add'));
    });

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('testuser@example.com')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  test('handles CRUD actions', async () => {
    render(<DashboardTable />);
    await waitFor(() => screen.getByText('Greeting'));

    const editButton = await waitFor(() => screen.getAllByText('Edit')[0]);
    fireEvent.click(editButton);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
  });
});
