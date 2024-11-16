import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import * as keys from '../../server-keys.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-pwa';

  constructor(private swPush: SwPush) {}

  ngOnInit() {
    console.log('App Component Init');
    this.swPush.requestSubscription({serverPublicKey: keys.public})
  }
}
