import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const slideAnimation: AnimationTriggerMetadata = trigger(
  'slideAnimation', // Il nome del trigger come al solito andrà su [@slideAnimation] nel div da animare
  [
    state('left', style({ 'margin-left': 0 })),
    state('right', style({ 'margin-left': 350 })),
    transition('left <=> right', animate('2s ease')),
  ]
);
