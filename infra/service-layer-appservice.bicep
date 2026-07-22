@description('Azure Government region for the service layer.')
param location string

@description('App Service Plan name for the service layer.')
param servicePlanName string

@description('App Service name for the Node.js service layer.')
param serviceAppName string

@description('Log Analytics workspace name.')
param logAnalyticsName string

@description('Application Insights name for the service layer.')
param appInsightsName string

@description('Allowed origin for React front end.')
param allowedOrigin string

@description('Mock or backend API URL used by the service layer.')
param backendApiUrl string

@description('Resource tags for CSJ POC.')
param tags object = {
  ApplicationName: 'SJ311React'
  Environment: 'poc'
  Workload: 'service-layer'
  DataClassification: 'non-production'
}

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: logAnalyticsName
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: appInsightsName
  location: location
  kind: 'web'
  tags: tags
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
  }
}

resource servicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: servicePlanName
  location: location
  kind: 'linux'
  tags: tags
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  properties: {
    reserved: true
  }
}

resource serviceApp 'Microsoft.Web/sites@2023-12-01' = {
  name: serviceAppName
  location: location
  kind: 'app,linux'
  tags: tags
  properties: {
    serverFarmId: servicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'NODE|20-lts'
      appCommandLine: 'npm start'
      appSettings: [
        {
          name: 'NODE_ENV'
          value: 'poc'
        }
        {
          name: 'ALLOWED_ORIGIN'
          value: allowedOrigin
        }
        {
          name: 'BACKEND_API_URL'
          value: backendApiUrl
        }
        {
          name: 'REQUEST_TIMEOUT_MS'
          value: '5000'
        }
        {
          name: 'APPLICATIONINSIGHTS_CONNECTION_STRING'
          value: appInsights.properties.ConnectionString
        }
      ]
    }
  }
  identity: {
    type: 'SystemAssigned'
  }
}

output serviceAppName string = serviceApp.name
output serviceAppDefaultHostName string = serviceApp.properties.defaultHostName
output serviceAppUrl string = 'https://${serviceApp.properties.defaultHostName}'
output principalId string = serviceApp.identity.principalId