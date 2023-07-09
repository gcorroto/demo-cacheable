import { FrontlibCacheExampleService } from './frontlib-cache.example.service';
import { Component, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'demo-cacheable';
  @Output() message: string;
  @Output() dataValue: number;

  constructor(private readonly demoService: FrontlibCacheExampleService) {

  }
  ngOnInit(): void {
    // this.initDataSync();
  }

  asyncAddOneValueObservable() {
    this.addOneValueObservable();
  }

  asyncReadValueObservable() {
    this.readValueObservable();
  }

  syncCleanValueObservable() {
    this.evictValueObservable();
  }
  //// consultas

  asyncConsultaDbPorId() {
    this.consultaDbPorId();
  }
  asyncEvictConsultaPorId() {
    this.evictConsultaPorId();
  }
  asyncConsultaDbPorIdTimeout() {
    this.consultaDbPorIdTimeout();
  }
  asyncEvictConsultaPorIdTimeout() {
    this.evictConsultaPorIdTimeout();
  }

  private addOneValueObservable() {
    const data = this.demoService.addOneValueObservable(1);
    data
    .subscribe(
    (val)=>{
      this.dataValue = val;
      this.message = `return from addOneValueObservable 1 =${val} / ${new Date()}`;
    });
  }

  private readValueObservable() {
    const data = this.demoService.readValueObservable();
    data
    .subscribe(
    (val)=>{
      this.dataValue = val;
      this.message = `return from readValueObservable =${val} / ${new Date()}`;
    });
  }


  private evictValueObservable() {
    const data = this.demoService.evictValueObservable(0);
    this.dataValue = data;
    this.message = `return from evictValueObservable =${data} / ${new Date()}`;
  }

  private consultaDbPorId() {
    const data = this.demoService.consultaPorId(this.dataValue);
    data
    .subscribe(
    (val)=>{
      this.dataValue = val;
      this.message = `return from consultaDbPorId =${val} / ${new Date()}`;
    },(error)=>{
      this.dataValue = 0;
      this.message = `return Error consultaDbPorId =${error} / ${new Date()}`;
    });
  }

  private evictConsultaPorId() {
    const data = this.demoService.evictConsultaPorId(this.dataValue);
    data
    .subscribe(
    (val)=>{
      this.dataValue = val;
      this.message = `return from evictConsultaPorId =${val} / ${new Date()}`;
    },(error)=>{
      this.dataValue = 0;
      this.message = `return Error evictConsultaPorId =${error} / ${new Date()}`;
    });
  }

  private consultaDbPorIdTimeout() {
    const data = this.demoService.consultaPorIdTimeOut(this.dataValue);
    data
    .subscribe(
    (val)=>{
      this.dataValue = val;
      this.message = `return from consultaDbPorIdTimeout =${val} / ${new Date()}`;
    });
  }

  private evictConsultaPorIdTimeout() {
    const data = this.demoService.evictConsultaPorIdTimeOut(this.dataValue);
    data
    .then(
    (val)=>{
      this.dataValue = val;
      this.message = `return from evictConsultaPorIdTimeout =${val} / ${new Date()}`;
    });
  }

}
