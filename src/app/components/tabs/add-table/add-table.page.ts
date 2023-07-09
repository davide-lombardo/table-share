import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-add-table',
  templateUrl: './add-table.page.html',
  styleUrls: ['./add-table.page.scss'],
})
export class AddTablePage {
  tableForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private tableService: TableService,
    private router: Router
  ) {
    this.tableForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      // Add other form fields as per your table model
    });
  }

  onSubmit() {
    if (this.tableForm.invalid) {
      return;
    }

    // Create the new table event using the tableService
    const tableData = this.tableForm.value;
    this.tableService.createTable(tableData).then(() => {
      // Redirect the user to the table list page
      this.router.navigate(['/tabs/tables-tab']);
    });
  }
}
