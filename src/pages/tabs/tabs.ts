import { Component,ViewChild } from '@angular/core';
import {MenuController} from "ionic-angular";
import { NavParams,NavController,Nav , Tabs} from 'ionic-angular';

import { VideoPage } from '../video/video';
import { AudioPage } from '../audio/audio';
import { GuidedPage } from '../guided/guided';
import { MorePage } from '../more/more';
import { HomePage } from '../home/home';



@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {

	tab:Tabs;
@ViewChild('myTab') tabRef: Tabs;
  tab1Root = VideoPage;
  tab2Root = AudioPage;
  tab3Root = HomePage;
  tab4Root = GuidedPage;
  tab5Root = MorePage;
   
  indexofvalue:any=3;
  indexvalue:any;

  constructor(public menuCtrl: MenuController,public NavParams:NavParams,public navCtrl: NavController ) {
    console.log("constructure is call")
   // this.indexofvalue=3;
    this.indexvalue=this.NavParams.get("index")
     this.tab = this.navCtrl.parent;

    if(this.NavParams.get("index")){
      if(this.indexvalue==1){ 
        this.indexofvalue=1
      }else if(this.NavParams.get("index")==5) {
         this.indexofvalue=0;
       }else if(this.NavParams.get("index")==2) {
         this.indexofvalue=2;
       }else{
        this.indexofvalue=3;
       }
            console.log("index value we get ",this.NavParams.get("index"));
       }
    // this.tab.select(3)

   
  // 	if(this.NavParams.get("index")){
  //  if(this.NavParams.get("index")==1){ 
  //    //this.indexofvalue=this.NavParams.get("index")
  //    this.tab.select(1)

  //   }else if(this.NavParams.get("index")==5) {
  //     this.indexofvalue=0;
  //     this.tab.select(0)
  //   }else if(this.NavParams.get("index")==2) {
  //     this.indexofvalue=2;
  //     this.tab.select(2)
  //   }else{
  //     //this.tab.select(); 
  //   }
  //        console.log("index value we get ",this.NavParams.get("index"));
  // 		// if(this.indexvalue==1){
  // 		// 	this.tab.select(1);
  // 		// }
  // 		// else if(this.indexvalue==2){
  // 		// 	this.tab.select(2);
  // 		// }
  // 		// else if(this.indexvalue==0){
  // 		// 	this.tab.select(0);
  // 		// }



  // 	}

  }
  async ngOnInit(){
    
   
  // 	if(this.NavParams.get("index")){
  //  if(this.NavParams.get("index")==1){ 
  //    //this.indexofvalue=1
  //    this.tab.select(1)

  //   }else if(this.NavParams.get("index")==5) {
  //    // this.indexofvalue=0;
  //     this.tab.select(0)
  //   }else if(this.NavParams.get("index")==2) {
  //    // this.indexofvalue=2;
  //     this.tab.select(2)
  //   }else{
  //     this.tab.select(3)
  //   }
  //        console.log("index value we get ",this.NavParams.get("index"));
  // 	}
  }
ionViewWillEnter(){
  console.log('tab ionViewWillEnter')
 // this.tabRef.select(3)
}

}

/*tab:Tabs;

  tab1Root = HomePage;
  tab2Root = DisputePage;
  tab3Root = AddNewPage;

  indexvalue = 0 ;
  indexofvalue = 3 ;

  constructor(public menuCtrl: MenuController,public NavParams:NavParams,public navCtrl: NavController) {

    this.tab = this.navCtrl.parent;

    if(this.NavParams.get("index")){

      this.indexvalue=this.NavParams.get("index")

      if(this.indexvalue==3){

      this.tab.select(2);
      }
      if(this.indexvalue==2){
        this.tab.select(1);

      }

    }

    if(this.NavParams.get("indexof")){

      this.indexofvalue=this.NavParams.get("indexof")

    }


  }

  showMenu() {
    this.menuCtrl.enable(true);
    this.menuCtrl.toggle()
    //this.menuToggle.toggle()
  }*/