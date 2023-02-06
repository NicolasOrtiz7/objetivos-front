import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Objetive } from '../Classes/objetive';

@Injectable({
  providedIn: 'root'
})
export class ObjetivesService implements OnInit{

  url:string = "http://localhost:8080";

  constructor(private http:HttpClient) { }

  ngOnInit(){
    
  }

  listObjetives(){
    return this.http.get(this.url+"/objetives");
  }

  listFinished(){
    return this.http.get(this.url+"/finished");
  }

  saveObjetive(objetive:Objetive){
    return this.http.post(this.url+"/new", objetive);
  }

  listObjetive(id:number): Observable<Objetive>{
    return this.http.get<Objetive>(this.url+"/"+id);
  }

  editObjetive(id:number, objetive:Objetive){
    return this.http.put(this.url+"/edit/"+id, objetive);
  }

  deleteObjetive(id:number){
    return this.http.delete(this.url+"/delete/"+id);
  }

}
