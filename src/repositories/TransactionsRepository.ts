import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncome = this.transactions.reduce((total, transaction) => {
      return transaction.type === 'income' ? total + transaction.value : total;
    }, 0);

    const sumOutcome = this.transactions.reduce((total, transaction) => {
      return transaction.type === 'outcome' ? total + transaction.value : total;
    }, 0);

    const totalBalance = sumIncome - sumOutcome;

    const balance = {
      income: sumIncome,
      outcome: sumOutcome,
      total: totalBalance,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, value, type });

    this.transactions.push(newTransaction);

    return newTransaction;
  }
}

export default TransactionsRepository;
