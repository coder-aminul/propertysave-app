import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      console.log(result);
      await uploadImage();
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage?.uri,
      name: selectedImage?.fileName ?? 'uploaded_image.jpg', // You can replace this with the desired file name
      type: selectedImage?.mimeType, // Ensure the correct MIME type
    });
    setUploading(true);

    try {
      const response = await fetch('https://prosave.apiservicehub.com/v1/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        alert('Image uploaded successfully!');
      } else {
        alert(`Upload failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Upload error: ${error.message}`);
    } finally {
      setUploading(false);
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
                <Text style={styles.uploadText}>Drop or select file</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>

        {selectedImage && (
          <TouchableOpacity onPress={uploadImage} style={styles.uploadButton}>
            {uploading ? (
              <ActivityIndicator size="small" color="#fff" />
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
    backgroundColor: '#f9f9f9',
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
    height: 100,
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
