import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { OrderPage } from '../order/order';
import { AuthService } from '../../services/auth';
import { NgForm } from '@angular/forms';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private alertController: AlertController,
    public loadingController: LoadingController) {
  }


  onOrder(form: NgForm, username) {
    const loading = this.loadingController.create({
      content: 'Signing you in...'
    });

    loading.present();
    
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        console.log(data)
        loading.dismiss();
        username = username || ""
        this.navCtrl.push(OrderPage, { data: username })
      })
      .catch(error => {
        console.log(error)
        loading.dismiss();
        const alert = this.alertController.create({
          title: 'Signin failed!',
          message: error.message,
          buttons: ['OK']
        })

        alert.present()
      });
  }
}
