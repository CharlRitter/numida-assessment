import '@/App.scss';
import AddNewPayment from '@/components/AddNewPayment';

export default function App() {
  return (
    <>
      <div>
        <h1>Existing Loans & Payments</h1>
        <ul></ul>

        <h1>Add New Payment</h1>
        <AddNewPayment />
      </div>
    </>
  );
}
