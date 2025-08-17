import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseFormData } from '../expense/expense.model';

@Component({
  selector: 'app-expense-form',
  imports: [FormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css'
})
export class ExpenseFormComponent {
  /*@Input({ required: true }) title: string | undefined;*/
  @Output() cancel = new EventEmitter<void>();
  @Output() add = new EventEmitter<ExpenseFormData>();

  enteredTitle = '';
  enteredAmount = 0;
  enteredDate = '';
  enteredNote = '';

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.add.emit({
      title: this.enteredTitle,
      date: this.enteredDate,
      amount: this.enteredAmount,
      note: this.enteredNote
    })
  }
}