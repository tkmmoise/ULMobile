import {createSlice} from '@reduxjs/toolkit';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

export const initialState = {
  isLoading: false,
  hasErrors: false,
  noeuds: [],
};

const noeudsSlice = createSlice({
  name: 'noeuds',
  initialState,
  reducers: {
    getNoeuds: state => {
      state.isLoading = true;
    },
    getNoeudsSucess: (state, {payload}) => {
      state.noeuds = payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getNoeudsFailure: state => {
      state.isLoading = false;
      state.hasErrors = true;
    },
  },
});

// export
export const {getNoeuds, getNoeudsSucess, getNoeudsFailure} =
  noeudsSlice.actions;
export const noeudsSelector = state => state.noeuds;
export default noeudsSlice.reducer;

export function fetchNoeuds() {
  return async dispatch => {
    dispatch(getNoeuds());

    try {
      const client = new ApolloClient({
        uri: 'http://192.168.43.36:4000/graphql',
        cache: new InMemoryCache(),
      });

      const response = await client.query({
        query: gql`
          query GetNoeuds {
            noeudMany(sort: _ID_ASC) {
              name
              acronym
              _id
            }
          }
        `,
      });

      //const response = await fetch("https://mocki.io/v1/86c0abfc-0704-4b07-97fe-1a56fe87a175");
      //const data = await response.json();

      dispatch(getNoeudsSucess(response && response.data.noeudMany));
    } catch (error) {
      dispatch(getNoeudsFailure());
    }
  };
}
