import {Component} from '@angular/core';
import {Platform,App} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {HomePage} from '../pages/home/home';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClient} from '@angular/common/http';
import { LocalNotifications } from '@ionic-native/local-notifications';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {SubscriptiondataProvider } from "../providers/subscriptiondata/subscriptiondata"
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  subscription_info:any
  rootPage: any;
  time1:any;
  time2:any;
  time3:any;
  token:any;
  notifications = []
  constructor(platform: Platform,private subscriptoin:SubscriptiondataProvider,public http:HttpClient,public localNotifications: LocalNotifications, statusBar: StatusBar, splashScreen: SplashScreen,public app:App) {
    platform.ready().then(() => {
      //notification
      ///  1 
       
       this.localnotification();
       this.localnotification2();
      statusBar.styleDefault();
      splashScreen.hide();
      this.token = localStorage.getItem('token');
      console.log(this.token)
    
        localStorage.setItem('mediaaccess','false')
        localStorage.setItem('mindfulmasterclass','false')
       
    this.time1=localStorage.getItem('time1');
            this.time2=localStorage.getItem('time2');
            this.time3=localStorage.getItem('time3');
    console.log( this.time1,this.time2,this.time3 );
     
      if (localStorage.getItem('is_remember') && localStorage.getItem('token'))
        {  this.subscriptoin.check_subscription()
           this.rootPage = TabsPage;
         
        }
        
        //this.app.getRootNav().setRoot(HomePage);

      else this.rootPage = LoginPage;
    });
  }
  /////local notification
   localnotification(){
    // let notification0 = {
    //   //data: "value",
    //   id: 50,
    //   title: 'Time For Your Mindful Minute',
    //   text:"Breathe, Relax, Arrive",
    //   icon: "assets/yoga.png",
    //   launch: true,
    //   foreground: true,
    //   lockscreen:true,
    //   trigger: { every: { minute:25 }, count:1 },
    // }

    //this.localNotifications.schedule(notification0);

      if(localStorage.getItem('time1')!="0"){
    let notification1 = {
      //data: "value",
      id: 50,
      title: 'Time For Your Mindful Minute',
      text:"Breathe, Relax, Arrive",
      icon: "assets/yoga.png",
      launch: true,
      foreground: true,
      lockscreen:true,
      trigger: { every: { hour: 9, minute: 0 }, count:1 },
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
      trigger: { every: { hour: 12, minute: 0 }, count:1 },
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
   localnotification2(){
    // let notification0 = {
    //   //data: "value",
    //   id: 50,
    //   title: 'Time For Your Mindful Minute',
    //   text:"Breathe, Relax, Arrive",
    //   icon: "assets/yoga.png",
    //   launch: true,
    //   foreground: true,
    //   lockscreen:true,
    //   trigger: { every: { minute:30 }, count:1 },
    // }

    // this.localNotifications.schedule(notification0);



    if(localStorage.getItem('time1')!="0"){
  let notification1 = {
    //data: "value",
    id: 50,
    title: 'Time For Your Mindful Minute',
    text:"Breathe, Relax, Arrive",
    icon: "assets/yoga.png",
    launch: true,
   // foreground: true,
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
    //foreground: true,
    lockscreen:true,
    trigger: { every: { hour: 12, minute: 0 }, count:1 },
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
    //foreground: true,
    lockscreen:true,
    trigger: { every: { hour: 18, minute: 0 }, count:1 },
  }

  this.localNotifications.schedule(notification3); 
}else{
  this.localNotifications.clear(52)
}

}

  ////localnotification


  // subscripsion(){
  //   this.token=localStorage.getItem('token')
  //   console.log(this.token)
  //   const body={
  //    token:this.token
  //   }
    
   
  //  this.http.post('https://themindfulminuteapp.com/wp-json/mobileapi/v1/getSubcription',body).subscribe(res=>{
  //    console.log(res)
  //   //this.loader.dismiss();
  //      this.subscription_info=res
  //    console.log(this.subscription_info.membership_count)
  //    if(this.subscription_info.membership_count==0){
  //      localStorage.setItem('mediaaccess','false')
  //      localStorage.setItem('mindfulmasterclass','false')
  //    }else{
  //         console.log(this.subscription_info.membership_data.length) 
  //       for(var i=0;i<this.subscription_info.membership_data.length;i++){
  //       if(this.subscription_info.membership_data[i]==1){
  //         localStorage.setItem('mediaaccess','true')
  //       } else if(this.subscription_info.membership_data[i]==2){
  //         localStorage.setItem('mediaaccess','true')
  //         localStorage.setItem('mindfulmasterclass','true')
  //       } else if(this.subscription_info.membership_data[i]==3){
  //         localStorage.setItem('mindfulmasterclass','true')
  //        }

  //       }
  //       console.log(localStorage.getItem('mediaaccess'))
  //       console.log(localStorage.getItem('mindfulmasterclass'))

  //      }
  //  },err=>{
  //   console.log(err)
  //   //this.loader.dismiss();
  //  })
  //  console.log(localStorage.getItem('mediaaccess'))
  //  console.log(localStorage.getItem('mindfulmasterclass'))
  // }


}

