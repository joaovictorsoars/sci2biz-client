import { Component } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  imports: [ButtonComponent, CardComponent],
  standalone: true,
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
