import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage} from "../home/home";
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the ReminderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reminder',
  templateUrl: 'reminder.html',
})
export class ReminderPage {
   is_notify_1='1';
   is_notify_2='1';
   is_notify_3='1';
     constructor(public navCtrl: NavController, public navParams: NavParams,private localNotifications: LocalNotifications) {
  	this.is_notify_1=localStorage.getItem('time1');
  	this.is_notify_2=localStorage.getItem('time2');
  	this.is_notify_3=localStorage.getItem('time3');
  	
  	console.log('reminder constructure is called',this.is_notify_1);
  	 
  }
  

  notify_1(){
    
  	if (this.is_notify_1=='1') {
      this.is_notify_1 = '0';
      localStorage.setItem('time1',this.is_notify_1);
      this.localNotifications.clear(50)
    }
     else {
    	 
         this.is_notify_1 = '1';
         localStorage.setItem('time1',this.is_notify_1);

    }
    console.log(this.is_notify_1);
   }
   notify_2(){
    
  	if (this.is_notify_2=='1') {
      this.is_notify_2 = '0';
      localStorage.setItem('time2',this.is_notify_2);
      this.localNotifications.clear(51)
    }
     else {
    	 
         this.is_notify_2 = '1';
         localStorage.setItem('time2',this.is_notify_2);

    }
    console.log(this.is_notify_2);
   }

    notify_3(){
    
  	if (this.is_notify_3=='1') {
      this.is_notify_3 = '0';
      localStorage.setItem('time3',this.is_notify_3);
      this.localNotifications.clear(52)
    }
     else {
    	 
         this.is_notify_3 = '1';
         localStorage.setItem('time3',this.is_notify_3);
    }
    console.log(this.is_notify_3);
    
   }
  

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReminderPage');
  }


gotoHome(){
	this.navCtrl.setRoot(HomePage)

}

}
