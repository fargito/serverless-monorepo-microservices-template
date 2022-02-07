import { ServerlessContracts } from '@serverless-contracts/plugin';
import { AWS } from '@serverless/typescript';

import { httpApiResourceContract } from '@sls-monorepo/core-contracts';
import {
  projectName,
  sharedEsbuildConfig,
  sharedParams,
  sharedProviderConfig,
} from '@sls-monorepo/serverless-configuration';
import { getUserContract } from '@sls-monorepo/users-contracts';

import { functions } from './functions';

const serverlessConfiguration: AWS & ServerlessContracts = {
  service: `${projectName}-users`, // Keep it short to have role name below 64
  frameworkVersion: '>=3.0.0',
  configValidationMode: 'error',
  plugins: [
    'serverless-esbuild',
    'serverless-iam-roles-per-function',
    '@serverless-contracts/plugin',
  ],
  provider: {
    ...sharedProviderConfig,
    httpApi: {
      id: httpApiResourceContract.importValue,
    },
  },
  params: sharedParams,
  functions,
  package: { individually: true },
  custom: {
    projectName,
    esbuild: sharedEsbuildConfig,
  },
  contracts: {
    provides: { getUserContract: getUserContract.fullContractSchema },
    consumes: {
      httpApiResourceContract: httpApiResourceContract.fullContractSchema,
    },
  },
  resources: {
    Description: 'Users service: manage users',
  },
};

module.exports = serverlessConfiguration;
