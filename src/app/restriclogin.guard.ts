import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestrictloginGuard implements CanActivate {
  logindata: any;
  constructor( private router :Router){
  
    this.logindata=  JSON.parse(localStorage.getItem('logindata')|| '{}')
    console.log(this.logindata)
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  
  //     if(this.service.isloggedIn() && this.logindata.Role == 'User' ){
  //       this.router.navigate(['tabs/tab1'])
  //  return true
  //        }else if( this.service.isloggedIn() && this.logindata.userRole == 'Bussiness'){
  //       this.router.navigate(['tabs/admin-addrestuarent'])
        
  //       return true
       
  //     }else{
  //       this.router.navigate(['login'])
  //       return false
  //     }
      
  //   } 
 
      if(this.logindata.mobile === null || this.logindata.mobile === undefined ||this.logindata.mobile === ''){
        this.router.navigate(['loginpage'])
    
        return false
        
        
       
      }else {
        this.router.navigate(['/tabs/tab1'])
      
        return true
       
      }
      
      // else if(this.logindata.Role === 'Bussiness'){
      //   this.router.navigate(['/tabs/admin-addrestuarent'])
      
      //   return true
       
      // } else if(this.logindata.Role === 'SuperAdmin'){
      //   this.router.navigate(['/tabs/requests'])
      
      //   return true
      // }
         return true;
         }
      }

  

