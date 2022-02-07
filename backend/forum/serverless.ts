import { ServerlessContracts } from '@serverless-contracts/plugin';
import { AWS } from '@serverless/typescript';

import { httpApiResourceContract } from '@sls-monorepo/core-contracts';
import { getThreadWithPostsContract } from '@sls-monorepo/forum-contracts';
import {
  profiles,
  projectName,
  sharedEsbuildConfig,
  sharedProviderConfig,
} from '@sls-monorepo/serverless-configuration';

import { functions } from './functions';

const serverlessConfiguration: AWS & ServerlessContracts = {
  service: `${projectName}-forum`, // Keep it short to have role name below 64
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
  functions,
  package: { individually: true },
  custom: {
    projectName,
    profiles,
    esbuild: sharedEsbuildConfig,
  },
  contracts: {
    provides: {
      getThreadWithPostsContract: getThreadWithPostsContract.fullContractSchema,
    },
    consumes: {
      httpApiResourceContract: httpApiResourceContract.fullContractSchema,
    },
  },
  resources: {
    Description: 'Forum service: handle forum activity, posts and threads',
  },
};

module.exports = serverlessConfiguration;
