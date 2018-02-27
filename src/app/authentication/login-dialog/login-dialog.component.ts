import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { timeout } from 'q';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  userid :string = '';
  password :string = '';

  hide: boolean = true;
  loadingSpinner: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthenticationService
    ) {
    }
    ngOnInit() {
    }

  login(): void {
    this.loadingSpinner=true;
    this.authService.login(this.userid,this.password).then(
      resp=> {
        this.dialogRef.close();
      }
    );
    /* setTimeout(() => {
      this.dialogRef.close();
    }, 2000); */
  }
}
