import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ExpenseService } from '../expense/expense.service';

function mustBeGratterThenNull(control: AbstractControl) {
  if (control.value > 0) return null;
  return { notGreaterThanZero: true };
}

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.css'
})

export class ExpenseFormComponent {
  @Output() close = new EventEmitter<void>();
  private expenseServise = inject(ExpenseService);
  private selectedExpense = this.expenseServise.getSelectedExpense();
  isEditMode = this.expenseServise.getIsEditMode();
  isFormInvalid = false;

  form = new FormGroup({
    id: new FormControl(new Date().getTime().toString(),),
    title: new FormControl('', {
      validators: [Validators.required]
    }),
    date: new FormControl('', {
      validators: [Validators.required]
    }),
    amount: new FormControl(0, {
      validators: [Validators.required, mustBeGratterThenNull]
    }),
    note: new FormControl(''),
  });

  get formIsInvalid() {
    return this.form.controls.title.invalid;
  }

  ngOnInit() {
    if (this.isEditMode) {
      this.form.setValue({
        id: this.selectedExpense.id,
        title: this.selectedExpense.title,
        date: this.selectedExpense.date,
        amount: this.selectedExpense.amount,
        note: this.selectedExpense.note
      })
    }
  }

  onSubmit() {
    if (this.form.controls.title.invalid || this.form.controls.date.invalid || this.form.controls.amount.invalid) {
      this.isFormInvalid = true;
      return;
    }

    if (!this.isEditMode) {
      this.expenseServise.addExpense({
        id: new Date().getTime().toString(),
        title: this.form.value.title ?? "",
        date: this.form.value.date ?? new Date().getTime().toString(),
        amount: this.form.value.amount ?? 0,
        note: this.form.value.note ?? ""
      })
    }
    else {
      let selectedExpense = this.expenseServise.getSelectedExpense();
      selectedExpense.title = this.form.value.title ?? "";
      selectedExpense.date = this.form.value.date ?? new Date().getTime().toString();
      selectedExpense.amount = this.form.value.amount ?? 0;
      selectedExpense.note = this.form.value.note ?? "";
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