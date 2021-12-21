import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function picUpdate() {

  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [useCamera, setUseCamera] = useState(false);
  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

    const uploadImage = async () => {

    };

  const takePicture = async () => {
    if (cameraRef) {
      console.log('in take picture');
      try {
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        return photo;
      } catch (e) {
        console.log(e);
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      return result;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {useCamera ? (
        <View>
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={{ flex: 9 }}></View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonInside}
                onPress={() => {
                  setUseCamera(false);
                }}>
                <Text style={styles.textInside}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonInside}
                onPress={() => {
                  setType(
                    type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back
                  );
                }}>
                <Text style={styles.textInside}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonInside]}
                onPress={async () => {
                  console.log('in take pic');
                  const r = await takePicture();
                  setUseCamera(false);
                  if (!r.cancelled) {
                    setImage(r.uri);
                  }
                  console.log('response', JSON.stringify(r));
                }}>
                <Text style={styles.textInside}>PICTURE</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      ) : (
        <>
          <View style={{ width: '100%' }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in pick photo');
                  const r = await pickImage();
                  if (!r.cancelled) {
                    setImage(r.uri);
                  }
                  console.log('response', JSON.stringify(r));
                }}>
                <Text style={styles.text}> PICK PICTURE </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button]}
                onPress={async () => {
                  console.log('in pick camera');
                  setUseCamera(true);
                }}>
                <Text style={styles.text}> PICK CAMERA </Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>
              {true && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200, backgroundColor: 'black' }}
                />
              )}
             </View>
             <View>
                   <TouchableOpacity
                       style={[styles.buttonUpload]}
                       onPress={async () => {
                           if (image === null) {
                               alert("Upload a picture");
                           } else {
                               uploadImage();
                           }
                       }}>
                       <Text style={styles.text}> UPLOAD </Text>
                    </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
      flex: 1,
      width: 250,
      height: 250,
      marginTop: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    minWidth: '100%',
    flex: 1,
    paddingBottom: 20
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 40,
    margin: 8,
    backgroundColor: '#788eec',
  },

    buttonInside: {
     flex:1,
     alignItems: 'center',
     justifyContent: 'center',
     width: 150,
     height: 40,
     marginRight: 5,
     marginLeft: 5,
     backgroundColor: '#788eec',
    },

    buttonUpload: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 320,
        height: 40,
        marginLeft: '12%',
        marginTop: 10,
        backgroundColor: '#788eec',
            
    },

    textInside: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    },

  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
