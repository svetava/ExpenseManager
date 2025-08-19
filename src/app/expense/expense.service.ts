import { Injectable } from "@angular/core";
import { Expense } from "./expense.model";

@Injectable({ providedIn: 'root' })
export class ExpenseService {
    private expenses: Expense[] = [];
    private selectedExpense: Expense = {
        id: new Date().getTime().toString(),
        title: '',
        amount: 0,
        date: new Date().toDateString(),
        note: ''
    };
    private isAddingExpense = false;
    private isEditMode = false;

    getAllExpenses() {
        return this.expenses;
    }

    getExpense(selectedExpenseId: string | undefined) {
        return this.expenses.find((expense) => expense.id === selectedExpenseId);
    }

    addExpense(expenseData: Expense) {
        this.expenses.push({
            id: expenseData.id,
            title: expenseData.title,
            amount: expenseData.amount,
            date: expenseData.date,
            note: expenseData.note
        });
    }

    removeExpense(id: string) {
        this.expenses = this.expenses.filter((expense) => expense.id !== id);
    }

    getExpensesMonthSum() {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        return this.expenses
            .filter(expense => {
                const date = new Date(expense.date);
                return date >= startOfMonth && date <= endOfMonth;
            })
            .reduce((sum, expense) => sum + expense.amount, 0);
    }

    getExpensesTotal() {
        return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }

    getIsAddingExpense() {
        return this.isAddingExpense;
    }

    setIsAddingExpense(isAdding: boolean) {
        this.isAddingExpense = isAdding;
    }

    getIsEditMode() {
        return this.isEditMode;
    }

    setIsEditMode(isEditMode: boolean) {
        this.isEditMode = isEditMode;
    }

    getSelectedExpense() {
        return this.selectedExpense;
    }

    setSelectedExpense(expense: Expense) {
        this.selectedExpense = expense;
    }
}