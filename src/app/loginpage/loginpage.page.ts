import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgZone, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, Platform, ToastController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/auth';
import 'firebase/compat/firestore';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { OtpLoginPage } from '../otp-login/otp-login.page';


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
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],


})
export class LoginpagePage implements OnInit {
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '45px',
      height: '45px',
    },
  };
  mobile1: any;
  reCaptchaVerifier: any
  saiReddy:any;
  constructor(private modelController:ModalController,
    private loadingController:LoadingController,
    private router:Router
    ) { }

  ngOnInit() {
    firebase.initializeApp(config);
    this.saiReddy = '+91';
   // this.showModel();
  }


  async getOtp() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      spinner: 'crescent',
    });
    await loading.present();
    var data = {
      mobile: this.mobile1,
    };
console.log(data)
    fetch('http://localhost:1500/registerroute/getsignup', {
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())

      .then(async (result) => {
        console.log(result);

        if (result.message === 'failed') {
          loading.dismiss();
          alert(
            "Sorry, You don't have an account please signup",
         
          );
           this.router.navigate(['register']);
        } else if (result.userProfile.mobile === this.mobile1) {
          loading.dismiss();
      
          this.reCaptchaVerifier = new firebase.auth.RecaptchaVerifier(
            'sign-in-button',
            {
              size: 'invisible',
            }
          );

          firebase
            .auth()
            .signInWithPhoneNumber(
              this.saiReddy + this.mobile1,
              this.reCaptchaVerifier 
            )
            .then((confirmationResult: any) => {
              this.router.navigate(['otp-login'])
              localStorage.setItem(
                'verificationId',
                JSON.stringify(confirmationResult.verificationId)
              );
              localStorage.setItem('mobileNo', JSON.stringify(this.mobile1));
           
              localStorage.setItem(
                'logindetails',
                JSON.stringify(result.userProfile)
              );
            
          
              const recapcga = document.getElementById('sign-in-button');
              if (recapcga) {
                recapcga.parentNode!.removeChild(recapcga);
              }
            })
            .catch((error: any) => {
              loading.dismiss();

              alert(error.message);
            });
        } else if (result.message == 'error') {
          alert(
            'Failed to login',
          
          );
        }
      })
      .catch(async (error) => {
        loading.dismiss();
        alert(
          'Failed to login',
      
        );
        console.log(error);
      });
  }


  // async showModel() {
  //   let model = await this.modelController.create({
  //     component: OtpLoginPage,
  //     cssClass: 'alert-model',
  //   });
  //   await model.present();
  // }
}
