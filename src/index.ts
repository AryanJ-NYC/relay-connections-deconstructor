export const relayDeconstructor = (relayObj: any): any => {
  if (typeof relayObj !== 'object') return relayObj;

  const result: any = {};

  if (relayObj.edges && Array.isArray(relayObj.edges)) {
    return [
      ...relayObj.edges.map((edge: any) => {
        const { node, ...theRest } = edge;
        if (!node) {
          return theRest;
        }
        const deconstructedNode = relayDeconstructor(node);
        return { ...deconstructedNode, ...theRest };
      }),
    ];
  }

  Object.entries(relayObj).forEach(([key, value]) => {
    result[key] = relayDeconstructor(value);
  });

  return result;
};
