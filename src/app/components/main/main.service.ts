import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  addQuote(quote: string): Promise<Object> {
    return this.http.post("https://us-central1-test-project-ee7de.cloudfunctions.net/api/addQuote", {quote}).pipe(first()).toPromise();
  }
}
