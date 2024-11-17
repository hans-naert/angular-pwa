import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { BrowserNotification, NotificationHubsClient, SendNotificationOptions, createBrowserInstallation, createBrowserRegistrationDescription, createTagExpression } from "@azure/notification-hubs";
import keys from '../../server-keys.json'
import { Buffer } from 'buffer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-pwa';

  constructor(private swPush: SwPush) { }

  async ngOnInit() {
    console.log('App Component Init');
    let pushSubscription = await this.swPush.requestSubscription({ serverPublicKey: keys.public });
    console.log(keys.public);
    console.log(pushSubscription);
    console.log("convert to JSON" + pushSubscription.toJSON());
    console.log(JSON.stringify(pushSubscription));
    await this.createInstallation(pushSubscription);
  }

  client?: NotificationHubsClient;


  async createInstallation(pushSubscription: PushSubscription) {
    //make connection to Notification Hub
    this.client = new NotificationHubsClient("Endpoint=sb://NotificationHubHN2024NS.servicebus.windows.net/;SharedAccessKeyName=DefaultListenSharedAccessSignature;SharedAccessKey=c7lduxfktb6C2GNXfs+vTTZjPvrwFvewiytx6K7b7vY=", "NotificationHubHN2024");

 /*   const p256dh = Buffer.from(pushSubscription.getKey('p256dh')!).toString('base64')
    .replace(/\=/g, '') 
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
    const auth = Buffer.from(pushSubscription.getKey('auth')!).toString('base64')
    .replace(/\=/g, '') 
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

    */
    const p256dh = pushSubscription.toJSON().keys!['p256dh'];
    console.log(p256dh);
    const auth = pushSubscription.toJSON().keys!['auth'];
    console.log(auth);


    const installation = createBrowserInstallation(
      {
        installationId: "UNIQUE-FOR-INSTALLATION6",
        userId: "UNIQUE-FOR-USER5",
        tags: ["tag1", "tag2", "tag3", "tag4"],
        pushChannel: {
          endpoint: pushSubscription.endpoint,
          p256dh: p256dh,
          auth: auth
        }
      }
    );

    console.log(installation);

    //const deleteresult= await this.client.deleteInstallation("UNIQUE-FOR-INSTALLATION5");    
    //console.log(JSON.stringify(deleteresult));
    const result = await this.client.createOrUpdateInstallation(installation);
    console.log(result);

  }

/*  async pushNotification()
  {
    let browserNotification = {body:"test"} as BrowserNotification;


    //let browserNotification : BrowserNotification = ({ body: "This is a test notification", platform: "browser", contentType: "application/json;charset=utf-8" });

    let tag = {tagExpression: createTagExpression(["tag1", "tag2", "tag3","tag4"])} as SendNotificationOptions;
    
    await this.client?.sendNotification(browserNotification, tag);
  }*/

}
