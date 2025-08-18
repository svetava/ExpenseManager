import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../expense/expense.service';

@Component({
  selector: 'app-expense-form',
  imports: [FormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css'
})
export class ExpenseFormComponent {
  /*@Input({ required: true }) title: string | undefined;*/
  @Output() close = new EventEmitter<void>();
  // @Output() add = new EventEmitter<ExpenseFormData>();

  private expenseServise = inject(ExpenseService);

  enteredTitle = '';
  enteredAmount = 0;
  enteredDate = '';
  enteredNote = '';

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    this.expenseServise.addExpense({
      title: this.enteredTitle,
      date: this.enteredDate,
      amount: this.enteredAmount,
      note: this.enteredNote
    })
    this.close.emit();
  }
}