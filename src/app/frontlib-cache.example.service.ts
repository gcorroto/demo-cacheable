import { Injectable } from '@angular/core';
import { Cache, Cacheable, CacheableService, Evict, CachePut } from '@grec0/ngx-cachemanager';
import { Observable } from 'rxjs';

@Cacheable({defaultStrategy: 'http', logger: true})
@Injectable({
  providedIn: 'root'
})
export class FrontlibCacheExampleService extends CacheableService {

  constructor() {
    super();
   }

   data: number = 0;
   dataId: number = 1;

    @CachePut({key: 'value-observable-simple', map: 'value-observable'})
    addOneValueObservable(data: number): Observable<number> {
      return new Observable((observer) => {
        setTimeout(()=>{
          this.data +=data;
          console.info(`***** REAL CALL addOneValueObservable ${data} ********`);
          observer.next(this.data);
          observer.complete();
        },3000)
      });
    }

    @Cache({key: 'value-observable-simple', map: 'value-observable'})
    readValueObservable(): Observable<number> {
      return new Observable((observer) => {
        setTimeout(()=>{
          console.info(`***** REAL CALL readValueObservable ********`);
          observer.next(this.data);
          observer.complete();
        },3000)
      });
    }


    @Evict({maps: [{ keys:['value-observable-simple'], map:'value-observable' }]})
    evictValueObservable(data: number): number {
     console.info(`***** REAL CALL evictValueObservable ********`);
      this.data = data;
      return this.data;
    }

    @Cache({ map: 'https://swapi.dev/api', key: 'planets/#{1}/?format=wookiee'})
    consultaPorId(id: number): Observable<any> {
      return new Observable((observer) => {
        setTimeout(()=>{
          console.info(`***** REAL CALL consultaPorId ********`);
          observer.next(id);
          observer.complete();
        },3000)
      });
    }

    @Cache({ map: 'value-observable', timeout: 5000})
    consultaPorIdTimeOut(id: number): Observable<number> {
      return new Observable((observer) => {
        setTimeout(()=>{
          console.info(`***** REAL CALL consultaPorIdTimeOut ********`);
          observer.next(id);
          observer.complete();
        },3000)
      });
    }

    @Evict({maps: [{ keys:['planets/#{1}/?format=wookiee'], map:'https://swapi.dev/api' }]})
    evictConsultaPorId(id: number): Observable<number> {
      return new Observable((observer) => {
        setTimeout(()=>{
          console.info(`***** REAL CALL evictConsultaPorId ********`);
          observer.next(id);
          observer.complete();
        },3000)
      });
    }

    @Evict({maps: [{ keys:['consultaPorIdTimeOut-[#{1}]'], map:'value-observable' }]})
    evictConsultaPorIdTimeOut(id: number): Promise<number> {
      return new Promise((s) => {
        setTimeout(()=>{
          console.info(`***** REAL CALL evictConsultaPorIdTimeOut ********`);
          s(id);
        },3000)
      });
    }

    /// IMPLICITO

    // @CachePut({key: 'readValueObservable-[]'})
    // addOneValueObservable(data: number): Observable<number> {
    //   return new Observable((observer) => {
    //     setTimeout(()=>{
    //       this.data +=data;
    //       console.info(`***** REAL CALL addOneValueObservable ${data} ********`);
    //       observer.next(this.data);
    //       observer.complete();
    //     },3000)
    //   });
    // }

    // @Cache()
    // readValueObservable(): Observable<number> {
    //   return new Observable((observer) => {
    //     setTimeout(()=>{
    //       console.info(`***** REAL CALL readValueObservable ********`);
    //       observer.next(this.data);
    //       observer.complete();
    //     },3000)
    //   });
    // }

    // @Evict({maps: [{ keys:['readValueObservable-[]'], map:'FrontlibCacheExampleService' }]})
    // evictValueObservable(data: number): number {
    //   console.info(`***** REAL CALL evictValueObservable ********`);
    //   this.data = data;
    //   return this.data;
    // }



}
