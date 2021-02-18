import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
/**
 * Generated class for the UnlimitedpremiumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-unlimitedpremium',
  templateUrl: 'unlimitedpremium.html',
})
export class UnlimitedpremiumPage {
	formgroup:FormGroup;
	card_No : AbstractControl;
	expiry_Date : AbstractControl;
    cvv_no:AbstractControl;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder ) {
  	this.initFormGroup();
  }
  initFormGroup(){
    this.formgroup = this.formBuilder.group({
     card_No:['',Validators.required],
     expiry_Date:['',Validators.required],
     cvv_no:['',Validators.required]
    });
 this.card_No = this.formgroup.controls['card_No']
 this.expiry_Date=this.formgroup.controls['expiry_Date']
 this.cvv_no=this.formgroup.controls['cvv_no']
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UnlimitedpremiumPage');
  }
  submitDetail(data){
  	console.log(data);
  }

}
