import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { BladeContext } from './blade.model';
import { BladesManagerService } from '../blades-manager.service';
import { OneComponent } from '../../components/one/one.component';
import { TwoComponent } from '../../components/two/two.component';
import { ThreeComponent } from '../../components/three/three.component';

@Component({
  selector: 'app-blade',
  templateUrl: './blade.component.html',
  styleUrls: ['./blade.component.css']
})
export class BladeComponent implements OnInit {

  @Input() context: BladeContext;
  @Input() bladeState = false;

  @ViewChild('bladeContent', { static: true, read: ViewContainerRef }) entry: ViewContainerRef; // , { read: ViewContainerRef })

  componentsMapping = {
    'one': OneComponent,
    'two': TwoComponent,
    'three': ThreeComponent
  };

  componentRef: any;

  constructor(private resolver: ComponentFactoryResolver, private bladeManager: BladesManagerService) { }

  ngOnInit() {
    this.createComponent(this.context);
  }

  createComponent(context: BladeContext) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(this.componentsMapping[context.componentKey]);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.bladeDetails = context;
  }

  destroyComponent() {
    this.componentRef.destroyComponent();
  }

  changeBladeState() {
    this.bladeState = !this.bladeState;
  }

  close() {
    this.bladeManager.removeBlade(this.context.id);
  }

}
