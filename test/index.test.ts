import { relayDeconstructor } from '../src';

describe('relayConnectionToArray', () => {
  test('single connection at root', () => {
    const connectionToTransform = {
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
    };

    const expected = [
      {
        name: 'Han Solo',
        cursor: 'Y3Vyc29yMg==',
      },
      {
        name: 'Leia Organa',
        cursor: 'Y3Vyc29yMw==',
      },
    ];

    expect(relayDeconstructor(connectionToTransform)).toEqual(expected);
  });

  test('single connnection one level deep', () => {
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

    expect(relayDeconstructor(connectionToTransform)).toEqual(expected);
  });

  test('multiple connections at the same level', () => {
    const connectionToTransform = {
      friends: {
        totalCount: 2,
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

    expect(relayDeconstructor(connectionToTransform)).toEqual(expected);
  });

  test('data wrapper around same-level connections', () => {
    const connectionToTransform = {
      data: {
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
      },
    };

    const expected = {
      data: {
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
      },
    };

    expect(relayDeconstructor(connectionToTransform)).toEqual(expected);
  });

  test('connections multiple layers deep', () => {
    const connectionToTransform = {
      data: {
        hero: {
          name: 'R2-D2',
          friends: {
            totalCount: 2,
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
          },
        },
      },
    };

    const expected = {
      data: {
        hero: {
          name: 'R2-D2',
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
        },
      },
    };

    expect(relayDeconstructor(connectionToTransform)).toEqual(expected);
  });

  test('nested connections', () => {
    const connectionToTransform = {
      data: {
        hero: {
          name: 'R2-D2',
          friends: {
            totalCount: 3,
            edges: [
              {
                node: {
                  name: 'Han Solo',
                  friends: {
                    edges: [
                      { node: { name: 'R2D2' }, cursor: 'cursorR2d2' },
                      { node: { name: 'C3PO' }, cursor: 'cursorC3p0' },
                    ],
                  },
                },
                cursor: 'Y3Vyc29yMg==',
              },
              {
                node: {
                  name: 'Leia Organa',
                  friends: {
                    edges: [
                      { node: { name: 'Chewbacca' }, cursor: 'bacca0' },
                      { node: { name: 'Padme Amidala' }, cursor: 'padme0' },
                    ],
                  },
                },
                cursor: 'Y3Vyc29yMw==',
              },
            ],
          },
        },
      },
    };

    const expected = {
      data: {
        hero: {
          name: 'R2-D2',
          friends: [
            {
              name: 'Han Solo',
              cursor: 'Y3Vyc29yMg==',
              friends: [
                { name: 'R2D2', cursor: 'cursorR2d2' },
                { name: 'C3PO', cursor: 'cursorC3p0' },
              ],
            },
            {
              name: 'Leia Organa',
              cursor: 'Y3Vyc29yMw==',
              friends: [
                { name: 'Chewbacca', cursor: 'bacca0' },
                { name: 'Padme Amidala', cursor: 'padme0' },
              ],
            },
          ],
        },
      },
    };

    expect(relayDeconstructor(connectionToTransform)).toEqual(expected);
  });

  test('object where edges exist without nodes', () => {
    const connectionToTransform = {
      data: {
        hero: {
          name: 'R2-D2',
          friends: {
            totalCount: 2,
            edges: [
              {
                name: 'Han Solo',
                cursor: 'Y3Vyc29yMg==',
              },
              {
                name: 'Leia Organa',
                cursor: 'Y3Vyc29yMw==',
              },
            ],
          },
        },
      },
    };

    const expected = {
      data: {
        hero: {
          name: 'R2-D2',
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
        },
      },
    };

    expect(relayDeconstructor(connectionToTransform)).toEqual(expected);
  });

  test('non-object argument returns itself', () => {
    expect(relayDeconstructor(undefined)).toEqual(undefined);
    expect(relayDeconstructor(1)).toEqual(1);
    expect(relayDeconstructor('some fun string')).toEqual('some fun string');
  });

  test('list that does not have edges or nodes remains the same', () => {
    const profileFriends = {
      data: {
        profile: {
          tinyFriendsList: ['Rey'],
        },
      },
    };

    expect(relayDeconstructor(profileFriends)).toEqual(profileFriends);
  });

  test('works with null field', () => {
    const profileFriends = {
      data: {
        profile: {
          tinyFriendsList: null,
        },
      },
    };

    expect(relayDeconstructor(profileFriends)).toEqual(profileFriends);
  });
});
