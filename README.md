# serverless-invoice-api
Requirements

		Node 9.2.1

		Express 4.15.5

		DynamoDB Local — Latest

		JRE (Java Runtime Environment) 6.x or newer


Features

		Support serverless v1.26.0

		Support offline development with dynamodb, lambda and API Gateway

		Support local dynamodb seeds/migrations

		Build automation inserver to ease local development

		Use of Environment variables

		Lambda CRUD operations for a Invoice application

How to develop and test offline?

We have used serverless-offline plugin and serverless-dynamodb-local plugin in this boilerplate. You can declare your table templates and seeds in api/todo/offline/migrations/ folder just like the todo.json template. When you spin up the offline server, these tables will be used as the datasources for your lambda functions.

Production vs Offline

Thanks to the offline plugin's environment variable IS_OFFLINE we can select between local dynamodb and aws dynamodb.

var dynamodbOfflineOptions = {

        region: "localhost",
				
        endpoint: "http://localhost:8000"
				
    },
		
    isOffline = () => process.env.IS_OFFLINE;
		

     var client = isOffline() ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions) :  new AWS.DynamoDB.DocumentClient();

Directory structure

|──api

    |  |──invoice

     |  |  |──lib

      |  |  |  |──invoice.js

			|  |  |  |──helper.js

			|  |  |  |──response.js

			|  |  |──handler.js

			|  |  |──database

			   |  |  |──dynamodb.js

			|  |  |──offline

			|  |  |  |──migrations
			
			|  |  |  |  |──invoice.yml

			|  |  |  |  |──invoice-seed.json

		|  |  |──config.yml

		|  |  |──serverless.yml

		|  |  |──package.json


Installation & Usage


		Clone this repo.

		Make sure AWS credentials are setup properly. Otherwise refer this document

			aws configure --profile elias

		Add the aws cli profile name and region on to serverless.yml file located at /api/invoice/serverless.yml

			...

			provider:

			name: aws

			runtime: nodejs6.10

			profile: elias

			stage: dev

			region: eu-west-2

			...
		Install serverless globally

		 npm i -g serverless

		Install project dependencies. cd serverless-react-boilerplate and type,

			npm install 

		Install dynamodb local. (Make sure you have Java runtime 6.x or newer)

			npm install --save serverless-dynamodb-local

		Run the app with the local server

			sls offline start

		Browser will open the todo app at http://localhost:3000


Contribution

Your contributions are much appriciated.


Links

serverless-dynamodb-local plugin

serverless-offline plugin

License

MIT
