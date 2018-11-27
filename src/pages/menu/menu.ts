import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SystemserviceProvider} from "../../providers/systemservice/systemservice";
import {FCM} from "@ionic-native/fcm";
import {MyApp} from "../../app/app.component";
import {TabsPage} from "../tabs/tabs";
import {AboutPage} from "../about/about";
import {NativeStorage} from "@ionic-native/native-storage";
import {LocalStorageService} from "angular-2-local-storage";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  Admin = {title: '', surname: '',name:'',identityType:'',idNumber:'',wheelChair:false,parking:false,matchingPassword:"Password12@",password:"Password12@",
  wifi:false, data:'',phonenumber:'',email:'',registration:'',model:'',company:'',passport:'',licenseNumber:'', make:'',disclaimer: false};
  Adminlogin = {username: '', password: ''};
  alertmessage='';
  varcounterrorLogin =0;
  toastmeassage="";
  error :any;
  showme = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public service:SystemserviceProvider,public alertCtrl: AlertController,public fcm: FCM,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }
  registerMe(){
 console.log(JSON.stringify(this.Admin))
    // this.varcounterrorLogin=0;
    // if(this.Admin.name===''){

    // }
    // if(this.Admin.title===''){
    //   this.varcounterrorLogin++;
    //   console.log("username"+ this.varcounterrorLogin);
    // }
    // if(this.varcounterrorLogin>0){
    //   this.alertmessage =" enter username and password";
     
    // }

   this.showPrompt();
    

  }

  show() {
    console.log(JSON.stringify(this.Admin.data))
    if(this.Admin.data.includes('p')){
      this.Admin.parking =true;
      this.showme = true;
      console.log("pk");
    }else{
      this.Admin.parking =false;
      this.showme= false;
    }
    if(this.Admin.data.includes('wl')){
      this.Admin.wheelChair = true;
      console.log("wheel");
     }
     if(this.Admin.data.includes('i')){
       this.Admin.wifi= true;
       console.log("wifi");
     }else{
      this.Admin.wifi= false;
     }
     
      this.Admin.make=""

      this.Admin.model=""
  
      this.Admin.registration=""
    
}

  showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: this.alertmessage,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast() {

    console.log('ALERT');
    let toast = this.toastCtrl.create({
      message: this.toastmeassage,
      duration: 6000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: '10% of battery remaining',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Disclaimer',
      message: "The detailed information on the VMS database connection",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.presentToast();
            let loader = this.loadingCtrl.create({
              content: 'loading .....',
            });

          
              
            if(this.Admin.registration ===""){
            this.Admin.registration="N/A"
            } 
            if(this.Admin.identityType ===''){
                this.Admin.passport="N/A"
                this.Admin.licenseNumber="N/A"
              } 
              if(this.Admin.licenseNumber ===''){
                this.Admin.licenseNumber="N/A"
              } 
              if(this.Admin.passport ===''){
                this.Admin.passport="N/A"
              } 
              if(this.Admin.make ===''){
                this.Admin.make="N/A"
              }
              if(this.Admin.model ===''){
                this.Admin.model="N/A"
              }
              if(this.Admin.registration ===''){
                this.Admin.registration="N/A"
              }
           this.service.Register(this.Admin.make,this.Admin.model,this.Admin.registration,this.Admin.company,this.Admin.email,this.Admin.idNumber,
            this.Admin.identityType, this.Admin.licenseNumber, this.Admin.name,this.Admin.parking,this.Admin.passport,this.Admin.phonenumber,
this.Admin.surname,this.Admin.title,this.Admin.wheelChair,this.Admin.wifi )
              .subscribe(
                data => {
                        console.log(data.error)
                        if(data.error===false){
                          this.toastmeassage = 'Successfully registered'
                          this. presentToast();
        
                        }
        
                 // this.navCtrl.push(TabsPage);
        
                    },
                error => {
                  if(error.status===409){
                    this.alertmessage ="username you have entered exist";
                    this.showAlert();
                  }
        
                });
            loader.dismiss();
          }
        }
      ]
    });
    prompt.present();
  }
}


