import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadFileService } from '../_services/uploadFile.service';
import { FileUpload } from '../_models/fileUpload.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder,private uploadService: UploadFileService) { }

  ngOnInit() {
    this.settingsForm = this.fb.group({
      firstName: '',
      lastName: '',
      age: '',
      sendCatalog: true
    });
  }

  save() {
    console.log(this.settingsForm);
    console.log('Saved: ' + JSON.stringify(this.settingsForm.value));
  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
      },
      error => {
        console.log(error);
      }
    );
  }

}
