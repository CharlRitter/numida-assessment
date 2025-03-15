import '@/App.scss'

const AddNewPayment = () => {
    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <p>
                    <label className='mr-1'>Payment Loan Id</label>
                    <input name="loan-id" onChange={() => {}} />
                </p>

                <p>
                    <label className='mr-1'>Payment Amount</label>
                    <input
                        name="payment-amount"
                        type="number"
                        onChange={() => {}}
                    />
                </p>
                <p>
                    <button type="submit">Add Payment</button>
                </p>
            </form>
        </div>
    )
}

function App() {
    return (
        <>
            <div>
                <h1>Existing Loans & Payments</h1>
                <ul></ul>

                <h1>Add New Payment</h1>
                <AddNewPayment />
            </div>
        </>
    )
}

export default App
