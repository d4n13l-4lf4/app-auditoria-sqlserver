import { Component, OnInit } from '@angular/core';
import {DbConnectionService} from '../db-connection.service';

import {creacion_auditoria, espec_audit_bd, habilitacion_auditoria, prefijo_archivo_log} from '../sql_queries/habilitacion-auditoria';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  logDeshabilitado = true;
  respuesta;
  error;
  prefijo;

  constructor(
    private readonly dbConnection: DbConnectionService
  ) { }

  ngOnInit() {
  }

  generarLog() {
  }
  obtenerPrefijo() {
    this.dbConnection.ejecutarSQL(prefijo_archivo_log).subscribe(
      value => {
        this.respuesta = value;
        this.prefijo = Object.values(this.respuesta)[0];
        this.prefijo = this.prefijo.split('.')[0] + '*.' + this.prefijo.split('.')[1];
        console.log(this.prefijo);

      },
      error1 => {
        this.error = error1;
      }
    );
  }

  habilitarAuditoria() {
    if (this.logDeshabilitado) {
      this.dbConnection.ejecutarSQL(creacion_auditoria).subscribe(
        value => {
          this.dbConnection.ejecutarSQL(habilitacion_auditoria).subscribe(
            value1 => {
              this.dbConnection.ejecutarSQL(espec_audit_bd).subscribe(
                value2 => {
                  this.logDeshabilitado = false;
                }
              );
            }
          );
        }
      );
    }
  }

}
