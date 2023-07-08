import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/interfaces/table.model';

@Component({
  selector: 'app-table-detail',
  templateUrl: 'table-detail.page.html',
  styleUrls: ['table-detail.page.scss'],
})
export class TableDetailPage implements OnInit {
  table!: Table;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      // Assuming the table data is passed as a query parameter named 'table'
      this.table = params['table'];
    });
  }
}
