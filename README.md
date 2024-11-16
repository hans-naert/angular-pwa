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
