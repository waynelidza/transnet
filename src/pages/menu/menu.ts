import { Component } from '@angular/core';
import {AlertController, Loading, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {SystemserviceProvider} from "../../providers/systemservice/systemservice";
import {MyApp} from "../../app/app.component";
import {TabsPage} from "../tabs/tabs";
import {AboutPage} from "../about/about";
import {NativeStorage} from "@ionic-native/native-storage";
import {LocalStorageService} from "angular-2-local-storage";
import {File,FileEntry} from "@ionic-native/file"; 
import {Camera, CameraOptions} from "@ionic-native/camera";
import { FTP } from '@ionic-native/ftp';
import {HttpClient} from "@angular/common/http";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { catchError, finalize } from 'rxjs/operators';
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
  wifi:false, data:'',phonenumber:'',email:'',registration:'',model:'',company:'',passport:'',licenseNumber:'',photoLocation: "", make:'',disclaimer: false};
  Adminlogin = {username: '', password: ''};
  alertmessage='';
  varcounterrorLogin =0;
  toastmeassage="";
  error :any;
  showme = false;
  data:any;
  imageURI:any;
  imageFileName:any
  public myPhoto: any;
  public errors: string;
  Urlupload ="";
  upload = false;
  private loading: Loading;
   photolocation :any;
   fileloc: any;
  constructor(private readonly http: HttpClient, private fTP: FTP ,public navCtrl: NavController, public navParams: NavParams,public service:SystemserviceProvider,public alertCtrl: AlertController,private toastCtrl: ToastController,public loadingCtrl: LoadingController,private transfer: FileTransfer, private file: File ,private camera: Camera) {
  }

  ionViewDidLoad() {

  }
  registerMe(){
var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.varcounterrorLogin=0;
    if(this.Admin.name===''){
      this.varcounterrorLogin++;
      this.toastmeassage= 'please enter name';
      this.presentToast();
    }
    if(this.Admin.surname===''){
      this.varcounterrorLogin++;
      this.toastmeassage= 'please enter surname';
      this.presentToast();
    }
    if(this.Admin.phonenumber===''){
      this.varcounterrorLogin++;
      this.toastmeassage= 'please enter phonenumber';
      this.presentToast();
    }

    if(this.Admin.parking===true){
      if(this.Admin.registration==""){
        this.varcounterrorLogin++;
        this.toastmeassage= 'please enter car registration number';
        this.presentToast();
      }
      if(this.Admin.make==""){
        this.varcounterrorLogin++;
        this.toastmeassage= 'please enter car make';
        this.presentToast();
      }
      if(this.Admin.model==""){
        this.varcounterrorLogin++;
        this.toastmeassage= 'please enter car model';
        this.presentToast();
      }
    }
    if(this.Admin.identityType===''){
      this.varcounterrorLogin++;
      this.toastmeassage= 'please enter  ID type';
      this.presentToast();
    }

    if(this.Admin.company===''){
      this.varcounterrorLogin++;
      this.toastmeassage= 'please enter  company name';
      this.presentToast();
    }
    if(this.Admin.email===''){
      this.varcounterrorLogin++;
      this.toastmeassage= 'please enter  email';
      this.presentToast();
    }

    if(this.Admin.identityType==='ID'){
      if(this.Admin.idNumber.length==13){
      }else{
        console.log('less');
        this.alertmessage ="ID must be 13 digit";
        this.showAlert();
        this.varcounterrorLogin++;
      }
    
    }
    if(this.Admin.idNumber===''){
    
      this.toastmeassage= 'please enter  ID number'
      this.presentToast();
      this.varcounterrorLogin++;
    }
    if(!re.test(this.Admin.email)) {
      this.toastmeassage= 'please enter a valid email'
      this.presentToast();
      this.varcounterrorLogin++;
    }
    if(this.varcounterrorLogin>0){
    }else{
     this.showPrompt();
    
    }
  }
  
  Clearme(){ 
     this.Admin.make = "";
     this.Admin.model = "";
     this.Admin.registration =  "";
     this.Admin.company = "";
     this.Admin.email= "";
     this.Admin.idNumber= "";
    this.Admin.identityType= "";
    this.Admin.licenseNumber= "";
     this.Admin.name= "";
     this.Admin.parking =false;
     this.Admin.passport = "";
     this.Admin.phonenumber = "";
     this.Admin.surname = "";
     this.Admin.title = "";
      this.Admin.wheelChair= false;
      this.Admin.wifi= false;
    }

  show() {
if(this.data.find( value => value === 'p' )){
  this.showme = true;
  this.Admin.parking=true;
  console.log('pk');
}
if(this.data.find( value => value === 'i' )){
  this.Admin.wifi= true;
  console.log('wifi');
}
if(this.data.find( value => value === 'w' )){
  this.Admin.wheelChair= true;
  console.log('weel');
}
else{
  this.showme = false;

}
}

Cancelupload(){
  this.upload =false;
}

 registration(){
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
  this.Admin.identityType, this.Admin.licenseNumber, this.Admin.name,this.Admin.parking,this.Admin.passport,this.Admin.phonenumber,this.fileloc,
this.Admin.surname,this.Admin.title,this.Admin.wheelChair,this.Admin.wifi )
    .subscribe(
      data => {
              console.log(data.error)
              if(data.error===false){
                this.toastmeassage = 'Successfully registered'
                this. presentToast();
                this.Clearme();
                this.upload=false;
              }else{
                this.toastmeassage = 'failed to register'
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

  showAlert() {
    let alert = this.alertCtrl.create({
      subTitle: this.alertmessage,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast() {
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
        
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.upload = true;
          }
        }
      ]
    });
    prompt.present();
  }
 

  takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  selectPhoto(): void {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      quality: 100,
      encodingType: this.camera.EncodingType.PNG,
    }).then(imageData => {
      this.myPhoto = imageData;
      this.uploadPhoto(imageData);
    }, error => {
      this.error = JSON.stringify(error);
    });
  }

  private uploadPhoto(imageFileUri: any): void {
    this.error = null;
     this.loadingCtrl.create({
      content: 'Uploading...'
    });



    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (entry as FileEntry).file(file => this.readFile(file)))
      .catch(err => console.log(err));
  }

  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      formData.append('file', imgBlob, file.name);
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  private postData(formData: FormData) {
    this.http.post<any>("http://104.251.219.251:9090/api/photo/upload", formData)
      .subscribe(data => {
        if(data.uploadLocation){
          data.uploadLocation = this.fileloc;
          this.registration();
        }
      
    },
    error => {
      console.log("err");
       console.log(error);

    });
  }

  private showToast(ok: boolean) {
    if (ok) {
      const toast = this.toastCtrl.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
      const toast = this.toastCtrl.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }
  private handleError(error: any) {
    const errMsg = error.message ? error.message : error.toString();
    this.error = errMsg;
    return errMsg;
  }

}


