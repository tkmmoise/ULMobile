import {uri} from '../config/apollo.config';

export const getURL = (messageId, fileId, mimeType, fileName, inline) => {
  let url = `${uri}api/fichier/?messageId=${messageId}&fileId=${fileId}&mimeType=${mimeType}&fileName=${fileName}`;
  return inline ? url + `&inline=${inline}` : url;
};
