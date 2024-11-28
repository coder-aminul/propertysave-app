import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { ActivityIndicator } from '~/components/nativewindui/ActivityIndicator';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/nativewindui/Avatar';
import { useColorScheme } from '~/lib/useColorScheme';
import { setPropertyImage } from '~/store/media/mediaSlice';
type ImageUploadType = {
  isSuccess: boolean;
  iosClass?: string;
  mode: string;
  dbimage?: string;
  editmode?: boolean;
};

const ImageUpload = ({
  isSuccess = false,
  iosClass = 'ios:mt-8',
  mode = 'agent',
  dbimage,
  editmode = false,
}: ImageUploadType) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { colors } = useColorScheme();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      setSelectedImage(null);
    }
  }, [isSuccess]);

  const uploadImage = async (image) => {
    if (!image) return;

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      name: image.fileName ?? 'uploaded_image.jpg',
      type: image.mimeType,
    });

    setUploading(true);

    try {
      const response = await axios.post('https://prosave.apiservicehub.com/v1/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        dispatch(setPropertyImage(response.data?.files[0]?.src));
        alert('Image uploaded successfully!');
      } else {
        alert(`Upload failed: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Upload error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setSelectedImage(image); // Set the selected image
      uploadImage(image);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container} className={`${iosClass}`}>
        <TouchableOpacity onPress={pickImage}>
          {mode === 'property' ? (
            <View style={styles.uploadContainer}>
              {selectedImage ? (
                <View className="flex-col items-center justify-center">
                  <Image source={{ uri: selectedImage?.uri }} style={styles.imagePreview} />
                  <Text className="text-sm text-gray-400">Tap here to change the image</Text>
                </View>
              ) : dbimage !== '' ? (
                <View className="flex-col items-center justify-center">
                  <Image
                    source={{ uri: `https://prosave.apiservicehub.com/${dbimage}` }}
                    style={styles.imagePreview}
                  />
                  <Text className="text-sm text-gray-400">Tap here to change the image</Text>
                </View>
              ) : (
                <TouchableOpacity style={styles.uploadBox} onPress={pickImage} activeOpacity={0.7}>
                  <Text style={styles.uploadText}>Select your image</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View className="ios:mt-3 android:mt-2 relative flex-1 items-center justify-center">
              {selectedImage ? (
                <Avatar alt="agent-avatar" className="relative h-24 w-24 bg-transparent">
                  <AvatarImage source={{ uri: selectedImage?.uri }} className="z-10" />
                  {uploading && (
                    <ActivityIndicator
                      color={colors.primary}
                      className="absolute right-[40%] top-[40%] z-[9999]"
                    />
                  )}
                  <AvatarFallback className="border border-dashed border-gray-400 bg-transparent">
                    <Text>
                      <AntDesign name="clouduploado" size={45} />
                    </Text>
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar alt="agent-avatar" className="h-24 w-24 bg-transparent">
                  <AvatarImage source={{ uri: '' }} />
                  <AvatarFallback className="border border-dashed border-gray-400 bg-transparent">
                    <Text>
                      <AntDesign name="clouduploado" size={45} />
                    </Text>
                  </AvatarFallback>
                </Avatar>
              )}
            </View>
          )}
        </TouchableOpacity>

        {uploading && mode === 'property' && (
          <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
            {uploading ? (
              <>
                <ActivityIndicator color={colors?.background} />
              </>
            ) : (
              <Text style={styles.buttonText}>Upload</Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    textAlign: 'center',
  },
  uploadContainer: {
    borderWidth: 1.8,
    borderColor: '#dfdfdf',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
  },
  imagePreview: {
    width: 100,
    height: Platform.OS === 'ios' ? 100 : 50,
    borderRadius: 8,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    marginTop: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ImageUpload;
