import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {AudioplayerPage} from '../audioplayer/audioplayer';
import {VideoplayerPage} from "../videoplayer/videoplayer";
import {SubscriptiondataProvider} from "../../providers/subscriptiondata/subscriptiondata"
import {ProvidersLoaderProvider} from "../../providers/providers-loader/providers-loader"
//import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the GuidedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guided',
  templateUrl: 'guided.html',
})
export class GuidedPage {
    json_array = [];
   json_array_all_video:any=[];
   paid:any;
   loader:any;
   page = 1 ;
   newJson : any;
   responseData : any ;
   laodingcomplete:boolean=false;
   selectDuration:any={id:1,name:'All',value:'00:00'}

   filterbyduration= [{id:1,name:'All',value:'00:00'},
   {id:2, name:'1 Min',value:'01:30'},
   {id:3,name:'3 Min',value:'04:00'},
   {id:4,name:'5 Min',value:'07:00'},
   {id:5,name:'10 Min',value:'59:59:'}]
  constructor(public navCtrl: NavController, public subscriptiondata:SubscriptiondataProvider ,public loadingContrl:LoadingController ,public navParams: NavParams, public http: HttpClient,public providersLoaderProvider :ProvidersLoaderProvider) {
     //this.showLoading();
     this.providersLoaderProvider.loader("Loading...");
    this.paid= localStorage.getItem('mediaaccess')

    this.subscriptiondata.guided(20,this.page).subscribe(res => {
      console.log(res);
      this.responseData = res;
      console.log("ressfsafsa lenght",this.responseData.lenght);

      if (res){
        this.providersLoaderProvider.loading.dismiss()
        // for(var i=0;i<this.responseData.length; i++){
        //   this.providersLoaderProvider.loading.dismiss()
        //   this.json_array.push(this.responseData[i]);
          
        // }
        //console.log(this.json_array);
        this.json_array_all_video=res;
        this.onSelectDuration(this.selectDuration)
      }
    }, (err) => {
      this.providersLoaderProvider.loading.dismiss()
        
      console.log(err);
    });


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad GuidedPage');
  }

  doInfinite(infiniteScroll){
    this.page +=1;
    console.log(this.page)
    this.subscriptiondata.guided(20,this.page).subscribe(res => {
      this.newJson = res ;
      console.log(res);

      for(var i=0;i<this.newJson.length;i++){
       // this.json_array.push(this.newJson[i]);
        this.json_array_all_video.push(this.newJson[i]);
        // console.log("new Data",res[i]);
      } 
      this.newJson=[]
      //console.log("NEW JSON",this.json_array);
      this.onSelectDuration(this.selectDuration)
      infiniteScroll.complete(); 
        
    }, (err) => {
      console.log(err);
      this.laodingcomplete=true
      infiniteScroll.complete(); 

    });
  }


  
  itemSelected(item, i) {
    this.paid= localStorage.getItem('mediaaccess')
    console.log('item',item)
    if (item.restrict_area == 'unpaid' || this.paid=='true') {

      // var position=this.groceries.indexOf(item);
      // this.output_array=[this.json_array[position][0],this.json_array[position][1],this.json_array[position][2]]
      this.navCtrl.push(AudioplayerPage, {title: this.json_array[i].acf.guided.title,url:this.json_array[i].acf.guided.url,file:this.json_array[i].acf.guided.filename});
      console.log("Selected Item", this.json_array[i].acf.guided.url);

    }
    //  else {
    //   window.open('https://themindfulminuteapp.com/product/test-p/');
    // }
  }

onSelectDuration(selectedDutaion:any){
  this.selectDuration=selectedDutaion;
    console.log('this is selected duration',selectedDutaion);
    // this.filterList(selectedDutaion);  
    if(selectedDutaion.id==1){
      this.filterList('all','');  
    } else if(selectedDutaion.id==this.filterbyduration.length){
      this.filterList(this.selectDuration.value,this.filterbyduration[selectedDutaion.id-2].value,selectedDutaion.id)
    } else{
      this.filterList(this.selectDuration.value,this.filterbyduration[selectedDutaion.id-2].value);  
    }

  }
  filterList(selectedDuartion:any,previousDuration ,selectddurationid?){
    console.log(selectddurationid)
    this.json_array=[]
    var duration;
    //this.content.scrollToTop();
    //this.showLoading();
    if(selectedDuartion=="all"){
      this.json_array=this.json_array_all_video;
    }
    else{
      if(selectddurationid){
        this.json_array = this.json_array_all_video.filter((data) => {
          duration=data.duration.length_formatted;
          if((duration.length)%2==0){
            duration='0'+data.duration.length_formatted;
          
          }else{
                duration=data.duration.length_formatted;
               // console.log(data.duration.length_formatted)
          }
          console.log(duration)
          return (duration > previousDuration )
        });
        }
    else{ 
       this.json_array = this.json_array_all_video.filter((data) => {
        duration=data.duration.length_formatted;
        if((duration.length)%2==0){
          duration='0'+data.duration.length_formatted;
        
        }else{
              duration=data.duration.length_formatted;
             // console.log(data.duration.length_formatted)
        }
        console.log(duration)
        return (duration <= selectedDuartion && duration > previousDuration )
      });
   }
    }
     
 console.log(this.json_array.length)
 if(this.json_array.length<3 && (!this.laodingcomplete)){
  this.loadmoredata() 
 }
//  for(let i=0; i<this.json_array.length;i++){
//   console.log(this.json_array[i].duration.length_formatted)
// }
  }
  loadmoredata(){
    this.page +=1;

    console.log(this.page,"loadmoredata")
    console.log(this.json_array)
   
    this.newJson=[]
    this.subscriptiondata.guided(20,this.page).subscribe(res => {
      this.newJson = res ;
      console.log(res);

      for(var i=0;i<this.newJson.length;i++){
        this.json_array_all_video.push(this.newJson[i]);
        // console.log("new Data",res[i]);
      } 
      this.newJson=[]
      //console.log("NEW JSON",this.json_array);
      this.onSelectDuration(this.selectDuration)
      
    }, (err) => {
      console.log(err);
      this.laodingcomplete=true
    });
  }
  

}
