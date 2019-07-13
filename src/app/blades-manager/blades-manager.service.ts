import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Observer } from 'rxjs';
import { BladeContext } from './blade/blade.model';
import { ModalManagerService } from '../modal-manager/modal-manager.service';

@Injectable({
  providedIn: 'root'
})
export class BladesManagerService {

  validComponents = [
    'one', 'two', 'three'
  ]

  private _bladesSource: BehaviorSubject<BladeContext[]>;
  blades = new Array<BladeContext>();

  isDirty = false;

  constructor(private modalManager: ModalManagerService) { }

  registerBlade(componentKey: string, entry: boolean = false, activeBladeId: number = -1) {
    if (!this.validComponents.includes(componentKey)) { return; }
    if (entry) {
      if (this.isDirtyBladePresent()) {
        const that = this;
        this.modalManager.confirm(
          {
            title: 'Confirm',
            content: 'You have unsaved work. Are you sure you want to close?',
          },
          function () {
            that.removeBlade(that.blades[0].id, false);
            that.createBlade(componentKey, entry);
          },
          function () {
            return;
          }
        );
        // if (confirm('You have unsaved work. Are you sure you want to close?')) {
        // this.removeBlade(this.blades[0].id, false);
        // this.createBlade(componentKey, entry);
        // } else {
        //   return;
        // }
      } else {
        if (this.blades.length) {
          this.removeBlade(this.blades[0].id, false);
        }
        this.createBlade(componentKey, entry);
      }
    } else {
      if (this.isDirtyBladePresent()) {
        let dirtyPresent = false;
        for (let i = this.getBladeIndex(activeBladeId); i < this.blades.length; i++) {
          if (this.blades[i].isDirty) {
            dirtyPresent = true;
          }
        }
        if (dirtyPresent) {
          const that = this;
          this.modalManager.confirm(
            {
              title: 'Confirm',
              content: 'You have unsaved work. Are you sure you want to close?',
            },
            function () {
              if (that.blades[that.getBladeIndex(activeBladeId) + 1]) {
                that.removeBlade(that.blades[that.getBladeIndex(activeBladeId) + 1].id, false);
              }
              that.createBlade(componentKey, entry);
            },
            function () {
              return;
            });
          // if (confirm('You have unsaved work. Are you sure you want to close?')) {
          //   this.blades.length = this.getBladeIndex(bladeId);
          //   this._bladesSource.next(this.blades);
          // } else {
          //   return;
          // }
        } else {
          return;
        }
      } else {
        if (this.blades[this.getBladeIndex(activeBladeId) + 1]) {
          this.removeBlade(this.blades[this.getBladeIndex(activeBladeId) + 1].id, false);
        }
        this.createBlade(componentKey, entry);
      }
    }
  }

  createBlade(componentKey: string, entry: boolean) {
    const bladeContext = new BladeContext();
    bladeContext.componentKey = componentKey;
    bladeContext.id = parseInt(Math.random().toString(10).substr(2, 9), 10);
    bladeContext.entry = entry;
    bladeContext.isDirty = false;
    this.blades.push(bladeContext);
    this._bladesSource = new BehaviorSubject([]);
    this._bladesSource.next(this.blades);
  }

  getRegisteredBlades(): Observable<BladeContext[]> {
    const bladeObservable = new Observable<BladeContext[]>(Observer => {
      Observer.next(this.blades);
    });
    return bladeObservable;
  }

  removeBlade(bladeId, showMessage: boolean = true) {
    let dirtyPresent = false;
    for (let i = this.getBladeIndex(bladeId); i < this.blades.length; i++) {
      if (this.blades[i].isDirty) {
        dirtyPresent = true;
      }
    }
    if (dirtyPresent && showMessage) {
      const that = this;
      this.modalManager.confirm(
        {
          title: 'Confirm',
          content: 'You have unsaved work. Are you sure you want to close?',
        },
        function () {
          that.blades.length = that.getBladeIndex(bladeId);
          that._bladesSource.next(that.blades);
        },
        function () {
          return;
        });
      // if (confirm('You have unsaved work. Are you sure you want to close?')) {
      //   this.blades.length = this.getBladeIndex(bladeId);
      //   this._bladesSource.next(this.blades);
      // } else {
      //   return;
      // }
    } else {
      this.blades.length = this.getBladeIndex(bladeId);
      this._bladesSource.next(this.blades);
    }
  }

  getBladeIndex(bladeId): number {
    const index = this.blades.findIndex((b) => {
      if (b.id === bladeId) {
        return true;
      }
    });
    return index;
  }

  findBlade(bladeId): BladeContext {
    return this.blades.find((b) => b.id === bladeId);
  }

  setDirtyBlade(bladeId: number) {
    this.findBlade(bladeId).isDirty = true;
    // this.isDirty = true;
  }

  unsetDirtyBlade(bladeId: number) {
    this.findBlade(bladeId).isDirty = false;
    // this.isDirty = false;
  }

  isDirtyBladePresent() {
    // if (this.blades.length) {
    //     return true;
    // }
    // return this.isDirty;
    let present = false;
    this.blades.forEach(blade => {
      if (blade.isDirty === true) {
        present = true;
      }
    });
    return present;
  }

  isDirtyBlade(bladeId) {
    return this.findBlade(bladeId).isDirty;
  }


}