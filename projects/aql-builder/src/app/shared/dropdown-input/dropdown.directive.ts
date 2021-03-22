/* Copyright 2021 Better Ltd (www.better.care)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Directive, OnInit, Renderer2, ElementRef, Input} from '@angular/core';
import {DropdownOptions} from './dropdown.model';

@Directive({
  selector: '[buiDropdown]',
  exportAs: 'buiDropdown'
})
export class DropdownDirective implements OnInit {
  @Input() options: DropdownOptions;
  isOpen = false;
  dropdownMenu: HTMLDivElement;

  constructor(public renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit() {
    this.dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
  }

  open() {
    this.renderer.addClass(this.elementRef.nativeElement, 'show');
    this.renderer.addClass(this.dropdownMenu, 'show');
    this.isOpen = true;
    this.applyFixedMenuPosition();
  }

  close() {
    this.renderer.removeClass(this.elementRef.nativeElement, 'show');
    this.renderer.removeClass(this.dropdownMenu, 'show');
    this.isOpen = false;
    this.resetFixedMenuPosition();
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }

  private applyFixedMenuPosition(): void {
    if (this.options && this.options.menuPositionFixed) {
      const parentPosition = this.elementRef.nativeElement.getBoundingClientRect();
      const width = this.options.menuPositionWidth || 'min-content';
      const sideY = this.options.menuPositionY ? this.options.menuPositionY : 'bottom';
      let sideX = this.options.menuPositionX ? this.options.menuPositionX : 'left';


      this.renderer.setStyle(this.dropdownMenu, 'width', width ? width : 'min-content');
      this.renderer.setStyle(this.dropdownMenu, 'position', 'fixed');


      // override positions if element overflows window
      if ((parentPosition.left + this.dropdownMenu.clientWidth) > window.innerWidth) {
        sideX = 'right';
      }

      if ((parentPosition.left - this.dropdownMenu.clientWidth) < 0) {
        sideX = 'left';
      }

      const newPositionX = sideX === 'left' ? parentPosition.left : parentPosition.left - this.dropdownMenu.clientWidth + parentPosition.width;
      this.renderer.setStyle(this.dropdownMenu, 'left', newPositionX + 'px');

      if (sideY === 'bottom') {
        this.renderer.setStyle(this.dropdownMenu, 'top', parentPosition.bottom  + 'px');
      } else {
        this.renderer.setStyle(this.dropdownMenu, 'bottom', parentPosition.top + 'px');
      }
    }
  }

  private resetFixedMenuPosition(): void {
    if (this.options && this.options.menuPositionFixed) {
      this.renderer.removeStyle(this.dropdownMenu, 'position');
      this.renderer.removeStyle(this.dropdownMenu, 'left');
      this.renderer.removeStyle(this.dropdownMenu, 'top');
      this.renderer.removeStyle(this.dropdownMenu, 'bottom');
      this.renderer.removeStyle(this.dropdownMenu, 'width');
    }
  }
}
