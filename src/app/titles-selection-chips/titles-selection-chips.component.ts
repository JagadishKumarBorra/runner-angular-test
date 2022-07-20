import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, from, map, Observable, startWith, switchMap } from 'rxjs';
import { Title } from '../data/title';
import { TitlesService } from '../service/titles.service';
import { ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-titles-selection-chips',
  templateUrl: './titles-selection-chips.component.html',
  styleUrls: ['./titles-selection-chips.component.css']
})
export class TitlesSelectionChipsComponent implements OnInit {

  filteredTitles: Observable<Title[]>;
  searchCtrl= new FormControl('')
  searchCtrlVal:any = '';
  form: FormGroup = new FormGroup({
    searchCtrl:this.searchCtrl
  });
  selectedTitles: any = {};
  public keys = Object.keys;
  separatorKeysCodes: number[] = [ENTER];
  activeTitles: Title[] = [];


  constructor(public titlesService: TitlesService) {
    this.filteredTitles = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      map((searchText) => (searchText||'').toLowerCase()),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((val) => {
        if(val.trim().length > 2)
        return this.filter(val)
        return [];
      })
    )

  }

  addTitleByFind(event:any): void {
    let ttl: Title = (this.activeTitles || []).filter(title => title.full_name.toLowerCase().trim() === (event.name||event.value).toLowerCase().trim())[0];
    this.addTitle(ttl);
  }
  addTitle(ttl: Title): void {
     if (ttl) {
      this.selectedTitles[ttl.id] = ttl;
    }
  }

  removeTitle(titleId: string): void {
    delete this.selectedTitles[titleId];
  }

  ngOnInit(): void {
    console.log("Initiated")
  }

  filter(val: string) {
    return this.titlesService.getTitles(val).pipe(
      map(response => response.filter(option => {
        this.activeTitles = response;
        return (!this.selectedTitles[option.id]) && option.name.toLowerCase().indexOf(val.toLowerCase()) === 0 // filtering at front end because backend side not implemented 
      }))
    )
  }

}

