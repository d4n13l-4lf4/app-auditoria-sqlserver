import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { TablaComponent } from './tabla/tabla.component';
import { AnomaliasRelacionesComponent } from './anomalias-relaciones/anomalias-relaciones.component';
import { AnomaliasIntegridadComponent } from './anomalias-integridad/anomalias-integridad.component';
import { AnomaliasDatosComponent } from './anomalias-datos/anomalias-datos.component';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    AnomaliasRelacionesComponent,
    AnomaliasIntegridadComponent,
    AnomaliasDatosComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
