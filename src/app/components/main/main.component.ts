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
  quoteIdToUpdate: string = '';

  constructor(private mainService: MainService, private snackBar: MatSnackBar, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.getQuotes();
  }

  async getQuotes() {
    const user: User = <User> await this.auth.user.pipe(first()).toPromise();
    this.quotes$ = this.mainService.getQuotes(user.email);
  }

  async addQuote(quote: string, form: HTMLFormElement) {
    const user: User = <User> await this.auth.user.pipe(first()).toPromise();
    this.resp = await this.mainService.addQuote(quote, user.email);
    form.reset();
    this.snackBar.open(this.resp.msg, '', {duration: 3000});
  }

  edit(idQuote: string, edit: boolean) {
    if(edit) {
      this.quoteIdToUpdate = idQuote;
    } else {
      this.quoteIdToUpdate = '';
    }
  }

  async deleteQuote(idQuote: string) {
    this.resp = await this.mainService.deleteQuote(idQuote);
    this.snackBar.open(this.resp.msg, '', {duration: 3000});
  }

  async updateQuote(idQuote: string, updatedQuoteValue: string) {
    this.resp = await this.mainService.updateQuote(idQuote, updatedQuoteValue);
    this.quoteIdToUpdate = '';    
    this.snackBar.open(this.resp.msg, '', {duration: 3000});
  }
}
