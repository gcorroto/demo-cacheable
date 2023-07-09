import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CacheConfigService, NgxCachemanagerModule } from '@grec0/ngx-cachemanager';

export function initializer(cacheConfig: CacheConfigService): () => Promise<any> {
	return (): Promise<any> => cacheConfig.loadGlobalConfig({logger:true});
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxCachemanagerModule
  ],
  exports: [HttpClientModule],
  providers: [
    {
			provide: APP_INITIALIZER,
			useFactory: initializer,
			deps: [CacheConfigService],
			multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
