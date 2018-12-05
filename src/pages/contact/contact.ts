import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {SystemserviceProvider} from "../../providers/systemservice/systemservice";
import {MyApp} from "../../app/app.component";
import {File} from "@ionic-native/file";
import {Camera, CameraOptions} from "@ionic-native/camera";

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  Admin = {name: '', description: '',price:'',ImageUrl:''};
  alertmessage='';
  varcounterrorLogin =0;
  toastmeassage="";
  productsData:any
  productID:any
  imageURI:any;
  imageFileName:any
  Urlupload ="";
  constructor(public navCtrl: NavController,public service:SystemserviceProvider,public alertCtrl: AlertController,private toastCtrl: ToastController,public loadingCtrl: LoadingController, private transfer: FileTransfer, private file: File ,private camera: Camera) {
    this.imageFileName = "http://22.247.15.115/uploads/8a9e5a050dfd807548582bc3c4fff08d"

  }
  ionViewDidLoad() {


  }

  ionViewDidEnter(){
  
  }

 

}
