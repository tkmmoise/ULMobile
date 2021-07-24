import {createSlice} from '@reduxjs/toolkit';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';

export const initialState = {
  isLoading: false,
  hasErrors: false,
  messages: [],
};

const messagesSlice = createSlice({
  name: 'searchMessages',
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
    getSearchingMessages: (state, {payload}) => {
      let messages = [...state.messages];
      const data = messages.filter(message => {
        const newText = payload.text.toLowerCase();
        return `${message.messageObject}`.toLowerCase().includes(newText);
      });
      state.messages = data;
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
  getSearchingMessages,
} = messagesSlice.actions;
export const messagesSelector = state => state.messages;
export default messagesSlice.reducer;

export function fetchMessages() {
  return async dispatch => {
    dispatch(getMessages());

    try {
      const client = new ApolloClient({
        uri: 'http://192.168.1.123:3000/graphql',
        cache: new InMemoryCache(),
      });

      const response = await client.query({
        query: gql`
          query GetMessageMany {
            messageMany(sort: _ID_DESC) {
              _id
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

      // const response = await fetch(
      //   "https://mocki.io/v1/e902e657-e402-4721-9947-02f3a8901327"
      // );
      // const data = await response.json();
      dispatch(getMessagesSucess(response.data.messageMany));
    } catch (error) {
      dispatch(getMessagesFailure());
    }
  };
}
