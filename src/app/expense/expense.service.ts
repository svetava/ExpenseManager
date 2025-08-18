import { Injectable } from "@angular/core";
import { Expense, ExpenseFormData } from "./expense.model";

@Injectable({ providedIn: 'root' })
export class ExpenseService {
    private expenses: Expense[] = [];
    private isAddingExpense = false;

    getAllExpenses() {
        return this.expenses;
    }

    getExpense(selectedExpenseId: string | undefined) {
        return this.expenses.find((expense) => expense.id === selectedExpenseId);
    }

    addExpense(expenseData: ExpenseFormData) {
        this.expenses.push({
            id: new Date().getTime().toString(),
            title: expenseData.title,
            amount: expenseData.amount,
            date: expenseData.date,
            note: expenseData.note
        });
    }

    removeExpense(id: string) {
        this.expenses = this.expenses.filter((expense) => expense.id !== id);
    }

    getExpensesSum() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return this.expenses
            .filter(expense => {
                const date = new Date(expense.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, expense) => sum + expense.amount, 0);
    }

    getIsAddingExpense() {
        return this.isAddingExpense;
    }

    setIsAddingExpense(isAdding: boolean) {
        this.isAddingExpense = isAdding;
    }
}