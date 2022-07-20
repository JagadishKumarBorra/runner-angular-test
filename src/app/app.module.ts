import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceModule } from './service/service.module';
import { TitlesSelectionComponent } from './titles-selection/titles-selection.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
   
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TitlesSelectionChipsComponent } from './titles-selection-chips/titles-selection-chips.component';
import { HighlightPipe } from './titles-selection-chips/highlight.pipe';
   
@NgModule({
  declarations: [
    AppComponent,
    TitlesSelectionComponent,
    TitlesSelectionChipsComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    ServiceModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
