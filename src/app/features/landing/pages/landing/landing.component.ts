import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@shared/components/button/button.component';
import { CardComponent } from '@shared/components/card/card.component';

@Component({
  selector: 'app-landing-page',
  imports: [ButtonComponent, CardComponent, RouterLink],
  standalone: true,
  templateUrl: './landing.component.html',
})
export class LandingComponent {}
