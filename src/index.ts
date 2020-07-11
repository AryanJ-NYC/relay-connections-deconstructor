export const relayConnectionToArray = (relayObj: any): any => {
  const keyValuePairs: [string, any][] = Object.entries(relayObj);

  const toReturn: any = {};

  for (const [key, value] of keyValuePairs) {
    console.log({ key, value });
    if (value.edges && Array.isArray(value.edges)) {
      toReturn[key] = [
        ...value.edges.map((edge: any) => {
          const { node, ...theRest } = edge;
          return { ...node, ...theRest };
        }),
      ];
    }
  }

  return toReturn;
};
