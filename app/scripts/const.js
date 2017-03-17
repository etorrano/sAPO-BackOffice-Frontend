/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .constant('REST_API', {
        BASE_URL: 'https://sapo.azure-api.net/sapo/',
       // BASE_URL: 'http://sapo-backendrs.rhcloud.com/openshiftproject/rest/',
        OCP_KEY: '9f86432ae415401db0383f63ce64c4fe'
    })
    .constant('REST_API_NODEJS', {
        BASE_URL: 'https://sapo.azure-api.net/nodejs/',
        //BASE_URL: 'http://nodejs4tsi2-backendrs.rhcloud.com/',
        OCP_KEY: '9f86432ae415401db0383f63ce64c4fe'
    });