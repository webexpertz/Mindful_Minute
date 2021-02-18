import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HomePage } from "../home/home";

import {HttpClient} from "@angular/common/http";
//import { Http,Headers, RequestMethod ,RequestOptions } from '@angular/http';
/**
 * Generated class for the CoachingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coaching',
  templateUrl: 'coaching.html',
})
export class CoachingPage {
  email: AbstractControl;
  contact: AbstractControl;
  name: AbstractControl;
  message:AbstractControl;
  formgroup: FormGroup;
 loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formbuilder: FormBuilder,public loadingController: LoadingController, public http:HttpClient, public toastController: ToastController) {
  	this.initFormGroup();

  }
  private initFormGroup() {
    this.formgroup = this.formbuilder.group({
      
      email: ['', Validators.required],
      /*contact_No: ['', Validators.required],*/
      contact: ['',],

      name: ['', Validators.required],
      message:['']
    });
   
    this.email = this.formgroup.controls['email'];
    this.contact = this.formgroup.controls['contact'];
    this.name = this.formgroup.controls['name'];
    this.message=this.formgroup.controls['message'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoachingPage');
  }

  submitDetail(data){

    /* let headers = new Headers(
		{
		  'Content-Type' : 'application/json'
		});

    let options = new RequestOptions({ headers: headers });*/

  	   /*var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });
*/
  	this.showProgress();

  	const body = {
		input_values:{
		      input_3: data.name,
		      input_2: data.email,
		      input_4: data.contact,
		      input_5:data.message,
		    }
		};

    console.log(body);


this.http.post('https://themindfulminuteapp.com/gravityformsapi/forms/4/submissions/', JSON.stringify(body)).subscribe(res => {
      if (res) {
      	this.presentToastWithOptions('Thank you for your interest, we will reach out to you shortly');
        console.log(res);
        this.loader.dismiss();
        this.formgroup.reset();
       // this.navCtrl.push(HomePage);
        
      } else {
        this.presentToastWithOptions(' Something wrong');
        this.loader.dismiss();
      }
    }, (err) => {
      console.log(err);
      this.loader.dismiss();
    });

    }

  async showProgress(){
  this.loader = this.loadingController.create({
      content: "Please Wait Data Is Submitting..."
    });

    this.loader.present();
  }

   async presentToastWithOptions(mess) {
    const toast = await this.toastController.create({
      message: mess,
      position: 'middle',
      duration: 5000
    });
    toast.present();
  }

}
