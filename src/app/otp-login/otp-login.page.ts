import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/auth';
import 'firebase/compat/firestore';
import { NgZone, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';


var config = {
  apiKey: 'AIzaSyDM4C1YRZ14Lx_8NzbDnChklv9VInrgUmw',
  authDomain: 'otplogin-c4da2.firebaseapp.com',
  projectId: 'otplogin-c4da2',
  storageBucket: 'otplogin-c4da2.appspot.com',
  messagingSenderId: '783500853422',
  appId: '1:783500853422:web:9b813df9ba59a87c31ad3f',
  measurementId: 'G-69272HMPPD',
};
@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.page.html',
  styleUrls: ['./otp-login.page.scss'],
})
export class OtpLoginPage implements OnInit {
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '35px',
      height: '35px',
      containerClass: 'all_inputs',
    },
  };
  verify: any;
  otp:any
  constructor(private loadingController:LoadingController,
    private router:Router,
    private ngZone:NgZone

    
    ) { }

  ngOnInit() {
    firebase.initializeApp(config);
  }

  onOtpChange(otp: string) {
    this.otp = otp;
    console.log(this.otp);
  }
  
  async onSubmit() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent',
    });
    loading.present();
    this.verify = JSON.parse(localStorage.getItem('verificationId') || '{}');

    var credential = firebase.auth.PhoneAuthProvider.credential(
      this.verify,
      this.otp
    );

    console.log(credential);
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((response: any) => {
        console.log(response);
        localStorage.setItem('user_data', JSON.stringify(response));
        this.ngZone.run(() => {
          setTimeout(() => {
            var logs = JSON.parse(localStorage.getItem('logindetails') || '{}');

            loading.dismiss();
        
            localStorage.setItem('logindata', JSON.stringify(logs));
          
              this.router.navigate(['/tabs/tab1']);
          
          }, 2000);
        });
      })
      .catch((error: { message: any }) => {
        console.log(error);

        alert('Invalid OTP');
        loading.dismiss();
      });
  }

}
