export const relayConnectionToArray = (relayObj: any): any => {
  const keyValuePairs: [string, any][] = Object.entries(relayObj);

  for (const [key, value] of keyValuePairs) {
    console.log({ key, value });
    if (value.edges && Array.isArray(value.edges)) {
      return {
        [key]: [
          ...value.edges.map((edge: any) => {
            const { node, ...theRest } = edge;
            return { ...node, ...theRest };
          }),
        ],
      };
    }
  }
};
