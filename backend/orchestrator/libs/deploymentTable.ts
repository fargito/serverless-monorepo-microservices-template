import DynamoDB from 'aws-sdk/clients/dynamodb';
import { Table } from 'dynamodb-toolbox';

import { getEnvVariable } from '@sls-monorepo/serverless-helpers';

import { PARTITION_KEY, SORT_KEY } from '../resources/dynamodb';

const DocumentClient = new DynamoDB.DocumentClient();

const DeploymentTable = new Table({
  name: getEnvVariable('DEPLOYMENT_TABLE_NAME'),
  partitionKey: PARTITION_KEY,
  sortKey: SORT_KEY,
  autoExecute: true,
  autoParse: true,
  DocumentClient,
});

export default DeploymentTable;
