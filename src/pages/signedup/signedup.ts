import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LoginPage} from "../login/login";
import {ProviderAuthProvider} from "../../providers/provider-auth/provider-auth"
/**
 * Generated class for the SignedupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signedup',
  templateUrl: 'signedup.html',
})
export class SignedupPage {

  confirm_pass: AbstractControl;
  mpassword: AbstractControl;
  confirmpassword: AbstractControl;
  value = false;
  email: AbstractControl;
  username: AbstractControl;
  name: AbstractControl;
  formgroup: FormGroup;

  loader: any;

  constructor(public loadingController: LoadingController,public authProvider:ProviderAuthProvider,public navCtrl: NavController, public formbuilder: FormBuilder, public navParams: NavParams, public http: HttpClient, public toastController: ToastController) {
    this.initFormGroup()

  }

  private initFormGroup() {
    this.formgroup = this.formbuilder.group({
      confirm_pass: ['', Validators.required],
      mpassword: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      name: ['', Validators.required],

    });
    this.confirm_pass = this.formgroup.controls['confirm_pass'];
    this.mpassword = this.formgroup.controls['mpassword'];
    this.email = this.formgroup.controls['email'];
    this.username = this.formgroup.controls['username'];
    this.name = this.formgroup.controls['name'];

  }

  getItems(ev: any) {
    this.mpassword = ev.target.value;
  }

  getCpass(ev: any) {
    console.log(" ev.target.value " + this.mpassword.value + " " + ev.target.value);
    this.value = ev.target.value !== this.mpassword.value;
  }

  onSignup() {
    this.navCtrl.push(LoginPage);
  }

  register(data) {
   console.log(data)
    this.showProgress();

    const body = {
      username: data.username,
      first_name: data.name,
      email: data.email,
      password: data.mpassword
      };
    this.authProvider.singup(body).subscribe((res)=> {
        this.presentToastWithOptions('Register successful');
        this.navCtrl.push(LoginPage);
        this.loader.dismiss();
       
    }, (err) => {
      console.log(err.error.errormsg);
      alert(err.error.errormsg)
      this.loader.dismiss();
       });
    // this.http.post('https://themindfulminuteapp.com/wp-json/mobileapi/v1/register',body).subscribe(res => {
    //   if (res) {
    //     this.presentToastWithOptions('Register successful');
    //     this.navCtrl.push(LoginPage);
    //     this.loader.dismiss();
    //   } else {
    //     this.presentToastWithOptions(' Something wrong');
    //     this.loader.dismiss();
    //   }
    // }, (err) => {
    //   console.log(err);
    //   alert('Something wrong')
    //   this.loader.dismiss();
    // });
  }

  async presentToastWithOptions(mess) {
    const toast = await this.toastController.create({
      message: mess,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }




  async showProgress() {
    this.loader = this.loadingController.create({
      content: "Please Wait.."
    });

    this.loader.present();

  }

}
