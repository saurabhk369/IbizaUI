import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BladeComponent } from './blades-manager/blade/blade.component';
import { OneComponent } from './components/one/one.component';
import { TwoComponent } from './components/two/two.component';
import { ThreeComponent } from './components/three/three.component';
import { HeaderMenuComponent } from './navigation/header-menu/header-menu.component';
import { MainMenuComponent } from './navigation/main-menu/main-menu.component';
import { ModalComponent } from './modal-manager/modal/modal.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { BladesManagerService } from './blades-manager/blades-manager.service';
import { ModalManagerService } from './modal-manager/modal-manager.service';

library.add(fas, far);

@NgModule({
   declarations: [
      AppComponent,
      BladeComponent,
      OneComponent,
      TwoComponent,
      ThreeComponent,
      HeaderMenuComponent,
      MainMenuComponent,
      ModalComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      FontAwesomeModule,
      NgScrollbarModule
   ],
   providers: [
      BladesManagerService,
      ModalManagerService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      OneComponent,
      TwoComponent,
      ThreeComponent
   ]
})
export class AppModule { }
