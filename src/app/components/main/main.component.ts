import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Message, Quote, User } from 'src/app/models/models';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  msg: String = 'hi';
  resp: Message = {msg: ''};
  quotes$: Observable<Array<Quote>> = of([]);

  constructor(private mainService: MainService, private snackBar: MatSnackBar, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getQuotes();
  }

  async getQuotes() {
    const user: User = <User> await this.auth.user.pipe(first()).toPromise();
    this.quotes$ = this.mainService.getQuotes(user.email);
  }

  async addQuote(quote: string) {
    const user: User = <User> await this.auth.user.pipe(first()).toPromise();
    this.resp = await this.mainService.addQuote(quote, user.email);
    this.snackBar.open(this.resp.msg, '', {duration: 3000});
  }

  edit() {
    console.log('edit quote');
  }

  async delete(idQuote: string) {
    this.resp = await this.mainService.deleteQuote(idQuote);
    this.snackBar.open(this.resp.msg, '', {duration: 3000});
  }
}
