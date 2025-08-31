// // src/components/ScanForm.test.tsx
// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import axios from 'axios';
// import ScanForm from './ScanForm';
// import ResultCard from './ResultCard';

// // Mock the ResultCard component so we can verify it is rendered
// jest.mock('./ResultCard', () => ({
//   __esModule: true,
//   default: ({ result }: { result: any }) => (
//     <div data-testid="result-card">ResultCard: {result.url}</div>
//   ),
// }));

// // Mock axios
// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('ScanForm Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders the input and button', () => {
//     render(<ScanForm />);
//     expect(screen.getByPlaceholderText('https://example.com')).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /scan website/i })).toBeInTheDocument();
//   });

//   test('updates input value when typed', () => {
//     render(<ScanForm />);
//     const input = screen.getByPlaceholderText('https://example.com') as HTMLInputElement;

//     fireEvent.change(input, { target: { value: 'https://test.com' } });
//     expect(input.value).toBe('https://test.com');
//   });

//   test('shows loading state when scan button is clicked', async () => {
//     mockedAxios.post.mockResolvedValueOnce({ data: { url: 'https://test.com' } });

//     render(<ScanForm />);
//     const button = screen.getByRole('button', { name: /scan website/i });

//     fireEvent.click(button);
//     expect(button).toHaveTextContent(/scanning/i);
//     expect(button).toBeDisabled();

//     await waitFor(() => expect(mockedAxios.post).toHaveBeenCalledTimes(1));
//   });

//   test('renders ResultCard on successful scan', async () => {
//     const mockResponse = {
//       url: 'https://test.com',
//       issues: {
//         missingHeaders: [],
//         corsOpen: false,
//         xssDetected: false,
//         sqliDetected: false,
//       },
//       explanation: 'All good',
//     };

//     mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

//     render(<ScanForm />);
//     const button = screen.getByRole('button', { name: /scan website/i });

//     fireEvent.change(screen.getByPlaceholderText('https://example.com'), {
//       target: { value: 'https://test.com' },
//     });

//     fireEvent.click(button);

//     await waitFor(() => {
//       expect(screen.getByTestId('result-card')).toHaveTextContent('https://test.com');
//     });
//   });

//   test('displays error message if API fails', async () => {
//     mockedAxios.post.mockRejectedValueOnce(new Error('Network error'));

//     render(<ScanForm />);
//     const button = screen.getByRole('button', { name: /scan website/i });

//     fireEvent.change(screen.getByPlaceholderText('https://example.com'), {
//       target: { value: 'https://fail.com' },
//     });

//     fireEvent.click(button);

//     await waitFor(() => {
//       expect(screen.getByText(/scan failed/i)).toBeInTheDocument();
//     });
//   });
// });
