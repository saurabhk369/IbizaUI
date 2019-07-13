import { Component, OnInit, Input } from '@angular/core';
import { BladesManagerService } from 'src/app/blades-manager/blades-manager.service';
import { BladeContext } from 'src/app/blades-manager/blade/blade.model';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {

  @Input() bladeDetails: BladeContext;

  constructor(private bladeManager: BladesManagerService) { }

  ngOnInit() {
  }

  registerComponent(componentKey) {
    this.bladeManager.registerBlade(componentKey, false, this.bladeDetails.id);
  }

  makeDirty() {
    this.bladeManager.setDirtyBlade(this.bladeDetails.id);
  }

  makeClear() {
    this.bladeManager.unsetDirtyBlade(this.bladeDetails.id);
  }

}
