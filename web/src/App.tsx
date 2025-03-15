import '@/App.scss';
import { gql, useQuery } from '@apollo/client';

import AddNewPayment from '@/components/AddNewPayment';
import ExistingLoans from '@/components/ExistingLoans';
import { ExistingLoansData } from '@/types/loans';

export default function App() {
  const GET_LOANS = gql`
    query GetLoans {
      loans {
        id
        name
        interestRate
        principal
        dueDate
        paymentDate
        status
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery<{ loans: ExistingLoansData[] }>(GET_LOANS);
  async function handleAddPayment(loanId: string, paymentDate: string) {
    const response = await fetch('http://localhost:2024/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        loan_id: loanId,
        payment_date: paymentDate
      })
    });

    await response.json();

    refetch();
  }
  return (
    <div className="container flex flex-col mx-auto p-4 gap-3">
      <h1 className="text-3xl font-bold">Existing Loans & Payments</h1>
      <ExistingLoans loading={loading} error={error} data={data} />
      <h1 className="text-3xl font-bold">Add New Payment</h1>
      <AddNewPayment onAddPayment={handleAddPayment} />
    </div>
  );
}
