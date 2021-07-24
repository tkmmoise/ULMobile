import {createSlice} from '@reduxjs/toolkit';

import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

export const initialState = {
  isLoading: false,
  hasErrors: false,
  message: [],
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    getMessage: state => {
      state.isLoading = true;
    },
    getMessageSucess: (state, {payload}) => {
      state.message = payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getMessageFailure: state => {
      state.isLoading = false;
      state.hasErrors = true;
    },
  },
});

// export
export const {getMessage, getMessageSucess, getMessageFailure} =
  messageSlice.actions;
export const messageSelector = state => state.message;
export default messageSlice.reducer;

export function fetchMessage(id) {
  return async dispatch => {
    dispatch(getMessage());

    try {
      const client = new ApolloClient({
        uri: 'http://192.168.1.123:3000/graphql',
        cache: new InMemoryCache(),
      });

      const response = await client.query({
        query: gql`
          query GetMessageById {
            messageById(_id: "${id}") {
              messageId
              messageObject
              messageContent
              date
              files {
                mimeType
                fileId
                fileName
                size
              }
              sender {
                name
                jobTitle
                email
              }
            }
          }
        `,
      });

      //   const response = await fetch(
      //     "https://mocki.io/v1/51899140-c660-47b8-8903-cf9eed4ee2d5"
      //   );
      //   const data = await response.json();

      dispatch(getMessageSucess(response.data.messageById));
    } catch (error) {
      dispatch(getMessageFailure());
    }
  };
}
