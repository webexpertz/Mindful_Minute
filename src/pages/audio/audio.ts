import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {AudioplayerPage} from '../audioplayer/audioplayer';
import {SubscriptiondataProvider } from "../../providers/subscriptiondata/subscriptiondata"
import {ProvidersLoaderProvider} from "../../providers/providers-loader/providers-loader"
import {LessonplayerPage} from "../lessonplayer/lessonplayer"
//import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the AudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audio',
  templateUrl: 'audio.html',
})
export class AudioPage {
   loader:any;
  json_array = [];
  json_array_all_audio:any;
  paid:any
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
  constructor(public navCtrl: NavController, public subscribetsiondata:SubscriptiondataProvider,public navParams: NavParams, public http: HttpClient,public loadingContrl:LoadingController,public providersLoaderProvider :ProvidersLoaderProvider) {
   // this.navCtrl.push(AudioplayerPage);

    this.providersLoaderProvider.loader('Loading...')
   this.paid= localStorage.getItem('mediaaccess')
   console.log(this.paid)
   this.subscribetsiondata.music(20,this.page).subscribe(res => {
      // console.log('Data'+JSON.stringify(res));
      console.log(res);
      this.responseData = res;
      console.log("ressfsafsa lenght",this.responseData.lenght);

      if (res){
        this.providersLoaderProvider.loading.dismiss()
        // for(var i=0;i<this.responseData.length; i++){
        //   this.json_array.push(this.responseData[i]);
        //  // this.json_array_all_audio.push(this.responseData[i]);
        //   // console.log("asdsadsa",this.responseData[i]);
        // }
        console.log(this.json_array);
        this.json_array_all_audio=res;
        this.onSelectDuration(this.selectDuration)
      }
    }, (err) => {
      this.providersLoaderProvider.loading.dismiss()
      //this.loader.dismiss();
      console.log(err);
    });


  }





  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  doInfinite(infiniteScroll){
    this.page +=1;
    console.log(this.page)
    this.subscribetsiondata.music(20,this.page).subscribe(res => {
      this.newJson = res ;
      console.log(res);

      for(var i=0;i<this.newJson.length;i++){
       // this.json_array.push(this.newJson[i]);
        // console.log("new Data",res[i]);
        this.json_array_all_audio.push(this.newJson[i]);
      } 
      //console.log("NEW JSON",this.json_array);
      this.newJson=[]
      this.onSelectDuration(this.selectDuration)
      infiniteScroll.complete(); 

    }, (err) => {
      console.log(err);
      this.laodingcomplete=true
      infiniteScroll.complete(); 

    });
  }


  itemSelected(title, i) {
   this.paid=localStorage.getItem('mediaaccess')
    if (title.restrict_area == 'unpaid' || this.paid=='true' ) {
    
    this.navCtrl.push(AudioplayerPage, {title: this.json_array[i].acf.audio_files.title,url:this.json_array[i].acf.audio_files.url,file:this.json_array[i].acf.audio_files.filename});
    console.log("Selected Item", this.json_array[i]);

    } 
    // else {
    //   window.open('https://themindfulminuteapp.com/product/test-p/');
    // }
  }
  onSelectDuration(selectedDutaion:any){
    this.selectDuration=selectedDutaion;
    console.log('this is selected duration',selectedDutaion);
    if(selectedDutaion.id==1){
      this.filterList('all','');  
    }else if(selectedDutaion.id==this.filterbyduration.length){
      this.filterList(this.selectDuration.value,this.filterbyduration[selectedDutaion.id-2].value,selectedDutaion.id)
    }else{
      this.filterList(selectedDutaion.value,this.filterbyduration[selectedDutaion.id-2].value);  
    }
    }
  filterList(selectedDuartion ,previousDuration,selectddurationid?){
    this.json_array=[]
    var duration;
        
    if(selectedDuartion=="all"){
      this.json_array=this.json_array_all_audio;
    }
    else{
      if(selectddurationid){
        this.json_array = this.json_array_all_audio.filter((data) => {

          duration=data.duration.length_formatted;
          if((duration.length)%2==0){
            duration='0'+data.duration.length_formatted;
          
          }else{
                duration=data.duration.length_formatted;
                console.log(data.duration.length_formatted)
          }
       
          return (duration >previousDuration)
        })
        }
      else { this.json_array = this.json_array_all_audio.filter((data) => {

        duration=data.duration.length_formatted;
        if((duration.length)%2==0){
          duration='0'+data.duration.length_formatted;
        
        }else{
              duration=data.duration.length_formatted;
              console.log(data.duration.length_formatted)
        }
     
        return (duration<= selectedDuartion && duration >previousDuration)
      });}

    }
    if(this.json_array.length<3 && (!this.laodingcomplete)){
      this.loadmoredata() 
     }
     

  }
  loadmoredata(){
    this.page +=1;

   // console.log(this.page)
    //console.log(this.json_array)
   
    this.newJson=[]
    this.subscribetsiondata.music(20,this.page).subscribe(res => {
      this.newJson = res ;
      //console.log(res);

      for(var i=0;i<this.newJson.length;i++){
        this.json_array_all_audio.push(this.newJson[i]);
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
