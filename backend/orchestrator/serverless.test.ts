import { AWS } from '@serverless/typescript';

import { testFunctionNames } from '@sls-monorepo/serverless-helpers';

import * as sc from './serverless';

const serverlessConfiguration = sc as AWS;

/**
 * serverless tests
 *
 * @group unit/serverless
 */
describe('root service serverless.ts', () => {
  testFunctionNames(serverlessConfiguration);
});
