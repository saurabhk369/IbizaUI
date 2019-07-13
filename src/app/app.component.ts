import { Component, OnInit } from '@angular/core';
import { BladesManagerService } from './blades-manager/blades-manager.service';
import { BladeContext } from './blades-manager/blade/blade.model';
import { ModalManagerService } from './modal-manager/modal-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blades: BladeContext[] = [];
  headerHeight: string;
  message: any;

  constructor(private bladeManager: BladesManagerService, private modalManager: ModalManagerService) { }

  changePageSize() {
    this.headerHeight = (window.innerHeight - document.getElementsByClassName('navigation')[0].clientHeight) + 'px';
  }

  ngOnInit() {
    window.onload = () => {
      this.changePageSize();
    }

    window.onresize = () => {
      this.changePageSize();
    }

    // this.blades = this.bladeManager.blades;

    const bladeManagerObservable = this.bladeManager.getRegisteredBlades();
    bladeManagerObservable.subscribe((bladesData: BladeContext[]) => {
      this.blades = bladesData;
    });

    this.modalManager.getMessage().subscribe(message => {
      // console.log(message);
      this.message = message;
    })

  }
}
