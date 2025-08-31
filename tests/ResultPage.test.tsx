// // src/app/results/ResultsPage.test.tsx
// 'use client';

// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import ResultsPage from './page';

// // Mock fetch or API call
// jest.mock('next/navigation', () => ({
//   useRouter: () => ({ push: jest.fn() }),
// }));

// const mockScans = [
//   {
//     id: '1',
//     url: 'https://example.com',
//     scannedAt: '2025-07-28 14:32',
//     issueCount: 3,
//     explanation: 'Missing headers and SQLi detected',
//     headers: { 'content-security-policy': 'missing' },
//   },
//   {
//     id: '2',
//     url: 'https://secure-site.com',
//     scannedAt: '2025-07-27 10:12',
//     issueCount: 0,
//     explanation: 'No issues detected',
//     headers: {},
//   },
// ];

// jest.mock('@/lib/fetchScans', () => ({
//   fetchScans: jest.fn().mockResolvedValue(mockScans),
// }));

// describe('ResultsPage Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('renders the table with correct headers', () => {
//     render(<ResultsPage />);

//     expect(screen.getByText(/website url/i)).toBeInTheDocument();
//     expect(screen.getByText(/date & time/i)).toBeInTheDocument();
//     expect(screen.getByText(/issues found/i)).toBeInTheDocument();
//     expect(screen.getByText(/status/i)).toBeInTheDocument();
//   });

//   test('renders scan rows correctly', async () => {
//     render(<ResultsPage />);

//     await waitFor(() => {
//       expect(screen.getByText('https://example.com')).toBeInTheDocument();
//       expect(screen.getByText('2025-07-28 14:32')).toBeInTheDocument();
//       expect(screen.getByText('3')).toBeInTheDocument();
//       expect(screen.getByText('Vulnerable')).toBeInTheDocument();

//       expect(screen.getByText('https://secure-site.com')).toBeInTheDocument();
//       expect(screen.getByText('2025-07-27 10:12')).toBeInTheDocument();
//       expect(screen.getByText('0')).toBeInTheDocument();
//       expect(screen.getByText('Secure')).toBeInTheDocument();
//     });
//   });

//   test('view details button reveals scan explanation', async () => {
//     render(<ResultsPage />);

//     await waitFor(() => {
//       const rows = screen.getAllByRole('row');
//       expect(rows.length).toBe(mockScans.length + 1); // +1 for header
//     });

//     // Add a "View Details" button to each row in the component for this test
//     // We simulate a click on the first row
//     const viewButtons = screen.getAllByRole('button', { name: /view details/i });
//     expect(viewButtons.length).toBe(mockScans.length);

//     fireEvent.click(viewButtons[0]);

//     await waitFor(() => {
//       expect(screen.getByText(/Missing headers and SQLi detected/i)).toBeInTheDocument();
//     });
//   });
// });
