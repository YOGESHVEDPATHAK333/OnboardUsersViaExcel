import { Component, OnInit, ViewChild } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { UserService } from '../service/user.service';  
import { User } from '../model/user';  

@Component({
  selector: 'app-excelimport',
  templateUrl: './excelimport.component.html',
  styleUrls: ['./excelimport.component.css']
})
export class ExcelimportComponent implements OnInit {
  @ViewChild('fileInput') fileInput;  
  message: string;  
  allUsers: Observable<User[]>;
  constructor(private http: HttpClient, private service: UserService) { }


  ngOnInit() {  
    this.loadAllUser();  
  }  
  loadAllUser() {  
    this.allUsers = this.service.BindUser();  
  }  
  uploadFile() {  
    let formData = new FormData();  
    formData.append('upload', this.fileInput.nativeElement.files[0])  
  
    this.service.UploadExcel(formData).subscribe(result => {  
      this.message = result.toString();  
      this.loadAllUser();  
    });   
  }
}
