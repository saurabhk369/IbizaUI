import { Component, OnInit } from '@angular/core';
import { BladesManagerService } from 'src/app/blades-manager/blades-manager.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private bladeManager: BladesManagerService) { }

  ngOnInit() {
  }

  registerComponent(componentKey) {
    this.bladeManager.registerBlade(componentKey, true);
  }

}
