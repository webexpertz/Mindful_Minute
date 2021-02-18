import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SubscriptiondataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SubscriptiondataProvider {
  subscription_info:any;
  token:any;
  constructor(public http: HttpClient) {
    console.log('Hello SubscriptiondataProvider Provider');
  }
  check_subscription(){
   
    this.token=localStorage.getItem('token')
    console.log(this.token)
    const body={
     token:this.token
    }
    
   
   this.http.post('https://themindfulminuteapp.com/wp-json/mobileapi/v1/getSubcription',body).subscribe(res=>{
    // console.log(res)
    //this.loader.dismiss();
       this.subscription_info=res
     //console.log(this.subscription_info.membership_count)
     if(this.subscription_info.membership_count==0){
       localStorage.setItem('mediaaccess','false')
       localStorage.setItem('mindfulmasterclass','false')
     }else{
          console.log(this.subscription_info.membership_data.length) 
        for(var i=0;i<this.subscription_info.membership_data.length;i++){
        if(this.subscription_info.membership_data[i]==1){
          localStorage.setItem('mediaaccess','true')
        } else if(this.subscription_info.membership_data[i]==2){
          localStorage.setItem('mediaaccess','true')
          localStorage.setItem('mindfulmasterclass','true')
        } else if(this.subscription_info.membership_data[i]==3){
          localStorage.setItem('mindfulmasterclass','true')
         }

        }
    //    console.log(localStorage.getItem('mediaaccess'))
    //    console.log(localStorage.getItem('mindfulmasterclass'))

       }
   },err=>{
    //console.log(err)
    //this.loader.dismiss();
   })
  // console.log(localStorage.getItem('mediaaccess'))
  // console.log(localStorage.getItem('mindfulmasterclass'))
  }
  music(data,page){
   return this.http.get('https://themindfulminuteapp.com/wp-json/wp/v2/audio/?per_page='+data+'&page='+page)
  }
  video(data,page){
   return this.http.get('https://themindfulminuteapp.com/wp-json/wp/v2/video/?per_page='+data+'&page='+page)
  }
  guided(data,page){
   return this.http.get('https://themindfulminuteapp.com/wp-json/wp/v2/guided/?per_page='+data+'&page='+page)
  }
mastercalss(data,page){
 return this.http.get('https://themindfulminuteapp.com/wp-json/wp/v2/lessons?_embed&per_page='+data+'&page='+page)
}
}
