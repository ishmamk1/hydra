export const integration_responses = [{
    statusCode: '200',
    responseParameters: {
      'method.response.header.Access-Control-Allow-Origin': "'*'"
    },
    responseTemplates: { 'application/json': '' }
}];

export const method_responses = [{
    statusCode: '200',
    responseParameters: {
      'method.response.header.Access-Control-Allow-Origin': true
    }
}];