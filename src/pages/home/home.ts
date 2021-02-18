import { Component } from '@angular/core';
import { IonicPage, Nav, NavParams,ToastController,Tabs,LoadingController } from 'ionic-angular';
import {CoachingPage} from "../coaching/coaching";
import {AudioPage} from "../audio/audio";
import {VideoPage} from "../video/video";
import {GuidedPage} from "../guided/guided";
import {TabsPage} from "../tabs/tabs";
import {MasterclassPage} from "../masterclass/masterclass";
import { LocalNotifications } from '@ionic-native/local-notifications';
import {ReminderPage } from "../reminder/reminder";
import { VideoplayerPage } from "../videoplayer/videoplayer";
import {HttpClient} from "@angular/common/http";
import { SubscriptiondataProvider } from "../../providers/subscriptiondata/subscriptiondata"
import  {ProvidersLoaderProvider} from "../../providers/providers-loader/providers-loader"
 import { BackgroundMode } from '@ionic-native/background-mode';
/**     
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  token:any;
  loader:any;
time1:any;
time2:any;
time3:any;
subscription_info:any;
  constructor(public navCtrl: Nav,public subscripsion :SubscriptiondataProvider,public localNotifications: LocalNotifications,private loadingContrl:LoadingController ,public navParams: NavParams,public toastCtrl:ToastController,private http:HttpClient,private loadingCtrl:LoadingController,private backgroundMode: BackgroundMode,public providersLoaderProvider :ProvidersLoaderProvider
    ) {
     // this.providersLoaderProvider.loading.dismiss()

    this.localnotification()
   // this.showLoading();
         this.subscripsion.check_subscription()
   
     
         //this.time1=localStorage.getItem('time1');
           //console.log(this.time1,'time1 nitification');
         
  //        setInterval(()=>{
  //          let year =  new Date().getFullYear();
  //          let month=new Date().getMonth();
  //          let day=new Date().getDay();
  //           this.time1=localStorage.getItem('time1');
  //           this.time2=localStorage.getItem('time2');
  //           this.time3=localStorage.getItem('time3');
         
  //        if(this.time1=='1'){
  //          //console.log('home constructure is called');
  //       //console.log(this.time1,'time1 nitification in interval');
  //   let time1=new Date(year,month,day,9,0,0,0);
    
  //      if((time1.getHours()==new Date().getHours() && time1.getMinutes()==new Date().getMinutes()&& time1.getSeconds()==new Date().getSeconds())){
  //        this.localNotifications.schedule({
  //     id: 7,
  //  title: 'Time For Your Mindful Minute',
  //  text:"breathe, relax, arrive",
  //  icon: "assets/yoga.png",
  // });
         
  //      }
  //    }
      

  //     if(this.time2=='1'){
          
  //      // console.log(this.time2,'time2 nitification in interval');
    
  //    let time2= new Date(year,month,day,12,0,0,0);
  //      if((time2.getHours()==new Date().getHours() && time2.getMinutes()==new Date().getMinutes()&& time2.getSeconds()==new Date().getSeconds())){
  //        this.localNotifications.schedule({
  //     id: 8,
  //  title: 'Time For Your Mindful Minute',
  //  text:"breathe, relax, arrive",
  //  icon: "assets/yoga.png",
  // });
         
  //      }
  //    }
      

  //         if(this.time3=='1'){
  //          //console.log('home constructure is called');
  //       //console.log(this.time3,'time3 nitification in interval');
  //   let time3=new Date(year,month,day,18,0,0,0);
     
  //      if((time3.getHours()==new Date().getHours() && time3.getMinutes()==new Date().getMinutes()&& time3.getSeconds()==new Date().getSeconds())){
  //        this.localNotifications.schedule({
  //     id: 7,
  //  title: 'Time For Your Mindful Minute',
  //  text:"breathe, relax, arrive",
  //  icon: "assets/yoga.png",
  // });
         
  //      }
  //    }
   
  //    },1000);

      
  }
 
  // ionViewDidLeave(){
  // //  console.log("this.backgroundMode.isEnabled()",this.backgroundMode.isEnabled());
  // }
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HomePage');
  // }
  showLoading() {
    this.loader = this.loadingContrl.create({content: 'Please Wait...',
     duration: 3000,
       });
  }
  
   VideoPlayer(){
     console.log('VideoPlayer');
    this.navCtrl.push(VideoplayerPage, {mykey: "https://themindfulminuteapp.com/wp-content/uploads/2019/06/mindful-minute-2-1-1.mov"});
  }
  VideoPlayer2(){
    console.log('VideoPlayer2');
    this.navCtrl.push(VideoplayerPage, {mykey: "https://themindfulminuteapp.com/wp-content/uploads/2019/06/mindful-minute-app-tutorial-2-1-1.mp4"});
  }
  goToAudio(){
    console.log(" got audio apge")
    this.navCtrl.push(TabsPage,{index: 5});
  }   
  goToVideo(){
  	this.navCtrl.push(TabsPage,{index: 1});
  }
  goToGuided(){
  	this.navCtrl.push(TabsPage,{index: 2});
  }
  goToCoaching(){
  	this.navCtrl.push(CoachingPage);
  }
  reminder(){
       this.navCtrl.push(ReminderPage);
 
  }
  goToMasterClass(){
    this.navCtrl.push(MasterclassPage);
  }
  localnotification(){
   if(localStorage.getItem('time1')!="0"){
  let notification1 = {
    id: 50,
    title: 'Time For Your Mindful Minute',
    text:"Breathe, Relax, Arrive",
    icon: "assets/yoga.png",
    launch: true,
    foreground: true,
    lockscreen:true,
    trigger: { every: { hour: 9, minute: 0 },count:1 },
  }

  this.localNotifications.schedule(notification1); 
}else{
  this.localNotifications.clear(50)
}    
if(localStorage.getItem('time2')!="0"){
  let notification2 = {
    //data: "value",
    id: 51,
    title: 'Time For Your Mindful Minute',
    text:"Breathe, Relax, Arrive",
    icon: "assets/yoga.png",
    launch: true,
    foreground: true,
    lockscreen:true,
    trigger: { every: { hour: 12, minute: 0 },count:1 },
  }

  this.localNotifications.schedule(notification2); 
}else{
  this.localNotifications.clear(51)
}
if(localStorage.getItem('time3')!="0"){
  let notification3 = {
    //data: "value",
    id: 52,
    title: 'Time For Your Mindful Minute',
    text:"Breathe, Relax, Arrive",
    icon: "assets/yoga.png",
    launch: true,
    foreground: true,
    lockscreen:true,
    trigger: { every: { hour: 18, minute: 0 }, count:1 },
  }

  this.localNotifications.schedule(notification3); 
}else{
  this.localNotifications.clear(52)
}

}

}
