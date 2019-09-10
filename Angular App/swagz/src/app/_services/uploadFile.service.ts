import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { FileUpload } from '../_models/fileUpload.model';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })

  export class UploadFileService {

    private basePath = '/foodImages';
  
    constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }
  
    pushFileToStorage(fileUpload: FileUpload): Observable <any> {
      const filePath = `${this.basePath}/${fileUpload.file.name}`;
      const storageRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            console.log('File available at', downloadURL);
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      ).subscribe();
  
      return uploadTask.percentageChanges();
    }

    private saveFileData(fileUpload: FileUpload) {
        this.db.list(this.basePath).push(fileUpload);
      }
    
      
    }