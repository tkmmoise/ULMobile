import {gql} from '@apollo/client';

exports.GET_NODES = gql`
  query GetNoeuds {
    noeudMany(sort: _ID_ASC) {
      name
      acronym
      _id
    }
  }
`;

exports.GET_MESSAGES_BY_NODE = gql`
  query GetMessagesByNoeudId($_id: MongoID!) {
    noeudById(_id: $_id) {
      _id
      name
      acronym
      messages {
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
        senderId
        sender {
          name
          jobTitle
          email
        }
      }
    }
  }
`;

exports.GET_MESSAGE = gql`
  query GetMessageById($_id: MongoID!) {
    messageById(_id: $_id) {
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
      senderId
      sender {
        name
        jobTitle
        email
      }
    }
  }
`;
exports.GET_ALL_MESSAGES = gql`
  query GetMessageMany {
    messageMany(sort: _ID_DESC) {
      _id
      messageId
      messageObject
      messageContent
      date
      files {
        _id
        mimeType
        fileId
        fileName
        size
      }
      senderId
      sender {
        name
        jobTitle
        email
      }
    }
  }
`;
