import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LoadingController} from 'ionic-angular';

/*
  Generated class for the ProvidersLoaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvidersLoaderProvider {
  loading:any
  constructor(public http: HttpClient,public loadingController:LoadingController) {
   // console.log('Hello ProvidersLoaderProvider Provider');
  }
  loader(msg){
    
      this.loading = this.loadingController.create({
       // spinner: 'hide',
        enableBackdropDismiss:true,
        content:msg,
        
      });
    
 
    
      this.loading.present();
    }

  


}
