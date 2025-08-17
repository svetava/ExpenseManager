export interface Expense {
    id: string;
    title: string;
    amount: number;
    date: string;
    note: string
}

export interface ExpenseFormData {
    title: string;
    date: string;
    amount: number;
    note: string;
}