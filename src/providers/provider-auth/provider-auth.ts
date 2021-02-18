import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProviderAuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProviderAuthProvider {

  constructor(public http: HttpClient) {
  }
login(userdata){
  const body=userdata;
  return this.http.post('https://themindfulminuteapp.com/wp-json/jwt-auth/v1/token', body)
}
singup(userdata){
  const body=userdata;
  return this.http.post('https://themindfulminuteapp.com/wp-json/mobileapi/v1/register',body)
}
forgetpassword(email){
  const body=email
return this.http.post('https://themindfulminuteapp.com/wp-json/mobileapi/v1/retrieve_password', body)
}
}
