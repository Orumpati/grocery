import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
SignupForm:any
  constructor(   public formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private router:Router
    ) { }

  ngOnInit() {

    this.SignupForm = this.formBuilder.group({
      Fullname: ['', [Validators.required, Validators.pattern('[a-z A-Z]+$')]],
      mobile: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
      Email: ['', [Validators.required, Validators.email]],

      Message: new FormControl('congratulations your signup successfully!!'),
    });
  }


  async signupSubmit() {

 
 

    var signupdata = {
      Fullname: this.SignupForm.value.Fullname,
      mobile: this.SignupForm.value.mobile,
      Email: this.SignupForm.value.Email,
     
    
      Message: 'congratulations your signup successfully!!',
    };
    console.log(signupdata);

    if (!this.SignupForm.valid || !signupdata) {
    alert(
        'Please provide all the required values!',
     
      );
    } else {
      const loading = await this.loadingController.create({
        message: 'Loading...',
        spinner: 'crescent',
      });
      await loading.present();
      fetch(
        'http://localhost:1500/registerroute/addsignupdetails',
        {
          method: 'post',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(signupdata),
        }
      )
        .then((res) => res.json())
        .then((result) => {
          
          console.log(result);

          if (result.status == 'success') {
            loading.dismiss();
            localStorage.setItem(
              'userNo',
              JSON.stringify(this.SignupForm.value.mobile)
            );

            alert(
              'Register Successfully',
           
            );
            this.router.navigate(['/loginpage']);
          } else if (result.status == 'failed') {
            loading.dismiss();
            alert(
              'User Already Existed',
          
            );
            this.router.navigate(['/loginpage']);
          } else if (result.status == 'faileds') {
            loading.dismiss();
            alert(
              'Something Went Wrong',
             
            );
          }
        })
        .catch((err) => {
          loading.dismiss();
          console.log(err);
        });
    }
  }

}
