import { Component, OnInit } from '@angular/core';
import { BlobService, UploadConfig, UploadParams } from 'angular-azure-blob-service';
import { Config } from '../_helpers/config.template';
import { ImageService } from '../_services/image.service';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  tags : any[];
  foodName : string="";
  loading : boolean;
  fileUploaded : boolean=false;
  carbRequest: any;
  config : UploadConfig;
  data1 : String;
  currentLat : number=0.00000;
  currentLong : number=0.00000;
  restaurantName : string="";
  foodDetails : any[];
  errorMessage : string = "";
  currentFile : File;

  percent: number;
  baseUrl: string;
  constructor(private blob: BlobService,private aiService:ImageService, private dataService: DataService) { 
    this.currentFile = null
    this.config = null
    this.percent = 0
    this.carbRequest = 
    {
      "tag_name": "Cactus Blossom",
      "lon":42.218036999999995,
      "lat":-88.22346470000001
    }

  }

  updateFiles (files) {
    this.currentFile = files[0]
  }

  upload () {
 
    if (this.currentFile !== null) {

      this.baseUrl = this.blob.generateBlobUrl(Config, this.currentFile.name)

      console.log(this.baseUrl)

      this.config = {
        baseUrl: this.baseUrl,
        blockSize: 1024 * 32,
        sasToken: Config.sas,
        file: this.currentFile,
        complete: () => {
          console.log('Transfer completed !')
        },
        error: (err) => {
          console.log('Error:', err)
        },
        progress: (percent) => {
          this.percent = percent
         }
       }
    
    this.blob.upload(this.config)
    this.fileUploaded = true;
    }
    else{
      alert("Please choose or take a picture of the food item :)");
    }
     
  }

  getImageTags(){
    this.loading = true;
    if (this.fileUploaded) {
    // First try and get the image tags from Microsoft Azure Cognitive Services
    this.aiService.getImageDetails(this.baseUrl).subscribe(data=>{
      console.log(data);
      this.tags = data.predictions;

      // If we find anything with high probability we proceed to find the nutrition info
      if (data.predictions[0].probability>0.75) 
      {

        this.foodName = data.predictions[0].tagName;
        this.carbRequest = {
          "tag_name": this.foodName,
          "lon": this.currentLong,
          "lat": this.currentLat
        };

        this.dataService.getCarbs(this.carbRequest)
            .subscribe(data=>{
              console.log(data);
              this.foodDetails = data;
              
            });
        
      }
      else{
        this.errorMessage = "Sorry, we couldn't identify any food item in the picture :(";
      }

    });
    
  }
  else{
    alert("Please upload a picture of the food item :)");
    
  }

    this.loading = false;
  }
  
  getCarbInfo() {
    //this.dataService.saveEvent(form.value);
    this.dataService.getCarbs(this.carbRequest)
            .subscribe(data=>{
              console.log(data);
              this.foodDetails = data;
            })}


  saveToNightscout() {
    alert("We are still working on this feature :)");
    }
            
  ngOnInit() {
    this.fileUploaded = false;
    this.loading = false;
     // Get User Location
     if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  



}
