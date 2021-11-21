import {
  animate,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component } from '@angular/core';
import { slideAnimation } from '../shared/animations';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // Esempio 1
    trigger('openClose', [
      state(
        'open', // Definizione del primo stato, quello di partenza
        style({
          height: '65px',
          backgroundColor: 'green',
        })
      ),
      state(
        'closed', // Definizione del secondo stato
        style({
          height: '0px',
          backgroundColor: 'beige',
        })
      ),
      transition('open <=> closed', [animate('1s')]), // Transizione unica, per muoversi tra i due stati
    ]),
    // Esempio 2
    trigger('welcomeBox', [
      state('default', style({ 'font-size': '20px', background: 'yellow' })),
      transition('* => default', [animate('2s 0.2s ease-out')]),
    ]),
    // Esempio 3
    trigger('welcomeBoxStateless', [
      transition(':enter', [
        style({ 'font-size': '10px', background: 'blue' }), // Stile di partenza
        animate(
          '1s 0.2s ease-out', // Animazione
          style({ 'font-size': '20px', background: 'yellow' })
        ),
        animate('0.8s'), // Tempo per tornare allo stile iniziale, definito nei CSS
      ]),
    ]),
    // Esempio 4
    trigger('queryShake', [
      transition('* => shakeIt', [
        query('.shake', [
          style({ transform: 'rotate(0)' }),
          animate('0.2s', style({ transform: 'rotate(5deg)' })),
          animate('0.4s', style({ transform: 'rotate(-5deg)' })),
          animate('0.3s', style({ transform: 'rotate(5deg)' })),
          animate('0.2s', style({ transform: 'rotate(0)' })),
        ]),
      ]),
    ]),
    // Esempio 5
    slideAnimation,
  ],
})
export class AppComponent {
  // Questo boolean viene usato direttamente nel template, per definire lo stato
  isOpen = true;
  toggle() {
    this.isOpen = !this.isOpen;
  }

  // Stato per l'esempio 4
  shakeState = '';
  shake(animate: boolean): void {
    // Con questo if viene resettato lo stato, altrimenti l'animazione non può essere ripetuta!
    if (animate) {
      this.shakeState = 'shakeIt';
    } else {
      this.shakeState = null;
    }
  }

  // Stato per l'esempio 5
  slideState = 'left';
  slide() {
    // Con questo ternario semplicemente inverto 'left' con 'right' ad ogni click del bottone
    // La logica è molto simile alla funzione shake dell'esempio 4 ma ho usato un ternario anzichè un if/else
    this.slideState = this.slideState == 'left' ? 'right' : 'left';
  }
}
