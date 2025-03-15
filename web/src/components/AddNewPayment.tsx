import { FormEvent } from "react";

export default function AddNewPayment() {
  return (
    <div>
      <form
        onSubmit={(event:FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            console.log(event.currentTarget['loan-id'].value)
            console.log(event.currentTarget['payment-amount'].value);
        }}
      >
        <p>
          <label className="mr-2">Payment Loan Id</label>
          <input name="loan-id" />
        </p>

        <p>
          <label className="mr-2">Payment Amount</label>
          <input name="payment-amount" type="number" />
        </p>
        <p>
          <button type="submit">Add Payment</button>
        </p>
      </form>
    </div>
  );
}
