export type LoanPaymentsData = {
  id: number;
  loanId: number;
  paymentDate: string;
};

export type PaymentStatusesData = {
  id: number;
  label: string;
  severity: string;
};

export type ExistingLoansData = {
  id: number;
  name: string;
  interestRate: number;
  principal: number;
  dueDate: string;
  paymentDate: string;
  status: string;
};
