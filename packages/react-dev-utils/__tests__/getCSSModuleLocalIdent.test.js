/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const getCSSModuleLocalIdent = require('../getCSSModuleLocalIdent');

const rootContext = '/path';
const defaultClassName = 'class';
const options = { context: undefined, hashPrefix: '', regExp: null };

const tests = [
  {
    resourcePath: '/path/to/file.module.css',
    expected: 'file_class__jqNYY',
  },
  {
    resourcePath: '/path/to/file.module.css',
    className: 'class1020',
    expected: 'file_class1020__V+98r',
  },
  {
    resourcePath: '/path/to/file.module.css',
    className: 'class1022',
    expected: 'file_class1022__gSv/+',
  },
    {
    resourcePath: '/path/to/file.module.css',
    className: 'class1037',
    expected: 'file_class1037__9+k8V',
  },
  {
    resourcePath: '/path/to/file.module.scss',
    expected: 'file_class__BjEjJ',
  },
  {
    resourcePath: '/path/to/file.module.sass',
    expected: 'file_class__dINZX',
  },
  {
    resourcePath: '/path/to/file.name.module.css',
    expected: 'file_name_class__XpUJW',
  },
];

describe('getCSSModuleLocalIdent', () => {
  tests.forEach(test => {
    const { className = defaultClassName, expected, resourcePath } = test;
    it(JSON.stringify({ resourcePath, className }), () => {
      const ident = getCSSModuleLocalIdent(
        {
          resourcePath,
          rootContext,
        },
        '[hash:base64]',
        className,
        options
      );
      expect(ident).toBe(expected);
    });
  });

  tests.forEach(test => {
    const { className = defaultClassName, expected, resourcePath } = test;
    it(JSON.stringify({ resourcePath, className }), () => {
      const ident = getCSSModuleLocalIdent(
        {
          resourcePath,
          rootContext,
        },
        '[hash:base62]',
        className,
        options
      );
      expect(ident).toBe(expected);
    });
  });

  // Object.keys([...new Array(10000)]).forEach(test => {
  //   it(String(test), () => {
  //     const ident = getCSSModuleLocalIdent(
  //       {
  //         resourcePath: '/path/to/file.module.css',
  //         rootContext,
  //       },
  //       '[hash:base64]',
  //       defaultClassName + test,
  //       options
  //     );
  //     expect(ident).not.toMatch('+');
  //   });
  // })
});
