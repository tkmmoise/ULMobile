import {createSlice} from '@reduxjs/toolkit';
import {sort} from '../../utils/sortUtil';

import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

export const initialState = {
  isLoading: false,
  hasErrors: false,
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: state => {
      state.isLoading = true;
    },
    getMessagesSucess: (state, {payload}) => {
      state.messages = payload;
      state.isLoading = false;
      state.hasErrors = false;
    },
    getMessagesFailure: state => {
      state.isLoading = false;
      state.hasErrors = true;
    },
    getSortedMessages: (state, {payload}) => {
      let messages = [...state.messages];

      state.messages = sort(messages, payload.type);
      state.isLoading = false;
      state.hasErrors = false;
    },
  },
});

// export
export const {
  getMessages,
  getMessagesSucess,
  getMessagesFailure,
  getSortedMessages,
} = messagesSlice.actions;
export const messagesSelector = state => state.messages;
export default messagesSlice.reducer;

export function fetchMessages(id) {
  return async dispatch => {
    dispatch(getMessages());

    try {
      const client = new ApolloClient({
        uri: 'http://192.168.43.36:4000/graphql',
        cache: new InMemoryCache(),
      });

      const response = await client.query({
        query: gql`
          query GetMessagesByNoeudId {
            noeudById(_id: "${id}") {
              _id
              name
              acronym
              messages{
                messageId
                messageObject
                messageContent
                date
                files{
                  mimeType
                  fileId
                  fileName
                  size
                }
                sender{
                  name
                  jobTitle
                  email
                  
                }
              }
            }
          }
        `,
      });

      // const response = await fetch(
      //   "https://mocki.io/v1/e902e657-e402-4721-9947-02f3a8901327"
      // );
      // const res2 = await fetch(
      //   "https://mocki.io/v1/35394d34-5b27-4454-8ffe-c019d32b5785"
      // );
      // const da = id === "60dd18ee67831b4344d4b0eb" ? res2 : response;
      // const data = await da.json();
      dispatch(getMessagesSucess(response.data.noeudById.messages));
    } catch (error) {
      dispatch(getMessagesFailure());
    }
  };
}
