import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, from, map, Observable, startWith, switchMap } from 'rxjs';
import { Title } from '../data/title';
import { TitlesService } from '../service/titles.service';

@Component({
  selector: 'app-titles-selection',
  templateUrl: './titles-selection.component.html',
  styleUrls: ['./titles-selection.component.css']
})
export class TitlesSelectionComponent implements OnInit {
  filteredTitles: Observable<Title[]> ;
  searchCtrl =  new FormControl();
  selectedTitles: any = {};
  public keys = Object.keys;

  constructor(public titlesService: TitlesService) {
    this.filteredTitles = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      map((searchText) => searchText.trim().toLowerCase()),
      filter((text): boolean => text.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.filter(val)
      })
    )

   }

   addTitle(title: Title): void {
    this.selectedTitles[title.id] = title;
    this.searchCtrl.setValue('');
   }

   removeTitle(titleId:string): void {
     delete this.selectedTitles[titleId];
   }

  ngOnInit(): void {
   console.log("Initiated")
  }
   
  filter(val: string) {
    return this.titlesService.getTitles(val).pipe(
      map(response => response.filter(option => {
        return !this.selectedTitles[option.id] && option.name.toLowerCase().indexOf(val.toLowerCase()) === 0 // filtering at front end because backend side not implemented 
      }))
    )
  }
}

