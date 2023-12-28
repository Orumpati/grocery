import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgOtpInputModule } from  'ng-otp-input';
import { OtpLoginPageRoutingModule } from './otp-login-routing.module';

import { OtpLoginPage } from './otp-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtpLoginPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [OtpLoginPage]
})
export class OtpLoginPageModule {}
