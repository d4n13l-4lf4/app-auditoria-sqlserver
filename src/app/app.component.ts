import { Component } from '@angular/core';
import {DbConnectionService} from './db-connection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  respuesta;
  error;
  complete;

  constructor( private readonly _db_connection: DbConnectionService) { }

  obtenerAnomalias() {
    this._db_connection.ejecutarSQL('DBCC CHECKCONSTRAINTS WITH ALL_CONSTRAINTS').subscribe(
      value => {
        this.respuesta = value;
      },
      error1 => {
        this.error = error1;
      },
      () => {
        this.complete = 'Petición completada';
      }
    )
  }
}
