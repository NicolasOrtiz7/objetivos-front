import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Objetive } from 'src/app/Classes/objetive';
import { ObjetivesService } from 'src/app/Services/objetives.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() temp:Objetive;

  objetives: any = [];
  finished: any = [];
  objetive: Objetive = new Objetive;
  money: number;

  constructor(private service: ObjetivesService) { }

  ngOnInit(): void {
    // this.listObjetives();
    // this.listFinished();
  }
  
  // Enviar ID al <app-home> al presionar el botón de editar o eliminar
  @Output() sendIdEvent = new EventEmitter<number>();
  sendId(id:number) {
    this.sendIdEvent.emit(id);
  }

  finishObjetive(id:number, objetive:Objetive){
    this.service.listObjetive(id).subscribe(
      data => {
        objetive.finished = 0;
        this.service.editObjetive(id, objetive).subscribe(
          data => {
            console.log("Objetivo Finalizado con exito");
            console.log(objetive);
            location.reload();
          }, 
          err => {console.log(err)}
        )
      },
      err => {console.log(err)}
    )
  }
  
  restartObjetive(id:number, objetive:Objetive){
    this.service.listObjetive(id).subscribe(
      data => {
        objetive.finished = 1;
        this.service.editObjetive(id, objetive).subscribe(
          data => {
            console.log("Objetivo Restaurado con exito");
            console.log(objetive);
            location.reload();
          }, 
          err => {console.log(err)}
        )
      },
      err => {console.log(err)}
    )
  }

  addMoney(id: number) {
    this.service.listObjetive(id).subscribe(
      data => {
        this.objetive = data;

        // Evita que el "currentMoney" se convierta en "NaN" al enviar el input vacío
        let safeMoney = this.objetive.currentMoney;
        this.objetive.currentMoney += Math.abs(this.money);
        if(isNaN(this.objetive.currentMoney)) this.objetive.currentMoney = safeMoney;

        this.service.editObjetive(this.objetive.id, this.objetive).subscribe(
          data => {
            console.log("Guardado correctamente");
            console.log(this.objetive);
            location.reload();
            // this.ngOnInit(); // Esta forma consume muchos recursos porque hace muchos
                              // updates a la base de datos al spamear el click, 
                              // es mejor recargar la pagina con location.reload() 
                              // o ponerle un tiempo de espera al evento
            console.log(this.objetive);
          },
          err => { console.log(err) })
      },
      err => { console.log(err) }
    )
  }
  subtractMoney(id: number) {
    this.service.listObjetive(id).subscribe(
      data => {
        this.objetive = data;

        let safeMoney = this.objetive.currentMoney;
        this.objetive.currentMoney -= Math.abs(this.money);
        if(isNaN(this.objetive.currentMoney)) this.objetive.currentMoney = safeMoney;

        this.service.editObjetive(this.objetive.id, this.objetive).subscribe(
          data => {
            console.log("Guardado correctamente");
            location.reload();
            // this.ngOnInit();
          },
          err => { console.log(err) })
      },
      err => { console.log(err) }
    )
  }


}





