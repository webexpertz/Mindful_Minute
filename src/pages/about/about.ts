import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import { VideoplayerPage } from "../videoplayer/videoplayer";
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  url:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  goHome() {

    this.navCtrl.push(TabsPage);

  }
  VideoPlayer(){
    this.navCtrl.push(VideoplayerPage, {mykey: "https://themindfulminuteapp.com/wp-content/uploads/2019/06/mindful-minute-2-1-1.mov"});
  }
  VideoPlayer2(){
    console.log('VideoPlayer2');
    this.navCtrl.push(VideoplayerPage, {mykey: "https://themindfulminuteapp.com/wp-content/uploads/2019/06/mindful-minute-app-tutorial-2-1-1.mp4"});
  }
 
}