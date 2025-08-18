import { Component, EventEmitter, Output, inject, afterNextRender, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ExpenseService } from '../expense/expense.service';

@Component({
  selector: 'app-expense-form',
  imports: [FormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css'
})

export class ExpenseFormComponent {
  @Output() close = new EventEmitter<void>();
  private form = viewChild.required<NgForm>('form');
  private expenseServise = inject(ExpenseService);
  private selectedExpense = this.expenseServise.getSelectedExpense();

  isEditMode = this.expenseServise.getIsEditMode();

  constructor() {
    afterNextRender(() => {
      if (this.isEditMode) {
        setTimeout(() => {
          this.form().setValue({
            id: this.selectedExpense.id,
            title: this.selectedExpense.title,
            date: this.selectedExpense.date,
            amount: this.selectedExpense.amount,
            note: this.selectedExpense.note
          })
        }, 1);
      }
    });
  }

  onSubmit(formData: NgForm) {
    if (!this.isEditMode) {
      this.expenseServise.addExpense({
        id: new Date().getTime().toString(),
        title: formData.form.value.title,
        date: formData.form.value.date,
        amount: formData.form.value.amount,
        note: formData.form.value.note
      })
    }
    else {
      let selectedExpense = this.expenseServise.getSelectedExpense();
      selectedExpense.title = formData.form.value.title;
      selectedExpense.date = formData.form.value.date;
      selectedExpense.amount = formData.form.value.amount;
      selectedExpense.note = formData.form.value.note;
    }

    this.expenseServise.setIsEditMode(false);
    this.expenseServise.setIsAddingExpense(false);
    this.close.emit();
  }

  onCancel() {
    this.expenseServise.setIsEditMode(false);
    this.expenseServise.setIsAddingExpense(false);
    this.close.emit();
  }
}