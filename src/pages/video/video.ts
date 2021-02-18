import {Component,ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams,LoadingController,Content} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {VideoplayerPage} from '../videoplayer/videoplayer';
import { SubscriptiondataProvider } from "../../providers/subscriptiondata/subscriptiondata"
import {ProvidersLoaderProvider} from "../../providers/providers-loader/providers-loader"
@IonicPage()
@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {
  @ViewChild(Content) content: Content;
  paid:any
  loader:any;
  json_array = [] ;
  json_array_all_video:any=[];
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
  constructor(public navCtrl: NavController,public subscriptiondata:SubscriptiondataProvider, public navParams: NavParams, public http: HttpClient,public loadingContrl:LoadingController,public providersLoaderProvider:ProvidersLoaderProvider ) {
    this.providersLoaderProvider.loader('Loading...')
    this.paid= localStorage.getItem('mediaaccess')
    this.subscriptiondata.video(20,this.page).subscribe(res => {
    //  this.doInfinite("")

      console.log(res);
      this.responseData = res;
      console.log("ressfsafsa lenght",this.responseData.lenght);

      if (res){
        this.providersLoaderProvider.loading.dismiss()
        // for(var i=0;i<this.responseData.length; i++){
        //   this.json_array_all_video.push(this.responseData[i]);
        //  }
        this.json_array_all_video=this.responseData
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
    this.subscriptiondata.video(20,this.page).subscribe(res => {
      this.newJson = res ;
      console.log(res);

      for(var i=0;i<this.newJson.length;i++){
        this.json_array_all_video.push(this.newJson[i]);
        // console.log("new Data",res[i]);
      } 
      this.newJson=[]
      //console.log("NEW JSON",this.json_array);
      this.onSelectDuration(this.selectDuration)
      infiniteScroll.complete(); 
      
    }, (err) => {
      console.log(err);
      infiniteScroll.complete(); 
      this.laodingcomplete=true
    });
  }



  itemSelected(item, i) {

    if (item.restrict_area == 'unpaid'  || this.paid=='true') {

      // var position=this.groceries.indexOf(item);
      // this.output_array=[this.json_array[position][0],this.json_array[position][1],this.json_array[position][2]]
      this.navCtrl.push(VideoplayerPage, {mykey: this.json_array[i].acf.video.url});
      console.log("Selected Item", this.json_array[i].acf.video.url);
    } 
    // else {
    //   window.open('https://themindfulminuteapp.com/product/test-p/');
    // }
  }
  onSelectDuration(selectedDutaion:any){
    this.selectDuration=selectedDutaion
    console.log('this is selected duration',selectedDutaion);
    if(selectedDutaion.id==1){
      this.filterList('all','');  
    }else if(selectedDutaion.id==this.filterbyduration.length){
      this.filterList(this.selectDuration.value,this.filterbyduration[selectedDutaion.id-2].value,selectedDutaion.id)
    }  else{
      this.filterList(selectedDutaion.value,this.filterbyduration[selectedDutaion.id-2].value);  
    }  
  }
  filterList(selectedDuartion:any,previousDuration,selectddurationid?){
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
              console.log(data.duration.length_formatted)
        }
       
        return (duration <= selectedDuartion && duration >previousDuration)
      });}
    
    }
    console.log(this.json_array.length)
   if(this.json_array.length<5 && (!this.laodingcomplete)){
    this.loadmoredata() 
   }
  //  for(let i=0; i<this.json_array.length;i++){
  //   console.log(this.json_array[i].duration.length_formatted)
  // }

  }
  loadmoredata(){
    this.page +=1;

    console.log(this.page)
    console.log(this.json_array)
   
    this.newJson=[]
    this.subscriptiondata.video(20,this.page).subscribe(res => {
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
      this.laodingcomplete=false
    });
  }

}
