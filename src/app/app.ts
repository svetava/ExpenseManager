import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common'
import { HeaderComponent } from "./header/header";
import { ExpenseFormComponent } from "./expense-form/expense-form";
import { ExpenseComponent } from "./expense/expense";
import { Expense } from './expense/expense.model';
import { Card } from "./common/card/card";
import { ExpenseService } from './expense/expense.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ExpenseComponent, ExpenseFormComponent, Card, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  private expenseServise = inject(ExpenseService);

  get selectedExpenseId() {
    return this.expenseServise.getSelectedExpense().id;
  }

  get expenses(): Expense[] {
    return this.expenseServise.getAllExpenses()
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  get expensesMonthSum() {
    return this.expenseServise.getExpensesMonthSum();
  }

  get expensesTotal() {
    return this.expenseServise.getExpensesTotal();
  }

  get isAddingExpense() {
    return this.expenseServise.getIsAddingExpense();
  }

  onCliclAddExpense() {
    this.expenseServise.setIsAddingExpense(true);
  }
}