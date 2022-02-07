import { ServerlessContracts } from '@serverless-contracts/plugin';
import { AWS } from '@serverless/typescript';
import type { Lift } from 'serverless-lift';

import {
  projectName,
  sharedParams,
  sharedProviderConfig,
} from '@sls-monorepo/serverless-configuration';
import { getUserContract } from '@sls-monorepo/users-contracts';

const serverlessConfiguration: AWS & Lift & ServerlessContracts = {
  service: `${projectName}-frontend`, // Keep it short to have role name below 64
  frameworkVersion: '>=3.0.0',
  plugins: ['serverless-lift', '@serverless-contracts/plugin'],
  provider: sharedProviderConfig,
  params: sharedParams,
  custom: {
    projectName,
  },
  constructs: {
    app: {
      type: 'static-website',
      path: '../app/dist',
    },
  },
  contracts: {
    consumes: {
      getUser: getUserContract.fullContractSchema,
    },
    provides: {},
  },
  resources: {
    Description: 'Frontend cloudfront service',
  },
};

module.exports = serverlessConfiguration;
