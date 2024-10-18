import { Component, input, OnInit } from '@angular/core';
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
  type = input<ButtonStyleType>('primary');
  disabled = input(false);

  ngOnInit(): void {
    this.styling = `${this.buttonSize()} ${this.buttonVariant()} ${this.buttonStyle()}`;
  }

  buttonStyle() {
    switch (this.type()) {
      case 'primary':
        return 'bg-primary text-white shadow-lg disabled:bg-gray';
      case 'secondary':
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
      case 'md':
        return 'h-10 p-4';
      case 'lg':
        return 'h-12 p-4';
    }
  }
}
