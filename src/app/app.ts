import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header";
import { ExpenseFormComponent } from "./expense-form/expense-form";
import { ExpenseComponent } from "./expense/expense";
import { DUMMY_EXPENSES } from './dummy-expense';
import { Expense, ExpenseFormData } from './expense/expense.model';
import { Card } from "./common/card/card";

@Component({
  selector: 'app-root',
  imports: [/*RouterOutlet,*/ HeaderComponent, ExpenseComponent, ExpenseFormComponent, Card],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('expense-manager-app');
  // expenses = DUMMY_EXPENSES;
  expenses: Expense[] = [];
  selectedExpenseId?: string;
  isAddingExpense = false;

  get selectedExpense() {
    return this.expenses.find((expense) => expense.id === this.selectedExpenseId);
  }

  onSelectExpense(id: string) {
    this.selectedExpenseId = id;
  }

  onCliclAddExpense() {
    this.isAddingExpense = true;
  }

  onCancelButtonClick() {
    this.isAddingExpense = false;
  }

  onCreateNewExpense(expensesData: ExpenseFormData) {
    this.expenses.push({
      id: new Date().getTime().toString(),
      title: expensesData.title,
      amount: expensesData.amount,
      date: expensesData.date,
      note: expensesData.note
    });
    this.isAddingExpense = false;
  }
}
