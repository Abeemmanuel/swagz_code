import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription, fromEvent, merge } from 'rxjs';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  errorMessage: string;
  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  save(form: NgForm) {
    //this.dataService.saveEvent(form.value);
    this.dataService.saveEvent(form.value)
            .subscribe(
              () => this.onSaveComplete(),
              (error: any) => this.errorMessage = <any>error
              
            );
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
   
  }

}
