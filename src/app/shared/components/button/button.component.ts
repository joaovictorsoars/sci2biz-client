import { Component, input, OnInit, output } from '@angular/core';
import {
  ButtonSizeType,
  ButtonStyleType,
  ButtonVariantType,
} from '@shared/types/button/button.type';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  protected styling = '';

  size = input<ButtonSizeType>('md');
  variant = input<ButtonVariantType>('default');
  style = input<ButtonStyleType>('primary');

  ngOnInit(): void {
    this.styling = `${this.buttonSize()} ${this.buttonVariant()} ${this.buttonStyle()}`;
  }

  buttonStyle() {
    switch (this.style()) {
      case 'primary':
        return 'bg-yellow text-black shadow-lg';
    }
  }

  buttonVariant() {
    switch (this.variant()) {
      case 'default':
        return '';
    }
  }

  buttonSize() {
    switch (this.size()) {
      case 'sm':
      case 'lg':
      case 'md':
        return 'h-10 p-4';
    }
  }
}
