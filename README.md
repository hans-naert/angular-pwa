# ANGULAR-PWA

Angular project using @angular/material and @angular/pwa.  
See the documentation on [angular.dev](https://angular.dev/ecosystem/service-workers) for information on service-workers and push messaging in Angular.

## Generate keys

`npm run generate-server-key`

## Build

`npm run build` or `npm run watch`

## Serve

serve the build version to test serviceworker: `npm run serve-build`

## Test push

Use the browser to send the following push message:

```json
{
    "notification": {     
       "title": "New Notification!",
            "data": {"onActionClick":{
                "default": {
                 "operation": "openWindow",
                  "url": "foo"
                }
            }
        }
    }
 } 
```

## Azure Notification Hub
[Send browser (web push) notifications with Azure Notification Hubs | Microsoft Learn](https://learn.microsoft.com/en-us/azure/notification-hubs/browser-push)  

[Example code for using the notification SDK with Javascript](https://github.com/Azure/azure-sdk-for-js/blob/%40azure/notification-hubs_2.0.0/sdk/notificationhubs/notification-hubs/samples-dev/createInstallation.ts)