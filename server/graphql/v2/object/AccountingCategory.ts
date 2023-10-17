import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';

import { getIdEncodeResolver, IDENTIFIER_TYPES } from '../identifiers';

import { GraphQLHost } from './Host';

const GraphQLAccountingCategory = new GraphQLObjectType({
  name: 'AccountingCategory',
  description: 'Fields for an accounting category',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: getIdEncodeResolver(IDENTIFIER_TYPES.ACCOUNTING_CATEGORY),
    },
    code: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The code of the accounting category',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The technical name of the accounting category',
    },
    friendlyName: {
      type: GraphQLString,
      description: 'A friendly name for non-accountants (i.e. expense submitters and collective admins)',
    },
    account: {
      type: new GraphQLNonNull(GraphQLHost),
      description: 'The account this category belongs to',
      resolve: ({ CollectiveId }, _, req) => req.loaders.Collective.byId.load(CollectiveId),
    },
  }),
});

export default GraphQLAccountingCategory;
