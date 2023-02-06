import { Component, OnInit } from '@angular/core';
import { Objetive } from 'src/app/Classes/objetive';
import { ObjetivesService } from 'src/app/Services/objetives.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{ 

  // objetives:Objetive[] = [];    // no sé por qué no funciona este, resolver
  objetives:any = [];
  finished:any = [];
  objetive:Objetive = new Objetive;
  objetiveToEdit:Objetive = new Objetive;

  moneyPercentage:number;
  datePercentage:number;
  daysLeft:number;

  constructor(private service:ObjetivesService){}

  ngOnInit(): void {
    this.objetive = new Objetive;
    this.listObjetives();
    this.listFinished();

    // Valores del objetivo default
    // this.objetive.image = "no-image.png"; 
    this.objetive.currentMoney = 0;
    this.objetive.totalMoney = 1;
    this.objetive.startDate = new Date(); // El desafio empieza el dia de hoy
    this.objetive.endDate = new Date();

    this.objetive.finished = 1; // No modificar ---- 0=finalizado, 1=por cumplir
  }

  listObjetives() {
    this.service.listObjetives().subscribe(
      data => {
        this.objetives = data;

        // Calcular porcentajes de dinero y tiempo restante
        this.objetives.map((element: any) => {

          // Calcular el porcentaje de dias restantes
          let startDate = new Date(element.startDate);
          let today = new Date();
          let deadline = new Date(element.endDate);

          let daysLeftMethod = Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          let datePercentageMethod = ((today.getTime() - startDate.getTime()) / (deadline.getTime() - startDate.getTime())) * 100;

          element.daysLeft = daysLeftMethod; // Dias restantes
          element.datePercentage = datePercentageMethod;  // Porcentaje de dias restantes
          
          // Calcular y asignar el porcentaje de dinero
          element.moneyPercentage = Math.round((element.currentMoney / element.totalMoney) * 100);
      });
      },
      err => { console.log(err) }
    )
  }

  listFinished(){
    this.service.listFinished().subscribe(
      data => {
        this.finished = data

        this.finished.map((element: any) => {
          
          // Calcular el porcentaje de dias restantes
          let startDate = new Date(element.startDate);
          let today = new Date();
          let deadline = new Date(element.endDate);

          let daysLeftMethod = Math.round((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          let datePercentageMethod = ((today.getTime() - startDate.getTime()) / (deadline.getTime() - startDate.getTime())) * 100;

          element.daysLeft = daysLeftMethod; // Dias restantes
          element.datePercentage = datePercentageMethod;  // Porcentaje de dias restantes

          // Calcular y asignar el porcentaje de dinero
          element.moneyPercentage = Math.round((element.currentMoney / element.totalMoney) * 100);
        })
      },
      err => {console.log(err)}
    )
  }
  
  listObjetive(id: number) {
    this.service.listObjetive(id).subscribe( data => { this.objetive = data}, err => { console.log(err) })} 

  saveObjetive(){
    this.service.saveObjetive(this.objetive).subscribe(
      data => {
        console.log(this.objetive);
        location.reload();
      }, 
      err => {console.log(err)}
      )
    }

  editObjetive(id:number, newObjetive:Objetive){
    this.service.editObjetive(id, newObjetive).subscribe(
      data => {location.reload()},
      err => {console.log(err)}
    )
  }

  deleteObjetive(id: number) {
    this.service.deleteObjetive(id).subscribe(
      data => { location.reload() },
      err => { console.log(err) }
    )
  }

    // Recibido desde el componente card
    // ID recibido desde el <app-card>
    receivedId: number;
    receiveId(id: number) {
      this.receivedId = id;
      this.listObjetiveToEdit(id);
    }

    listObjetiveToEdit(id: number) {
      this.service.listObjetive(id).subscribe(
        data => { this.objetiveToEdit = data },
        err => { console.log(err) }
      )
    }

}
