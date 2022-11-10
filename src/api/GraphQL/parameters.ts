import { GraphQLParameters } from '../../types/GraphQLParameters';

export const calculateStringFromParameters = (parameters?: GraphQLParameters, parenthesis?: boolean) => {
    const first = parameters?.first ? `first: ${parameters.first},` : '';
    const last = parameters?.last ? `last: ${parameters.last},` : '';
    const before = parameters?.before ? `before: ${parameters.before},` : '';
    const after = parameters?.after ? `after: ${parameters.after},` : '';
    const sort = parameters?.sort ? `order: ${parameters.sort}` : '';

    let parameterString = parameters ? `${first} ${last} ${before} ${after} ${sort}` : '';
    if (parenthesis) {
        parameterString = `(${parameterString})`;
    }
    return parameterString;
};
