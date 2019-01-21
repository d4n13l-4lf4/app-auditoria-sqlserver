import { Component, OnInit } from '@angular/core';
import {DbConnectionService} from '../db-connection.service';
import {anomalias_constraints, anomalias_relaciones_necesarias} from '../sql_queries/anomalias-datos';
import {relaciones_existentes} from '../sql_queries/relaciones-existentes';
import {getProjectAsAttrValue} from '@angular/core/src/render3/node_selector_matcher';
import {relaciones_necesarias} from '../sql_queries/relaciones-necesarias';

@Component({
  selector: 'app-anomalias-datos',
  templateUrl: './anomalias-datos.component.html',
  styleUrls: ['./anomalias-datos.component.css']
})
export class AnomaliasDatosComponent implements OnInit {

  cabecerasConstraints = [];
  datosConstraints = [];
  cabecerasAnomaliaDatos = [];
  datosAnomaliaDatos = [];
  valores = [];
  respuesta;
  error;
  complete;
  constructor(private readonly _db_connection: DbConnectionService) { }

  ngOnInit() {
  }
  obtenerAnomaliaConstraints() {
    this._db_connection.ejecutarSQL(anomalias_constraints).subscribe(
      value => {
        this.respuesta = value;
        this.cabecerasConstraints = Object.keys(this.respuesta[0]);
        this.datosConstraints = Object.values(this.respuesta);
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Peticion Completada';
      }
    );
  }
  obtenerAnomaliaDatos() {
    this._db_connection.ejecutarSQL(relaciones_necesarias).subscribe(
      value => {
        this.respuesta = value;
        this.valores = Object.values(this.respuesta);
        this.buscarAnomaliaDatos();
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Peticion Completada';
      }
    );
  }
  buscarAnomaliaDatos() {
    // console.log(this.respuesta);
    let tablaPadre;
    let columnaPadre;
    let tablaHija;
    let columnaHija;
    for (let i = 0; i < this.valores.length; i++) {
      // console.log(this.valores[i]);
      tablaPadre = Object.values(this.valores[i])[0];
      columnaPadre = Object.values(this.valores[i])[1];
      tablaHija = Object.values(this.valores[i])[2];
      columnaHija = Object.values(this.valores[i])[3];
      const querySQL = anomalias_relaciones_necesarias(tablaPadre, columnaPadre, tablaHija, columnaHija);
      this._db_connection.ejecutarSQL(querySQL).subscribe(
        value => {
          this.respuesta = value;
          this.cabecerasAnomaliaDatos = Object.keys(this.respuesta[0]);
          this.datosAnomaliaDatos = Object.values(this.respuesta);
        },
        error1 => {
          this.error = error1;
        },
        () => {
          this.complete = 'Peticion completada';
        }
      );
    }
  }
}
