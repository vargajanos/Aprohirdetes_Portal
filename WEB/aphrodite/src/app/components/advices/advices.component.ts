import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';

interface advice {
  userId: string,
  category: string,
  price: number,
  description: string,
  title: string,
  image?: any,
  id: string
}

@Component({
  selector: 'app-advices',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, CommonModule, MatSelectModule, MatCardModule],
  templateUrl: './advices.component.html',
  styleUrl: './advices.component.scss'
})

export class AdvicesComponent implements OnInit {

  constructor(
    private api:ApiService,
    private auth:AuthService,
  ){}

  searchText: string = "";
  searchCategory: string = "";
  filteredAdvices: any[] = [];
  loggeduserId = ""
  ngOnInit(): void {
    this.getAdvicesSZEX()
    this.loggeduserId = this.auth.loggedUser().data.id
    console.log(this.loggeduserId)
  }

  categorys: any[] = [
    {value: 'ingatlan', viewValue: 'ingatlan'},
    {value: 'gépjármű', viewValue: 'gépjármű'},
    {value: 'háztartási gép', viewValue: 'háztartási gép'},
    {value: 'játék', viewValue: 'játék'},
    {value: 'ruha', viewValue: 'ruha'},
    {value: 'elektronika', viewValue: 'elektronika'},
    {value: 'sport', viewValue: 'sport'},
    {value: 'bútor', viewValue: 'bútor'},
    {value: 'szerszám', viewValue: 'szerszám'},
  ];

  newadv:advice ={
    userId: "",
    category: "",
    price: 0,
    description: "",
    title: "",
    image: "",
    id: ""
  }

  advices:any[] = []
  addAdv(){
    this.newadv.userId = this.auth.loggedUser().data.id
    console.log(this.newadv)
    
    if(this.newadv.image){
      this.api.uploadFile(this.newadv.image).subscribe((res:any)=>{
        this.newadv.image = res.file.filename
        console.log(this.newadv)
        this.api.insert("adv", this.newadv).subscribe(res=>{
          if(res){
            alert("minden fasza")
            this.newadv ={
              userId: "",
              category: "",
              price: 0,
              description: "",
              title: "",
              image: "",
              id: ""
            }
            this.getAdvicesSZEX()
          }
        })
      })
    }else{
      this.api.insert("adv", this.newadv).subscribe(res=>{
        if(res){
          alert("minden fasza")
          this.newadv ={
            userId: "",
            category: "",
            price: 0,
            description: "",
            title: "",
            image: "",
            id: ""
          }
          this.getAdvicesSZEX()
        }
      })
    }
  }

  @ViewChild('fileInput')
  fileInput:any;

  file: File | null = null;

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    this.newadv.image = this.file
  }

  getAdvicesSZEX(){
    this.api.selectAll("adv").subscribe((res:any)=>{
      this.advices = res;
      this.filteredAdvices = res;
      console.log(this.advices)
    })
  }

  filterAdvices() {
    this.filteredAdvices = this.advices.filter(adv => 
      (this.searchCategory ? adv.category === this.searchCategory : true) &&
      (this.searchText ? adv.title.toLowerCase().includes(this.searchText.toLowerCase()) : true)
    );
  }
  
  dilit(id: string, imgname: string){
    if (confirm("Biztos törlöd?")) {
      this.api.delete("adv", id).subscribe(res=>{
        if (res) {
          if (imgname) {
            this.api.deleteFile(imgname).subscribe(res=>{
              if(res){
                this.getAdvicesSZEX()
              }
            })
          } 
          else{
            alert("Sikeres törlés")
            this.getAdvicesSZEX()
          }
          }

      })
    }
  }
}
