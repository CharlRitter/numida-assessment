import { useEffect, useState } from 'react';

export type LoanCalculatorProps = { principal: number; rate: number; months: number };

export default function LoanCalculator(props: LoanCalculatorProps) {
  const { principal, rate, months } = props;
  const [interest, setInterest] = useState<number>(0);

  useEffect(() => {
    setInterest((principal * rate * months) / 100);
  }, []);

  return <p>{interest}</p>;
}
