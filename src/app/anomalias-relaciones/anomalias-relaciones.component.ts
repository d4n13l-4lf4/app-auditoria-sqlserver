import { Component, OnInit } from '@angular/core';
import {relaciones_requiere_integridad_referencial} from '../sql_queries/relaciones-requieren-integridad-referencial';
import {relaciones_existentes} from '../sql_queries/relaciones-existentes';
import {DbConnectionService} from '../db-connection.service';

@Component({
  selector: 'app-anomalias-relaciones',
  templateUrl: './anomalias-relaciones.component.html',
  styleUrls: ['./anomalias-relaciones.component.css']
})
export class AnomaliasRelacionesComponent implements OnInit {
  cabecerasRE = [];
  datosRE = [];
  cabecerasIR = [];
  datosIR = [];
  respuesta;
  error;
  complete;
  constructor( private readonly _db_connection: DbConnectionService) { }

  ngOnInit() {
  }
  obtenerRelacionesExistentes() {
    this._db_connection.ejecutarSQL(relaciones_existentes).subscribe(
      value => {
        this.respuesta = value;
        this.cabecerasRE = Object.keys(this.respuesta[0]);
        this.datosRE = Object.values(this.respuesta);
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Petición completada';
      }
    );
  }
  obtenerRelacionesRequierenIR() {
    this._db_connection.ejecutarSQL(relaciones_requiere_integridad_referencial).subscribe(
      value => {
        this.respuesta = value;
        this.cabecerasIR = Object.keys(this.respuesta[0]);
        this.datosIR = Object.values(this.respuesta);
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Petición completada';
      }
    );
  }
  obtenerRelacionesDeberianExistir() {}

}
