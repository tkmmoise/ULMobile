import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useQuery} from '@apollo/client';
import moment from 'moment';
import FileViewer from 'react-native-file-viewer';
import Pdf from 'react-native-pdf';
import {Card, Button, Icon} from 'react-native-elements';

//For file upload
var RNFS = require('react-native-fs');
import RNFetchBlob from 'rn-fetch-blob';

// Graphql apolo client import
import {GET_MESSAGE} from '../graphql/queries';

//Attachements import
import {getURL} from '../services/attachements';

//My imports
import colors from '../../assets/colors/colors';
import {uri} from '../config/apollo.config';

const Detail = ({route, navigation}) => {
  const {id} = route.params;

  const source = 'http://samples.leanpub.com/thereactnativebook-sample.pdf';

  const onFileView = async (file, messageId) => {
    // Put your url here -----

    const url = getURL(messageId, file.fileId, file.mimeType, file.fileName);
    // -----
    console.log(url);
    // this will split the whole url.
    const f2 = url.split('/');

    // then get the file name with extention.
    const fileName = f2[f2.length - 1];
    // const fileExtention = url.split(".")[3];
    // create a local file path from url
    const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const options = {
      fromUrl: url,
      toFile: localFile,
    };

    // last step it will download open it with .
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
        // Here you can perform any of your completion tasks
      })
      .catch(error => {
        console.log(error);
        // error
      });
  };

  // For download File
  const checkPermission = async uri => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile(uri);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile(uri);
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = uri => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = uri;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  function Message(_id) {
    const {loading, error, data} = useQuery(GET_MESSAGE, {
      variables: {_id},
    });

    if (loading) {
      return (
        <ActivityIndicator
          color={colors.primary}
          size={'small'}
          style={styles.activityIndicator}
        />
      );
    }
    if (error) {
      return (
        <View>
          <Text>{`Error! ${error.message}`}</Text>
        </View>
      );
    }
    return (
      <>
        {/* Header */}
        <View style={styles.headerWrapper}>
          <View style={styles.headerWrapperTop}>
            <Text style={styles.messageTitle}>
              {data.messageById.messageObject}
            </Text>
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={require('../../assets/images/ciclogo.png')}
              />
            </View>
          </View>
          <View style={styles.headerWrapperBottom}>
            <Text>
              Par{' '}
              <Text style={styles.messageAuthor}>
                {data.messageById.sender.name}
              </Text>
            </Text>
            <Text style={styles.messageTextDate}>
              Publié le {moment(data.messageById.date).format('DD/MM/YY hh:mm')}
            </Text>
          </View>
        </View>

        {/* Contenu */}
        <View style={styles.container2}>
          <Text style={styles.title}>Contenu</Text>
          <Text style={styles.text}>{data.messageById.messageContent}</Text>
        </View>
        {/* Pieces Jointes */}
        <View style={{...styles.container2, marginBottom: 30}}>
          <Text style={[styles.title, {marginBottom: 10}]}>Pièces jointes</Text>
          {data.messageById.files.map(file => {
            return (
              <View key={file._id}>
                {file.mimeType.includes('image') && (
                  <Card style={styles.card}>
                    <Card.Image
                      source={{
                        uri: `${getURL(
                          data.messageById.messageId,
                          file.fileId,
                          file.mimeType,
                          file.fileName,
                        )}`,
                      }}
                      PlaceholderContent={<ActivityIndicator />}
                      style={styles.imageAttachement}
                    />
                    <Button
                      icon={
                        <Icon
                          name="image"
                          size={20}
                          color="#fff"
                          type="font-awesome-5"
                          iconStyle={styles.icon}
                        />
                      }
                      buttonStyle={styles.card_button}
                      title="Télécharger"
                      onPress={() => {
                        checkPermission(
                          getURL(
                            data.messageById.messageId,
                            file.fileId,
                            file.mimeType,
                            file.fileName,
                          ),
                        );
                      }}
                    />
                  </Card>
                )}
                {file.mimeType.includes('pdf') && (
                  <View style={styles.pdfViewontainer}>
                    <Card style={styles.card}>
                      <Pdf
                        source={{
                          uri: getURL(
                            data.messageById.messageId,
                            file.fileId,
                            file.mimeType,
                            file.fileName,
                          ),
                          cache: true,
                        }}
                        onLoadComplete={(numberOfPages, filePath) => {
                          console.log(`number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                          console.log(`current page: ${page}`);
                        }}
                        onError={error => {
                          console.log(error);
                        }}
                        onPressLink={uri => {
                          console.log(`Link presse: ${uri}`);
                        }}
                        style={styles.pdf}
                      />
                      <Button
                        icon={
                          <Icon
                            name="file-pdf"
                            size={20}
                            color="#fff"
                            type="font-awesome-5"
                            iconStyle={styles.icon}
                          />
                        }
                        buttonStyle={styles.card_button}
                        title="Télécharger"
                        onPress={() => {
                          checkPermission(
                            getURL(
                              data.messageById.messageId,
                              file.fileId,
                              file.mimeType,
                              file.fileName,
                            ),
                          );
                        }}
                      />
                    </Card>
                  </View>
                )}
                {/* <TouchableOpacity
                  style={styles.button}
                  key={file._id}
                  onPress={() => {
                    onFileView(file, data.messageById.messageId);
                  }}>
                  <Text style={styles.button_text}>{file.fileName}</Text>
                </TouchableOpacity> */}
              </View>
            );
          })}
        </View>
      </>
    );
  }

  return (
    <View style={styles.detailBackground}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Ionicons
            name="arrow-back"
            size={37}
            color="#000"
            onPress={() => navigation.goBack()}
          />
          <Ionicons name="ellipsis-vertical" size={37} color="#000" />
        </View>
      </SafeAreaView>
      <ScrollView>{Message(id)}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  detailBackground: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    marginTop: StatusBar.currentHeight,
  },
  topBar: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
  },
  headerWrapper: {
    paddingHorizontal: 35,
    paddingVertical: 10,
    marginTop: 50,
  },
  headerWrapperTop: {
    flexDirection: 'row',
  },
  messageTitle: {
    flex: 2,
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
    marginRight: 10,
  },
  logoWrapper: {
    flex: 1,
  },
  logo: {
    width: 107,
    height: 80,
    resizeMode: 'contain',
  },
  headerWrapperBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  messageAuthor: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700Bold',
  },
  messageTextDate: {
    fontSize: 12,
    fontFamily: 'Montserrat_500Medium',
  },
  container2: {
    paddingHorizontal: 35,
    marginTop: 30,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Montserrat_700Bold',
  },
  text: {
    marginTop: 10,
    fontFamily: 'Montserrat_400Regular',
    letterSpacing: 0.05,
    lineHeight: 21,
    fontSize: 14,
    color: colors.paragraph,
  },
  button: {
    backgroundColor: colors.buttonPrimary,
    height: 45,
    elevation: 1,
    width: '100%',
    borderRadius: 15,
    alignSelf: 'center',
    paddingVertical: 13,
    marginTop: 20,
  },
  button_text: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 19,
    letterSpacing: 0.6,
    fontFamily: 'Montserrat_700Bold',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageAttachement: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
  },
  pdfViewontainer: {
    width: '100%',
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: 250,
    marginBottom: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
  },
  icon: {
    marginRight: 5,
  },
  card_button: {
    backgroundColor: colors.buttonPrimary,
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});

export default Detail;
