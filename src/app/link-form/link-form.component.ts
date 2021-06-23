import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';



@Component({
  selector: 'app-link-form',
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss']
})

export class LinkFormComponent implements OnInit {
  
  urlForm!:FormGroup;
  shortLink: string = '';
  loading = false;
  copied = false;
  API_URL:string = "https://api-ssl.bitly.com/v4/shorten";
  constructor(private fb: FormBuilder, private http: HttpClient, private _clipboardService: ClipboardService) { }

  ngOnInit(): void {
    this.urlForm = this.fb.group({
      url: ['', Validators.required]
    })
  }

  shrinkURL(){
    if(this.urlForm.valid){
      this.loading = true;
      const data = { 
        domain: "bit.ly",  
        long_url: this.urlForm.value.url  
      }

      this.http.post(this.API_URL,data).subscribe((val:any)=>{
        this.loading = false;
        this.shortLink = val.link
      })
    }
  }

  copyToClipboard(){
    this._clipboardService.copy(this.shortLink);
    this.copied = true;
  }

}
