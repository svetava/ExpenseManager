import { Expense, ExpenseFormData } from "./expense.model";

export class ExpensesService {
    expenses: Expense[] = [];

    getExpense(selectedExpenseId: string) {
        return this.expenses.find((expense) => expense.id === selectedExpenseId);
    }

    addExpense(expenseData: ExpenseFormData) { }
}