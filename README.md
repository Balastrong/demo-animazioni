Demo e spiegazioni realizzati su commissione, per richiedere ulteriori informazioni o hai una richiesta in particolare, mi trovi su Fiverr: https://www.fiverr.com/balastrong

# Animazioni Angular

Angular offre una serie di metodi e strutture per implementare in maniera semplice animazioni per gli elementi del DOM, lasciando definire i comportamenti in maniera semplice senza dover implementare tutto a mano lato CSS.

Le animazioni Angular sono costruite sulle transizioni CSS, quindi qualsiasi cosa che si può animare tramite CSS, è animabile anche tramite le strutture di Angular (per farti un'idea di cosa si può e ocsa non si può fare).

## Super in breve

Le animazioni permettono di definire degli stati (stili CSS) insieme alle logiche che indicano quando e come passare da uno stato all'altro, che è di fatto l'animazione (menu chiuso => menu aperto)

## Requisiti

Per far funzionare le istruzioni relative alle animazioni, è necessario installare i pacchetti `@angular/animations`, `@angular/platform-browser` e `@angular/platform-browser-dynamic` nel proprio progetto angular, quindi da linea di comando dopo essersi posizionati nella root del proprio progetto, uno alla volta:

```
npm install --save @angular/animations
npm install --save @angular/platform-browser
npm install --save @angular/platform-browser-dynamic
```

Sul file `module` in cui sono dichiarati i Component che usano le animazioni, è necessario aggiungere `BrowserAnimationsModule` nell'array degli `imports`.

```
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserAnimationsModule],
```

## Istruzioni principali

Le istruzioni principali da conoscere ed usare sono:

- animations
- trigger
- state
- style
- transition
- animate

### Animations

All'interno della direttiva @Component, insieme ai percorsi su dove trovare il template html ed il file css con lo stile, per quanto riguarda la definizione delle animazioni va inserita la proprietà `animations`.

Come valore viene accettato un array di animazioni, quindi la lista delle possibili animazioni presenti nel componente.

Sarà qualcosa come:

```
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    ...
  ],
})
export class AppComponent {
```

### Trigger

Per avviare un'animazione è necessario dire ad Angular quando farla partire, per questo ci sono i trigger.

Alla funzione trigger dovrai passare come primo parametro il nome. Sceglilo bene perchè sarà poi lo stesso nome che andrai a definire nell'elemento HTML nel template per indicare che quell'elemento subirà poi le animazioni definite in questo trigger.

Come secondo parametro, il trigger richiede un array di AnimationMetadata, cioè tutto ciò che serve per definire l'animazione. Per esempio state e transition per definire i vari stati dell'animazione (possono essere più di due!) e l'ordine in cui si possono muovere.

L'utilizzo nel template html sarà così:

```
<div [@nomeDelTrigger]="espressione"> ... </div>
```

Dove `nomeDelTrigger` è lo stesso che hai messo nel component.ts (dentro a `trigger('nomeDelTrigger', [ ... ])`) ed `espressione` è una funzione che ritorna una stringa. La stringa sarà il nome dello stato in cui si deve trovare l'animazione.

### State

Lo stato è una definizione dello stile di un componente, specificato tramite la funzione style di cui ti parlo poco più avanti.
Un'animazione può avere due stati, ma anche uno, tre o qualsiasi altro numero.

Così come i trigger, anche gli stati vogliono come prima cosa un nome. Il nome verrà poi dato in pasto alle transition che definiranno la sequenza degli stati.

Insomma, il principio è quello di una normale macchina a stati (o automa a stati finiti). Hai una definizione di stati (gli stili) e una definizione delle transizioni (da che stato vai a che altro stato).

Nel caso semplice, gli stati sono due (aperto e chiuso) e le transizioni due, da aperto a chiuso e viceversa.

#### Style

Questo è molto semplice, all'interno di `style()` ci va un normale oggetto javascript chiave->valore che definisce quali proprietà CSS devono essere applicate ad uno stato.

Ad esempio: `style({ background: "red", color: "blue" })`

Attenzione, se la proprietà css ha dei caratteri speciali (solitamente il `-`) devi metterlo tra virgolette.

Per esempio: `style({ "background-color": "red", color: "blue" })`

### Transition

Definisce una possibile transizione, cioè da che stato a che stato è possibile passare, ed in che modo (tramite l'animate).

Il primo parametro è la definizione della transizione. Può essere espresso come funzione typescript, o molto più semplicemente con una stringa contenente il nome dei due stati ed una freccia `=>`.

- `open => closed` indica che dallo state con il nome `open` è possibile passare allo state con il nome `closed`.

- `open <=> closed` è una scorciatoia per dire in un'unica istruzione che si può andare da open a close e viceversa.

Il secondo parametro di transition, dopo aver definito la sequenza degli stati, definisce le tempistiche ed è proprio animate.

Se ti dovesse servire, puoi anche usare la wildcard `*` che significa "qualsiasi stato" in `* => nomeStato`.

#### Animate

Animate gestisce il tempo di una transizione.

Se ti interessa solo specificare la durata, puoi semplicemente esprimerla con il numero di millisecondi `animate(2500)`.

Se vuoi un po' più controllo, puoi indicare `animate("durata ritardo modalità")` dove:

- Durata sono i millisecondi dell'animazione (puoi anche usare l'unità di misura, quindi `2s` sono due secondi)
- Ritardo è il tempo da aspettare prima che l'animazione inizi
- Modalità indica se vuoi rallentare all'inizio o alla fine (ad esempio `ease-in` per iniziare lentamente poi accelerare o `ease-out` per partire veloce e rallentare alla fine, `ease` per una transizione fluida).

Probabilmente hai riconosciuto che questi tre parametri sono gli stessi che daresti alla proprietà CSS `transition` se volessi fare un'animazione. Occhio a non far confusione, qua su angular per transition si intende un'altra cosa come visto prima!

## Riassunto

Quindi, da un punto di vista delle dipendenze:

- Un componente può avere un array di animazioni, dentro `animations`.
- Ciascuna animazione è definita innanzitutto da un `trigger` con un nome da usare nel tempalte HTML.
- Ciascun `trigger` ha una serie di possibili stati e transizioni che li collegano.
- - Ciascuno stato ha un nome ed una definizione del suo stile.
- - - Lo stile definisce quali regole CSS vanno applicate.
- - Ciascuna transizione definisce da che stato a che stato è possibile spostarsi e può avere delle tempistiche personalizzate.
- - - Le tempistiche delle transizioni si definiscono tramite la `animate`, che prende in input il tempo, il ritardo e la modalità.

## Esempi

Nella cartella `/app` ci sono delle demo per mostrare alcuni casi interessanti che ti saranno utili come punto di partenza per comprendere le funzionalità principali. Quidi seguito la spiegazione dettagliata di ciascun esempoio.

### Esempio 1

Due stati, open e close, con una sola transizione grazie all'operatore <=> che permette di indicare rapidamente il passaggio tra uno stato e l'altro, e viceversa.

L'interazione è dinamica, al click del mouse.

Per avere delle tempistiche diverse (esempio si chiude più veloce, si apre più lento) si può sempre spefificare con:

```
transition('open => closed', [animate('1s')]),
transition('closed => open', [animate('0.5s')]),
```

Il trigger è attivato alla pressione di un bottone che modifica un booleano.

Nel template, viene letto il booleano e se è `true` viene restituita la stringa 'open' che rappresenta il nome di uno stato, se `false` restituisce 'closed' che è il nome dell'altro stato.

```
[@openClose]="isOpen ? 'open' : 'closed'"
```

### Esempio 2

Un solo stato chiamato `default` e l'uso dell'operatore `*`.

Con `*` al posto del nome di uno stato, in una transizione, si indica che da qualsiasi stato si trova l'elemento è possibile passare allo stato indicato. Nello specifico, da qualunque stato a `default`.

Usare direttamente l'asterico permette di avviare un'animazione già all'entrata e spostarsi subito nello stato desiderato.

### Esempio 3

Uso di `:enter` senza stati.

Gli stati servono a mantenere un determinato stile (definito in `style`). E' anche possibile eseguire delle animazioni nelle quali vogliamo tornare alla situazione iniziale. In questo caso si può fare senza usare `state` e possiamo sfruttare `:enter` per eseguirla all'avvio della pagina.

```
transition(':enter', [
        style({ 'font-size': '10px', background: 'blue' }),
        animate(
          '2s 0.1s ease-out',
          style({ 'font-size': '20px', background: 'yellow' })
        ),
        animate('1s'),
      ]),
```

Il primo `style` dentro `transition` definisce da che stile deve partire l'animazione.

Dentro il primo `animate` si può definire cosa deve fare l'animazione (lo stile definito qui verrà poi perso, è temporaneo!).

Nel secondo animate, vuoto, si definisce il tempo per tornare alla situazione "pulita", cioè a prima delle animazioni (in pratica, quanto definito nel file CSS).

In questo caso il div parte blu (definito nel primo style), poi diventa giallo (nel secondo style) ed infine diventa rosso, che è appunto lo stile definito su `app.component.css`.

### Esempio 4

Uso dell'istruzione `query` per individuare più target e reset dello stato con `@.done`.

L'istruzione `query` è un po' particolare, in quanto non è pensata per l'uso a stati, ma principalmente per animazioni che iniziano e finiscono. Permette di individuare più elementi HMTL un po' come faresti con `document.querySelectorAll(selettore)` in javascript oppure `$(selettore)` in JQuery.

Nell'esempio vengono presi per l'animazione tutti gli elementi che hanno la classe `shake`. Come puoi vedere, il terzo div non si muove, non avendo la classe `shake`.

C'è un problema però, se premendo il bottone imposti lo stato a `shakeIt`, l'animazione parte, ma dalla seconda volta se ripremi il bottone non succede nulla! Questo perchè la variable `shakeState` ha già la stringa `shakeIt`, quindi la transizione `* => shakeIt` non viene più attivata!

Per risolvere il problema, puoi dire ad Angular di chiamare una fuzione alla fine dell'animazione. Questo ti potrà tornare anche un sacco utile per altre cose!

Nel caso specifico, mettendo nel template una funzione su `(@queryShake.done)` (che è @nomeTrigger.done) puoi resettare lo stato e fare in modo che l'animazione sia attivabile nuovamente.

Logicamente puoi fare qualsiasi altra cosa dal momento in cui chiami una funzione, ti apre infiniti scenari. Ad esempio, prima di aprire un popup attivi un'animazione e solo quando l'animazione è terminata, lanci il comando per aprire il popup con una funzione definita su `.done`.

### Esempio 5

Definizione delle animazioni fuori dal componente, per poterle riusare in più componenti.

Personalmente odio i copia-incolla, ogni volta che ti trovi a incollare cose in più posti nel codice dovrebbe suonare un campanello di allarme.

Può capitare che hai definito un'animazione abbastanza generica e vuoi usarla su più componenti. Non fare copia incolla che poi è un problema se devi fare delle modifiche e devi cercare in tutto il codice!

In questo progetto ho creato la cartella `shared` con un file `animations.ts`. All'interno tramite `export const` ho definito una funzione esportabile contenente il trigger (e tutto il contenuto) dell'animazione.

Per richiamarla su `app.component.ts` come puoi vedere mi è bastato importare la funzione:

```
import { slideAnimation } from '../shared/animations';
```

E semplicemente aggiungere `slideAnimation` nell'array `animations` di definizione del componente. Da lì la funzione è già importata. Logicamente puoi ripetere in tutti i componenti che vuoi, avendo la funzione definita in un file a parte.

In questo modo se vuoi modificarla su tutti i componenti ti basta modificarla una volta sola.

## Fonti e link utili

Ti lascio alcuni link in cui puoi trovare una marea di informazioni (forse anche troppe) sulle animazioni di Angular.

Il potenziale è illimitato, si possono fare veramente tante cose complesse, ma ti consiglio di comprendere prima al meglio le istruzioni base e quando ti senti sicuro di come usarle passa ad animazioni un po' più strutturate.

- https://angular.io/guide/animations
  La documentazione ufficiale è sempre un ottimo spunto quando hai dubbi, specialmente sulla sintassi.

- https://filipows.github.io/angular-animations/
  In questo repository ci sono tantissimi esempi di possibili animazioni, utile se vuoi farti un'idea di cosa è possibile fare.

- https://indepth.dev/posts/1285/in-depth-guide-into-animations-in-angular
  indepth è un portale con un'enorme raccolta di guide ed articoli su Angular, React e JS in generale. Potrà tornarti molto utile in futuro!
