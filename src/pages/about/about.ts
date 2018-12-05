import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController, ToastController} from 'ionic-angular';
import {SystemserviceProvider} from "../../providers/systemservice/systemservice";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  usersData: any;
  usersNumber: any;
  accountStatus ='1';
  alertmessage = '';
  toastmeassage="";
  selectedId = {_id: ''};
  constructor(public alertCtrl: AlertController,public navCtrl: NavController,public service:SystemserviceProvider,private toastCtrl: ToastController,public loadingCtrl: LoadingController) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');


  }

  ionViewDidEnter(){
   
  }

}
