import { Component } from '@angular/core';
import {DbConnectionService} from './db-connection.service';
import {relaciones_existentes} from './sql_queries/relaciones-existentes';
import {relaciones_requiere_integridad_referencial} from './sql_queries/relaciones-requieren-integridad-referencial';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  cabeceras = [];
  datos = [];
  valor = [];
  atributos = [];
  respuesta;
  error;
  complete;

  constructor( private readonly _db_connection: DbConnectionService) { }
  obtenerRelacionesExistentes() {
    this._db_connection.ejecutarSQL(relaciones_existentes).subscribe(
      value => {
        this.respuesta = value;
        this.cabeceras = Object.keys(this.respuesta[0]);
        this.datos = Object.values(this.respuesta);
        this.recorrerAtributos();
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
        this.cabeceras = Object.keys(this.respuesta[0]);
        this.datos = Object.values(this.respuesta);
        this.recorrerAtributos();
      }
    );
  }
  recorrerAtributos() {
    for (let i = 0; i < this.datos.length; i++) {
      const obj = this.datos[i];
      const keys = Object.keys(this.datos[i]);
      for (let j = 0; j < keys.length; j++) {
        this.valor.push(obj[keys[j]]);
      }
      this.atributos.push(this.valor);
      this.valor = [];
    }
  }

}
