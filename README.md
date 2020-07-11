# Relay Connections Deconstructor

[![npm](https://img.shields.io/npm/v/relay-connections-deconstructor?style=plastic)](https://www.npmjs.com/package/relay-connections-deconstructor)

## Description

Not all of us love the Relay spec but sometimes we find ourselves wrestling with edges and nodes and edges and nodes and edges and...

Welp, I wrote a quick little function to flatten out said edges and nodes and edges and nodes.

## Installation

```bash
yarn add relay-connections-deconstructor
```

or

```bash
npm install relay-connections-deconstructor
```

## Usage

```typescript
import { relayDeconstructor } from 'relay-connections-deconstructor';

const responseFollowingRelaySpec = {
  friends: {
    totalCount: 3,
    edges: [
      {
        node: {
          name: 'Han Solo',
        },
        cursor: 'Y3Vyc29yMg==',
      },
      {
        node: {
          name: 'Leia Organa',
        },
        cursor: 'Y3Vyc29yMw==',
      },
    ],
    pageInfo: {
      endCursor: 'Y3Vyc29yMw==',
      hasNextPage: false,
    },
  },
  planets: {
    totalCount: 2,
    edges: [
      { node: { name: 'Pluto' }, cursor: 'Y3Vyc29yMg==' },
      { node: { name: 'Mars' }, cursor: 'Y3Vyc29yMw==' },
    ],
  },
};

const deconstructedObject = relayConnectionToArray(responseFollowingRelaySpec);
console.log(deconstructedObject);
// 👇
// {
//   friends: [
//     {
//       name: 'Han Solo',
//       cursor: 'Y3Vyc29yMg==',
//     },
//     {
//       name: 'Leia Organa',
//       cursor: 'Y3Vyc29yMw==',
//     },
//   ],
//   planets: [
//     { cursor: 'Y3Vyc29yMg==', name: 'Pluto' },
//     { cursor: 'Y3Vyc29yMw==', name: 'Mars' },
//   ],
// };

const justTheFriends = relayConnectionToArray(responseFollowingRelaySpec.friends);
console.log(justTheFriends);
// 👇
// [
//   {
//     name: 'Han Solo',
//     cursor: 'Y3Vyc29yMg==',
//   },
//   {
//     name: 'Leia Organa',
//     cursor: 'Y3Vyc29yMw==',
//   },
// ]
```
