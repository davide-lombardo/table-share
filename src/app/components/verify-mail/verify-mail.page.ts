import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
@Component({
  selector: 'app-verify-mail',
  templateUrl: './verify-mail.page.html',
  styleUrls: ['./verify-mail.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  constructor(public authService: AuthenticationService) {}

  ngOnInit() {}
}
