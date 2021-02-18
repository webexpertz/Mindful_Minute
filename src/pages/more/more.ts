import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController,AlertController,App} from 'ionic-angular';
import {LoginPage} from '../../pages/login/login';
import {SocialSharing} from '@ionic-native/social-sharing';
import {AboutPage} from "../about/about";
import {CoachingPage} from "../coaching/coaching";
import {HomePage} from "../home/home";
import {MasterclassPage} from "../masterclass/masterclass";
import {UnlimitedpremiumPage} from "../unlimitedpremium/unlimitedpremium";
import { IntroPage } from "../intro/intro"
import {TabsPage} from "../tabs/tabs"
/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {


  constructor(public alertController: AlertController,public app:App , public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing,public actionSheetController :ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  shareapp() {
    // Share via email
    let url="android url: https://play.google.com/store/apps/details?id=io.mindful&hl=en  "+"ios url:  https://apps.apple.com/us/app/mindful-minute-app/id1458101310"
    this.socialSharing.share('Please check this Amazing Application', 'Mindful Minute',null ,url).then(() => {
      // Success!
    }).catch(() => {

      console.log('Error');
      // Error!
    });

  }

  goToAboutUs() {

     this.navCtrl.push(AboutPage, {mykey: ""});

  }

  logoutuser() {
    localStorage.clear();
    this.app.getRootNav().setRoot(LoginPage);
   // this.navCtrl.setRoot(LoginPage);
  }

 goToCoachingPage(){
    this.navCtrl.push(CoachingPage);
  }

  goToMasterClass(){
    this.navCtrl.push(MasterclassPage);
  }

  goToHomePage(){
     
     //this.app.getRootNav().setRoot(HomePage);
    this.navCtrl.setRoot(TabsPage);
  }
 /* gotopremium(){
    this.navCtrl.push(UnlimitedpremiumPage);
  }*/
  goToIntro(){ 
  this.navCtrl.push(IntroPage);
}

}
