import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { SQLite, SQLiteObject, SQLiteOriginal } from '@ionic-native/sqlite';
import { Toast, ToastOriginal } from '@ionic-native/toast';

//@IonicPage()
@Component({
  selector: 'page-add-data',
  templateUrl: 'add-data.page.html',
})
export class AddDataPage {

  data = { date:"", type:"", description:"", amount:0 };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLiteOriginal,
    private toast: ToastOriginal) {}

  saveData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO expense VALUES(NULL,?,?,?,?)',[this.data.date,this.data.type,this.data.description,this.data.amount])
        .then(res => {
          console.log(res);
          this.toast.show('Data saved', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.pop();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

}
