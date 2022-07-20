import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitlesService } from './titles.service';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [],
  providers: [TitlesService],
  imports: [
    CommonModule, 
    HttpClientModule
  ]
})
export class ServiceModule { }
