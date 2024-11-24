import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { setPropertyImage } from '~/store/media/mediaSlice';
type ImageUploadType = {
  isSuccess: boolean;
};

const ImageUpload = ({ isSuccess = false }: ImageUploadType) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { propertyimage } = useSelector((state) => state.media);
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
      <View style={styles.container} className="ios:mt-8">
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.uploadContainer}>
            {selectedImage ? (
              <View className="flex-col items-center justify-center">
                <Image source={{ uri: selectedImage?.uri }} style={styles.imagePreview} />
                <Text className="text-sm text-gray-400">Tap here to change the image</Text>
              </View>
            ) : (
              <TouchableOpacity style={styles.uploadBox} onPress={pickImage} activeOpacity={0.7}>
                <Text style={styles.uploadText}>Select your image</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        {uploading && (
          <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
            {uploading ? (
              <>
                <ActivityIndicator size="small" color="#fff" />
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
