import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common'
import { Expense } from './expense.model';
import { Card } from "../common/card/card";

@Component({
  selector: 'app-expense',
  templateUrl: './expense.html',
  styleUrl: './expense.css',
  imports: [Card, DatePipe]
})

export class ExpenseComponent {
  @Input({ required: true }) expense!: Expense;
  @Input({ required: true }) isSelected!: boolean;
  @Output() selectExpense = new EventEmitter();

  onSelectExpense() {
    this.selectExpense.emit(this.expense.id);
  }
}