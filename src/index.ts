export const relayConnectionToArray = (relayObj: any): any => {
  const keyValuePairs: [string, any][] = Object.entries(relayObj);
  const toReturn: any = {};

  for (const [key, value] of keyValuePairs) {
    if (value.edges && Array.isArray(value.edges)) {
      toReturn[key] = [
        ...value.edges.map((edge: any) => {
          const { node, ...theRest } = edge;
          return { ...node, ...theRest };
        }),
      ];
    } else {
      return { [key]: relayConnectionToArray(value) };
    }
  }

  return toReturn;
};
