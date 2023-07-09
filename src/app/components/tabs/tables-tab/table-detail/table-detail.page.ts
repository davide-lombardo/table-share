import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'src/app/models/interfaces/table.model';

@Component({
  selector: 'app-table-detail',
  templateUrl: 'table-detail.page.html',
  styleUrls: ['table-detail.page.scss'],
})
export class TableDetailPage implements OnInit {
  table: Table | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getTableData();
  }

  private getTableData(): void {
    this.route.queryParams.subscribe((params) => {
      this.table = JSON.parse(params['table']);
    });
  }

  public getPlaceholderParticipantsArray(): number[] {
    const count = this.getPlaceholderParticipantsCount();
    return Array(count).fill(0);
  }

  private getPlaceholderParticipantsCount(): number {
    if (this.table) {
      const actualParticipantsCount =
        this.table.participantsMetadata?.length ?? 0;
      return (this.table.totalSeats ?? 0) - actualParticipantsCount;
    }
    return 0;
  }

}
