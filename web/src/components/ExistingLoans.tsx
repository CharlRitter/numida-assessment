import LoanCalculator from '@/components/LoanCalculator';
import Spinner from '@/components/Spinner';
import { ExistingLoansData } from '@/types/loans';

export type ExistingLoansProps = {
  loading: boolean;
  error?: { message: string };
  data?: { loans: ExistingLoansData[] };
};
export default function ExistingLoans(props: ExistingLoansProps) {
  const { loading, error, data } = props;
  const { loans } = data ?? { loans: [] };
  let tableBody = <></>;

  if (loading) {
    tableBody = (
      <tr>
        <td colSpan={8} className="p-4">
          <div className="min-h-[150px] min-w-[950px] flex items-center justify-center">
            <Spinner />
          </div>
        </td>
      </tr>
    );
  } else if (error) {
    tableBody = (
      <tr>
        <td colSpan={8} className="p-4 text-center">
          <p>Error loading loans: {error.message}</p>
        </td>
      </tr>
    );
  } else if (loans.length === 0) {
    tableBody = (
      <tr>
        <td colSpan={8} className="p-4 text-center">
          <p>No loans found</p>
        </td>
      </tr>
    );
  } else {
    tableBody = loans.map((loan: ExistingLoansData) => (
      <tr key={loan.id} className="text-center">
        <td className="border border-gray-300 px-4 py-2">{loan.id}</td>
        <td className="border border-gray-300 px-4 py-2">{loan.name}</td>
        <td className="border border-gray-300 px-4 py-2">{loan.interestRate}%</td>
        <td className="border border-gray-300 px-4 py-2">R{loan.principal.toLocaleString()}</td>
        <td className="border border-gray-300 px-4 py-2">{loan.dueDate}</td>
        <td className="border border-gray-300 px-4 py-2">{loan.paymentDate ?? '-'}</td>
        <td className="border border-gray-300 px-4 py-2">
          <span>{loan.status}</span>
          <span
            className={`ml-2 inline-block rounded-full px-2 py-1 ${
              loan.status === 'On Time'
                ? 'bg-green-100'
                : loan.status === 'Late'
                  ? 'bg-orange-100'
                  : loan.status === 'Defaulted'
                    ? 'bg-red-100'
                    : 'bg-gray-100'
            }`}
          ></span>
        </td>
        <td className="border border-gray-300 px-4 py-2">
          <LoanCalculator
            principal={loan.principal}
            rate={loan.interestRate}
            months={calculateMonths(loan.paymentDate, loan.dueDate)}
          />
        </td>
      </tr>
    ));
  }

  function calculateMonths(paymentDate: string, dueDate: string): number {
    const start = new Date(dueDate);
    const end = paymentDate ? new Date(paymentDate) : new Date();

    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth();

    // Adjust if the due day is before the commencement day
    if (end.getDate() < start.getDate()) {
      months--;
    }
    return months > 0 ? months : 0;
  }

  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Interest Rate</th>
            <th className="border border-gray-300 px-4 py-2">Principal</th>
            <th className="border border-gray-300 px-4 py-2">Due Date</th>
            <th className="border border-gray-300 px-4 py-2">Payment Date</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Loan Interest</th>
          </tr>
        </thead>
        <tbody>{tableBody}</tbody>
      </table>
    </div>
  );
}
