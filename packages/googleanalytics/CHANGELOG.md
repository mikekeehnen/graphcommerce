# Change Log

## 2.0.6

### Patch Changes

- [#1378](https://github.com/graphcommerce-org/graphcommerce/pull/1378) [`b610a6e40`](https://github.com/graphcommerce-org/graphcommerce/commit/b610a6e4049e8c9e8b5d2aeff31b8e1bfc24abe5) Thanks [@paales](https://github.com/paales)! - Pin all versions internally so we can’t end up in an unfixable state for the user

## 2.0.5

### Patch Changes

- [#1341](https://github.com/graphcommerce-org/graphcommerce/pull/1341) [`2e29c5852`](https://github.com/graphcommerce-org/graphcommerce/commit/2e29c585247d356e3027be92beb7815f2070c855) Thanks [@paales](https://github.com/paales)! - upgrade dependencies

## 2.0.4

### Patch Changes

- [#1307](https://github.com/ho-nl/m2-pwa/pull/1307) [`bd10506d3`](https://github.com/ho-nl/m2-pwa/commit/bd10506d32fdbc91d01dadc29a12ebd1e0943655) Thanks [@paales](https://github.com/paales)! - All default exports are now named exports internally and all `index.tsx` are renamed to the component name.

## 2.0.3

### Patch Changes

- [`973ff8645`](https://github.com/ho-nl/m2-pwa/commit/973ff86452a70ade9f4db13fdda6e963d7220e96) Thanks [@paales](https://github.com/paales)! - made packages public

## 2.0.2

### Patch Changes

- [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`ce09388e0`](https://github.com/ho-nl/m2-pwa/commit/ce09388e0d7ef33aee660612340f6fbae15ceec2) Thanks [@paales](https://github.com/paales)! - We've moved lots of internal packages from `dependencies` to `peerDependencies`. The result of this is that there will be significantly less duplicate packages in the node_modules folders.

* [#1276](https://github.com/ho-nl/m2-pwa/pull/1276) [`52a45bba4`](https://github.com/ho-nl/m2-pwa/commit/52a45bba4dc6dd6df3c81f5023df7d23ed8a534d) Thanks [@paales](https://github.com/paales)! - Upgraded to [NextJS 12.1](https://nextjs.org/blog/next-12-1)! This is just for compatibility, but we'll be implementing [On-demand Incremental Static Regeneration](https://nextjs.org/blog/next-12-1#on-demand-incremental-static-regeneration-beta) soon.

  This will greatly reduce the requirement to rebuid stuff and we'll add a management UI on the frontend to be able to revalidate pages manually.

## 2.0.1

### Patch Changes

- [`0cbaa878b`](https://github.com/ho-nl/m2-pwa/commit/0cbaa878b8a844d5abbeb1797b625a33130e6514) Thanks [@paales](https://github.com/paales)! - Added homepage and repository package.json files, so that the packages link to back to the website and repository

## 2.0.0

### Major Changes

- [#1258](https://github.com/ho-nl/m2-pwa/pull/1258) [`ad36382a4`](https://github.com/ho-nl/m2-pwa/commit/ad36382a4d55d83d9e47b7eb6a02671a2a631a05) Thanks [@paales](https://github.com/paales)! - Upgraded to Material UI 5

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.2.0](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googleanalytics@1.1.4...@graphcommerce/googleanalytics@1.2.0) (2021-12-21)

### Features

- **googleanalytics:** moved to gtag ([c586a8f](https://github.com/ho-nl/m2-pwa/commit/c586a8f66547cf7c332113e991a257181ce8d338))

## [1.1.4](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googleanalytics@1.1.3...@graphcommerce/googleanalytics@1.1.4) (2021-12-20)

### Bug Fixes

- make sure analytics only tracks once on page load ([94def43](https://github.com/ho-nl/m2-pwa/commit/94def43db7075b6b039696612547c6b6ff7c7c6e))
- make sure we're not loading gogole properties when keys are not given ([8636715](https://github.com/ho-nl/m2-pwa/commit/8636715d61985e0919208ffb64354c3ebb43ed01))

## [1.1.2](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googleanalytics@1.1.1...@graphcommerce/googleanalytics@1.1.2) (2021-12-17)

### Bug Fixes

- pageview with analytics not registered ([7cdb68d](https://github.com/ho-nl/m2-pwa/commit/7cdb68d9770a00044fa5a1f143fd05701ea72d59))

## [1.1.1](https://github.com/ho-nl/m2-pwa/compare/@graphcommerce/googleanalytics@1.1.0...@graphcommerce/googleanalytics@1.1.1) (2021-12-17)

### Bug Fixes

- **googleanalytics:** make sure ga is defined ([787dd9f](https://github.com/ho-nl/m2-pwa/commit/787dd9f6945469e36ebf627213fdb5eefb8146cd))

# 1.1.0 (2021-12-17)

### Features

- **googleanalytics:** created pacakge to support Google Analytics ([308b6df](https://github.com/ho-nl/m2-pwa/commit/308b6df1f216d2bc726c770a9ead039bd114a995))
