import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController,AlertController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {SignedupPage} from "../signedup/signedup";
import {TabsPage} from "../tabs/tabs";
import {ResetpasswordPage} from "../resetpassword/resetpassword";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HomePage} from "../home/home";
import { IntroPage } from "../intro/intro"
import { ProviderAuthProvider} from "../../providers/provider-auth/provider-auth"
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  isselect=false;
  passwordcontroler: AbstractControl;
  emailcontroler: AbstractControl;
  formremember: AbstractControl;
  formgroup: FormGroup;
  token:any;
  subscription_info:any;
  test: any;
  loader: any;


  constructor(public loadingController: LoadingController,public authProvider:ProviderAuthProvider, public http: HttpClient, public formbuilder: FormBuilder, public toastController: ToastController, public navCtrl: NavController,public alertCtrl: AlertController,private iab: InAppBrowser) {
    this.initFormGroup();

    localStorage.setItem('time1','1');
    localStorage.setItem('time2','1');
    localStorage.setItem('time3','1');
  }

  private initFormGroup() {
    this.formgroup = this.formbuilder.group({
      passwordcontroler: ['', Validators.required],
      emailcontroler: ['', Validators.required],
      formremember: [false, '']

    });
    this.passwordcontroler = this.formgroup.controls['passwordcontroler'];
    this.emailcontroler = this.formgroup.controls['emailcontroler'];
    this.formremember = this.formgroup.controls['formremember'];

  }

  onSignup() {
    this.navCtrl.push(SignedupPage);
  }

  login(data) {

    this.showProgress();

     data.formremember=this.isselect;
    console.log(data.formremember + " " + JSON.stringify(data));
    const body = {username: data.emailcontroler, password: data.passwordcontroler};
   
    this.authProvider.login(body).subscribe(res => {
        //console.log(res);
        this.test = res;
        console.log("login true",this.test);
        

        if (this.test) {

        console.log(this.test.token)  
        
        localStorage.setItem('token',this.test.token )
        this.subscripsion(data);
  
        
         } else {
          this.loader.dismiss();

          this.presentToastWithOptions('User Name & password wrong');
        }


      }, (err) => {
        this.presentToastWithOptions('User Name & password wrong');
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

  onForgot() {
    this.navCtrl.push(ResetpasswordPage);

  }
  

  async showProgress() {
    this.loader = this.loadingController.create({
      content: "Please Wait.."
    });

    this.loader.present();

  }
  toggle(){
    this.isselect=!this.isselect;
  }
 async subscripsion(data){
    this.token=localStorage.getItem('token')
    const body={
     token:this.token
    }
    
   
   this.http.post('https://themindfulminuteapp.com/wp-json/mobileapi/v1/getSubcription',body).subscribe(res=>{
     console.log(res)
    //this.loader.dismiss();
       this.subscription_info=res
     console.log(this.subscription_info.membership_count)
     if(this.subscription_info.membership_count==0){
      this.doCheckbox(data);
      this.redirectafterlogin(data)
       localStorage.setItem('mediaaccess','false')
       localStorage.setItem('mindfulmasterclass','false')
        
      }else{
       this.redirectafterlogin(data)
          console.log(this.subscription_info.membership_data.length) 
        for(var i=0;i<this.subscription_info.membership_data.length;i++){
        if(this.subscription_info.membership_data[i]==1){
          localStorage.setItem('mediaaccess','true')
        } else if(this.subscription_info.membership_data[i]==2){
          localStorage.setItem('mediaaccess','true')
          localStorage.setItem('mindfulmasterclass','true')
        } else if(this.subscription_info.membership_data[i]==3){
          localStorage.setItem('mindfulmasterclass','true')
         }

        }
        console.log(localStorage.getItem('mediaaccess'))
        console.log(localStorage.getItem('mindfulmasterclass'))

       }
   },err=>{
    console.log(err)
    this.redirectafterlogin(data)
    this.loader.dismiss();
   })
   console.log(localStorage.getItem('mediaaccess'))
   console.log(localStorage.getItem('mindfulmasterclass'))
  }
  redirectafterlogin(data){
    if (data.formremember) {

      //console.log("in if ");
     localStorage.setItem('token', this.test.token);
     localStorage.setItem('is_remember', data.formremember);
     console.log('is_remember', data.formremember);
     this.presentToastWithOptions('Login successful');
     if(this.test.LoginFlag==0){
     //this.navCtrl.setRoot(AboutPage);
      this.navCtrl.setRoot(IntroPage);
      }else{
        // console.log("login true",this.test);
        //this.navCtrl.push(TabsPage, {mykey: ""});
        this.navCtrl.push(TabsPage);
      }
     this.loader.dismiss();
        

   } else {
     //console.log("in else");
     localStorage.setItem('token', this.test.token);
     this.presentToastWithOptions('Login successful');
     if(this.test.LoginFlag==0){
    // this.navCtrl.setRoot(AboutPage);
      this.navCtrl.setRoot(IntroPage);  
     
      }else{
       // this.navCtrl.setRoot(HomePage);
        //this.navCtrl.push(TabsPage, {mykey: ""});
        this.navCtrl.push(TabsPage);

      }
     this.loader.dismiss();

   }
  }
  doCheckbox(data) {
    this.loader.dismiss();
    let alert = this.alertCtrl.create();
    alert.setTitle('Please select One');

    alert.addInput({
      type: 'radio',
      label: 'Free User',
      value: '0',
      checked: true
    });
    alert.addInput({
      type: 'radio',
      label: 'Subscribe to a plan',
      value: '1',
      
    });
//    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
  console.log(data)
       if(data !='0'){
       this.iab.create('https://themindfulminuteapp.com/plans/');

       }
      }
    });
    alert.present();
  }

  ionViewWillEnter(){
   if(localStorage.getItem('token')){
    this.navCtrl.push(TabsPage);
  }
  }
}


