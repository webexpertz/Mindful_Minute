import { Component } from '@angular/core';
import { IonicPage, NavController,Platform,AlertController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HomePage } from "../home/home";
import {HttpClient} from "@angular/common/http";
import { getScrollData } from 'ionic-angular/umd/components/input/input';
import {LessonplayerPage } from '../lessonplayer/lessonplayer'
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SubscriptiondataProvider } from "../../providers/subscriptiondata/subscriptiondata"
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the MasterclassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-masterclass',
  templateUrl: 'masterclass.html',
})
export class MasterclassPage {
  lessondata:any
  token:any;
  paid:any;
  pdflist:any=[]
  audiolist:any=[]
  page:number=1;
  laodingcomplete:boolean=false
private fileTransfer: FileTransferObject;
  constructor(public navCtrl: NavController,public subscriptiondata:SubscriptiondataProvider,public platform:Platform ,public navParams: NavParams,public formbuilder: FormBuilder,public loadingController: LoadingController, public http:HttpClient, public toastController: ToastController,private transfer: FileTransfer, private file: File,public alertCtrl: AlertController,private iab: InAppBrowser) {
   this.paid=localStorage.getItem('mindfulmasterclass')
    this.getData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MasterclassPage');
    this.paid=localStorage.getItem('mindfulmasterclass')
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Mindful Minute App',
      message: 'Visit the website mindfulminute.com to subscribe.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Buy clicked');
            this.iab.create('https://themindfulminuteapp.com/product/mindfullness-master-class/')
          }
        }
      ]
    });
    alert.present();
  }
  openpdf(){
  // this.fileOpener.open('https://themindfulminuteapp.com/wp-content/uploads/2019/08/MNFUL_Proposal_4-1.pdf', 'application/pdf')
  // .then(() => alert('File is opened'))
  // .catch(e => alert(JSON.stringify(e)));
    this.presentToastWithOptions('paid content');
  }
getData(){
  this.subscriptiondata.mastercalss(10,this.page).subscribe(res => {
    console.log(res)
    
    this.lessondata=res
    console.log(this.lessondata[0]._embedded["wp:featuredmedia"][0].source_url)
   // this.lessondata.reverse();
    this.filterdta(this.lessondata)
  })
    }
    selectedPdf(i){
      this.paid=localStorage.getItem('mindfulmasterclass')
      var filetype=this.pdflist[i].acf.file.mime_type
      // if(filetype.includes('audio')){
      //   if(this.paid=='true'){
      //     this.navCtrl.push(LessonplayerPage, {mykey: this.lessondata[i]});
      //   console.log("Selected Item", this.lessondata[i]);}
      //   else{
      //     alert("please subscribe to access this content")
      //   } 
      //   }else 
        if( filetype.includes('pdf')){
         this.download(this.pdflist[i].acf.file.url,this.pdflist[i].acf.file.filename)
          }else{
        
             }
    }
    selectedAudio(i){
      console.log(i)
      this.paid=localStorage.getItem('mindfulmasterclass')
      var filetype=this.audiolist[i].acf.file.mime_type
      if(filetype.includes('audio')){
        if(this.paid=='true'){
          this.navCtrl.push(LessonplayerPage, {mykey: this.audiolist[i]});
        console.log("Selected Item", this.audiolist[i]);}
        else{
          alert("please subscribe to access this content")
        } 
         }
          else{
        
             }
    }
    download(url,filename) { 
      this.paid=localStorage.getItem('mindfulmasterclass')
      if(this.paid=='true'){ 
        
      //  window.open('https://docs.google.com/viewer?url='+url+'f&embedded=true', '_blank', 'location=yes'); 
      this.presentToastWithOptions('Downloading start')
       let path =null;
       if(this.platform.is('ios')){
         path=this.file.documentsDirectory;
       }else{
         path=this.file.dataDirectory
       }
       this.fileTransfer = this.transfer.create();  
       this.fileTransfer.download(url, path+filename).then((entry) => {  
          //here logging our success downloaded file path in mobile.
        
          this.presentToastWithOptions('Downloading finish');
         
          //alert('path:' + entry.toURL());  
      }, (error) => {  
        this.presentToastWithOptions('Downloading failed')
          //here logging our error its easier to find out what type of error occured.  
         // alert('download failed: ' + JSON.stringify(error));  
      }); 
      window.open(url, '_system', 'location=yes')
     }
     else{
      alert("please subscribe to access this content")
     }
  } 
 
 
   async presentToastWithOptions(mess) {
    const toast = await this.toastController.create({
      message: mess,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }
filterdta(lessondata){
  
  lessondata.forEach(element => {
    var filetype=element.acf.file.mime_type
  
   if(filetype.includes('audio')){
      this.audiolist.push(element)
   }else if( filetype.includes('pdf')){
       this.pdflist.push(element)
   }else{

   }
    
    
  });
  console.log(this.pdflist.length)
  console.log(this.audiolist.length)
}
doInfinite(infiniteScroll){
  this.page +=1;
    console.log(this.page)
    this.subscriptiondata.mastercalss(10,this.page).subscribe(res => {
      console.log(res)
      
      this.lessondata=res
     // this.lessondata.reverse();
      this.filterdta(this.lessondata)
      infiniteScroll.complete();
    },error=>{
      this.laodingcomplete=true;
      infiniteScroll.complete();
    })
} 
}
