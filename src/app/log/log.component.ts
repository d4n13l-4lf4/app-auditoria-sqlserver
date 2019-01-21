import { Component, OnInit } from '@angular/core';
import {LogService} from '../log.service';
import {DbConnectionService} from '../db-connection.service';
import {relaciones_necesarias} from '../sql_queries/relaciones-necesarias';
import {relaciones_existentes} from '../sql_queries/relaciones-existentes';
import {creacion_auditoria, espec_audit_bd, habilitacion_auditoria} from '../sql_queries/habilitacion-auditoria';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  log_habilitado = true;

  constructor(
    private readonly dbConnection: DbConnectionService
  ) { }

  ngOnInit() {
  }

  generarLog(s) {
    console.log(s);
  }

  habilitarAuditoria() {
    this.dbConnection.ejecutarSQL(creacion_auditoria).subscribe(
      value => {
        this.dbConnection.ejecutarSQL(habilitacion_auditoria).subscribe(
          value1 => {
            this.dbConnection.ejecutarSQL(espec_audit_bd).subscribe(
              value2 => {
                this.log_habilitado = false;
              }
            );
          }
        );
      }
    );

  }

}
