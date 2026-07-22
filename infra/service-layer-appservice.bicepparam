using './service-layer-appservice.bicep'

param location = 'centralus'

param servicePlanName = 'asp-sj311react-api-poc-test'
param serviceAppName = 'app-sj311react-api-poc-test'
param logAnalyticsName = 'lDefaultWorkspace-b7b6dce1-bd42-4a42-8999-57b145d6e140-WUS'
param appInsightsName = 'tubwebapp'
param allowedOrigin = 'app-sj311react-poc-test.azurewebsites.net'
param backendApiUrl = 'https://jsonplaceholder.typicode.com/todos/1'