import { FormEvent, useState } from 'react';

import Spinner from '@/components/Spinner';

export type AddNewPaymentProps = {
  onAddPayment: (loanId: string, paymentDate: string) => void;
};

export default function AddNewPayment(props: AddNewPaymentProps) {
  const { onAddPayment } = props;
  const [loanId, setLoanId] = useState<string>('');
  const [paymentDate, setPaymentDate] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');

    if (!loanId.trim() || isNaN(Number(loanId))) {
      setErrorMessage('Loan Id must be a valid Id number.');
      return;
    }

    setIsSubmitting(true);

    try {
      await onAddPayment(loanId, paymentDate);
      setLoanId('');
      setPaymentDate('');
    } catch {
      setErrorMessage('Error adding payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-4">
      <div className="max-w-md mx-auto p-4 border border-gray-300 rounded shadow">
        {errorMessage && (
          <div id="error-message" className="mb-4 text-center text-red-600 border border-red-400 bg-red-100 rounded p-2">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {isSubmitting ? (
            <div className="flex items-center justify-center min-h-[150px]">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center">
                <label htmlFor="loan-id" className="mr-2 font-medium w-40">
                  Payment Loan Id:
                </label>
                <input
                  id="loan-id"
                  name="loan-id"
                  type="text"
                  value={loanId}
                  onChange={(event) => setLoanId(event.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Loan Id"
                  required
                />
              </div>
              <div className="mb-4 flex items-center">
                <label htmlFor="payment-date" className="mr-2 font-medium w-40">
                  Payment Date:
                </label>
                <input
                  id="payment-date"
                  name="payment-date"
                  type="date"
                  value={paymentDate}
                  onChange={(event) => setPaymentDate(event.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={!loanId || !paymentDate || isSubmitting}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Add Payment'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
