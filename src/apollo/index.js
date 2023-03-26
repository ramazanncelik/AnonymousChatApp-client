import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

const GRAPHQL_ENDPOINT = 'wss://anonymouschatapp-server.adaptable.app/graphql';
const HTTP_ENDPOINT = 'https://anonymouschatapp-server.adaptable.app/graphql';

const httpLink = new HttpLink({
    uri: HTTP_ENDPOINT
});

const wsLink = new GraphQLWsLink(createClient({
    url: GRAPHQL_ENDPOINT,
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

// ...code from the above example goes here...

const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default client;