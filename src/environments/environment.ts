// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  assetLoginUrl: 'http://localhost:5000/api/v1/asset/add',
  assetListUrl: 'http://localhost:5000/api/v1/asset',
  assetOverviewUrl: 'http://www.localhost:5000/api/v1/asset/overview',
  assetDataUrl: 'http://www.localhost:5000/api/v1/asset/data',
  ownerUrl: 'http://localhost:5000/api/v1/owner/detail',
  loginUrl: 'http://localhost:5000/api/v1/owner/login',
  ownerUpdate: 'http://localhost:5000/api/v1/owner/detail',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
