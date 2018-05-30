import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import { Parent } from '../parent';
import { ParentService } from '../parent.service';

@Component({
  selector: 'app-parent-search',
  templateUrl: './parent-search.component.html',
  styleUrls: ['./parent-search.component.css']
})
export class ParentSearchComponent implements OnInit {

  parents$: Observable<Parent[]>;
  private searchTerms = new Subject<string>();

  constructor(private parentService: ParentService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.parents$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.parentService.searchParents(term)),
    );
  }
}
