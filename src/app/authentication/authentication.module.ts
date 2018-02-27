import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AuthenticationService } from './authentication.service';
import { FormsModule } from '@angular/forms';
import { MyMaterialComponentsModule } from '../my-material-components/my-material-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyMaterialComponentsModule,
  ],
  declarations: [LoginDialogComponent],
  providers: [AuthenticationService]
})
export class AuthenticationModule { }
