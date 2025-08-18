import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common'
import { Expense } from './expense.model';
import { Card } from "../common/card/card";
import { ExpenseService } from './expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.html',
  styleUrl: './expense.css',
  imports: [Card, DatePipe, CurrencyPipe]
})

export class ExpenseComponent {
  @Input({ required: true }) expense!: Expense;
  @Input({ required: true }) isSelected!: boolean;
  @Output() selectExpense = new EventEmitter();
  private expenseServise = inject(ExpenseService);

  onSelectExpense() {
    this.selectExpense.emit(this.expense.id);
    this.expenseServise.setIsAddingExpense(true);
  }

  onDeleteButtonClick() {
    this.expenseServise.removeExpense(this.expense.id);
  }
}