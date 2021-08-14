import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Message, Quote, User } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient, private fdb: AngularFirestore) {}

  getQuotes(userEmail: string): Observable<Array<Quote>> {
    return <Observable<Array<Quote>>> this.fdb.collection('quotes', ref => ref.where('user', '==', userEmail)).snapshotChanges().pipe(map(snap => {
      return snap.map(document => {
        const data = <Quote> document.payload.doc.data();
        data.id = document.payload.doc.id;
        return { ...data };
      });
    }));
  }

  addQuote(quote: string, userEmail: string): Promise<Message> {
    return <Promise<Message>> this.http.post("https://us-central1-test-project-ee7de.cloudfunctions.net/api/addQuote", {quote, user: userEmail}).pipe(first()).toPromise();
  }

  async deleteQuote(idQuote: string): Promise<Message> {
    return <Promise<Message>> this.http.post("https://us-central1-test-project-ee7de.cloudfunctions.net/api/deleteQuote", {idQuote}).pipe(first()).toPromise();
  }
  async updateQuote(idQuote: string, newValue: string): Promise<Message> {
    return <Promise<Message>> this.http.post("https://us-central1-test-project-ee7de.cloudfunctions.net/api/updateQuote", {idQuote, newValue}).pipe(first()).toPromise();
  }
}
