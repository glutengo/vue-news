const GraphQLTransformer = require('graphql-typeop/transformers/graphql.transformer').default;

module.exports = program => ({
  before: [GraphQLTransformer.create(program)],
});
