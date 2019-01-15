import {ApolloClient, InMemoryCache, HttpLink, ApolloLink} from 'apollo-boost'
import {RestLink} from 'apollo-link-rest'
import {createPersistedQueryLink} from 'apollo-link-persisted-queries'
import fetch from 'isomorphic-unfetch'
import getCsrfToken from '../util/getCsrfToken'
import {onError} from 'apollo-link-error'
import errorHandlerRegistry from './apolloErrorHandlerRegistry'

const isBrowser = process.browser

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  ;(global as any).fetch = fetch
  ;(global as any).Headers = require('node-fetch').Headers
}

let apolloClient: ApolloClient<{}> | null = null

const persistedQueryLink = createPersistedQueryLink()

function create(initialState: any, headers: {[key: string]: string} = {}) {
  if (isBrowser) headers['CSRF-Token'] = getCsrfToken()

  const hostUrl = isBrowser ? location.origin : process.env.HOST_URL
  const httpLink = new HttpLink({
    uri: `${hostUrl}/graphql`, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    headers,
  })
  const restLink = new RestLink({
    uri: hostUrl,
    credentials: 'same-origin',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  })
  const errorLink = onError(e => errorHandlerRegistry.dispatch(e))
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([errorLink, restLink, persistedQueryLink, httpLink]),
    cache: new InMemoryCache().restore(initialState || {}),
  })
}

export default function initApollo({
  initialState = {},
  headers,
}: {
  initialState: any
  headers?: {[key: string]: string}
}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState, headers)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, headers)
  }

  return apolloClient
}
