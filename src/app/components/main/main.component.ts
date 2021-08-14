import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { first } from 'rxjs/operators'
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  msg: String = 'hi';
  resp: Object = {};

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
  }

  async addQuote(quote: string) {
    this.resp = await this.mainService.addQuote(quote);
  }

  edit() {
    console.log('edit action');
  }

  delete() {
    console.log('delete action');
  }
}
