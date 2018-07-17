import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { NgForm } from '@angular/forms';
import { ThankyouPage } from '../thankyou/thankyou';
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private authService: AuthService, 
    private alertController: AlertController,
    public loadingController: LoadingController) {
  }

  onRegister(form: NgForm, name) {
    const loading = this.loadingController.create({
      content: 'Signing you up...'
    })

    loading.present();

    this.authService.signup(form.value.email, form.value.password)
    .then(data => {
      console.log(data)
      loading.dismiss();
      name = name || ""
      this.navCtrl.push(ThankyouPage, {data: name})
    })
    .catch(error => {
      console.log(error)
      loading.dismiss();
      
      const alert = this.alertController.create({
        title: 'Signup failed!',
        message: error.message,
        buttons: ['OK']
      })

      alert.present()
    });
  }
}
