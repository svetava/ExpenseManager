import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HeaderComponent } from './app/header/header';
import { ExpenseFormComponent } from "./app/expense-form/expense-form";
import { ExpenseComponent } from "./app/expense/expense";

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
bootstrapApplication(HeaderComponent).catch((err) => console.error(err));
bootstrapApplication(ExpenseFormComponent).catch((err) => console.error(err));
bootstrapApplication(ExpenseComponent).catch((err) => console.error(err));
