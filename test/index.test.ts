import { relayConnectionToArray } from '../src';

describe('relayConnectionToArray', () => {
  test('it works on a single connnection', () => {
    const connectionToTransform = {
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
    };

    const expected = {
      friends: [
        {
          name: 'Han Solo',
          cursor: 'Y3Vyc29yMg==',
        },
        {
          name: 'Leia Organa',
          cursor: 'Y3Vyc29yMw==',
        },
      ],
    };

    expect(relayConnectionToArray(connectionToTransform)).toEqual(expected);
  });

  test('it works with multiple connections', () => {
    const connectionToTransform = {
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

    const expected = {
      friends: [
        {
          name: 'Han Solo',
          cursor: 'Y3Vyc29yMg==',
        },
        {
          name: 'Leia Organa',
          cursor: 'Y3Vyc29yMw==',
        },
      ],
      planets: [
        { cursor: 'Y3Vyc29yMg==', name: 'Pluto' },
        { cursor: 'Y3Vyc29yMw==', name: 'Mars' },
      ],
    };

    expect(relayConnectionToArray(connectionToTransform)).toEqual(expected);
  });
});
