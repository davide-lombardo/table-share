import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase/auth';
import { JoinTableRequestDto } from 'src/app/models/interfaces/requests/JoinTableRequestDto';
import { Table } from 'src/app/models/interfaces/table.model';
import { AuthenticationService } from 'src/app/services/auth.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-table-detail',
  templateUrl: 'table-detail.page.html',
  styleUrls: ['table-detail.page.scss'],
})
export class TableDetailPage implements OnInit {
  table: Table | undefined;
  user: User | null;
  hasUserJoined = false;

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService,
    private authService: AuthenticationService
  ) {
    this.user = this.authService.getLoggedUser();
  }

  ngOnInit(): void {
    this.getTableData();
  }

  private getTableData(): void {
    this.route.queryParams.subscribe((params) => {
      this.table = JSON.parse(params['table']);
    });
  }

  public joinTable(): void {
    this.authService.getAvatarById(this.user?.uid).subscribe((value: any) => {
      const request: JoinTableRequestDto = {
        id: this.user?.uid,
        username: this.user?.displayName,
        avatarUrl: value['imageUrl'],
      };

      this.tableService.joinTable(this.table?.id, request);
      this.hasUserJoined = true;
    });
  }
}
