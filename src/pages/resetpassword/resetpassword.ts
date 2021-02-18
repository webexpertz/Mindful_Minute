import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {SignedupPage} from "../signedup/signedup";
import {LoginPage} from '../../pages/login/login';
import { ProviderAuthProvider } from "../../providers/provider-auth/provider-auth"
/**
 * Generated class for the ResetpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resetpassword',
  templateUrl: 'resetpassword.html',
})
export class ResetpasswordPage {

  email: AbstractControl;
  formgroup: FormGroup;
  loader: any;

  constructor(public loadingController: LoadingController, private authProvider: ProviderAuthProvider,public http: HttpClient, public formbuilder: FormBuilder, public toastController: ToastController, public navCtrl: NavController) {
    this.initFormGroup()
  }

  private initFormGroup() {
    this.formgroup = this.formbuilder.group({
      email: ['', Validators.required],

    });
    this.email = this.formgroup.controls['email'];

  }

  onSignup() {
    this.navCtrl.push(SignedupPage);
  }

  login(data) {

    this.showProgress();

    console.log(data.formremember + " " + JSON.stringify(data));

    const body = {user_login: data.email};
this.authProvider.forgetpassword(body).subscribe(res => {
       console.log(res);
      if (res) {
        if (data.formremember) {
          console.log("in if");
          localStorage.setItem('is_remember', data.formremember);
          this.presentToastWithOptions('Please check your email');
          this.navCtrl.setRoot(LoginPage);
          this.loader.dismiss();
        } else {
          console.log("in else");
          this.presentToastWithOptions('Please check your email');
          this.navCtrl.setRoot(LoginPage);
          this.loader.dismiss();
        }
      } else {
        this.presentToastWithOptions('Please try again');
        this.loader.dismiss();
      }


    }, (err) => {
      console.log(err);
      this.loader.dismiss();
    });
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
