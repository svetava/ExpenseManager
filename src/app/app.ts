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
  selectedExpenseId?: string;
  private expenseServise = inject(ExpenseService);

  get selectedExpense() {
    return this.expenseServise.getExpense(this.selectedExpenseId);
  }

  get expenses(): Expense[] {
    return this.expenseServise.getAllExpenses()
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  get expensesSum() {
    return this.expenseServise.getExpensesSum();
  }

  get isAddingExpense() {
    return this.expenseServise.getIsAddingExpense();
  }

  onSelectExpense(id: string) {
    this.selectedExpenseId = id;
  }

  onCliclAddExpense() {
    this.expenseServise.setIsAddingExpense(true);
  }

  onCancelButtonClick() {
    this.expenseServise.setIsAddingExpense(false);
  }
}
