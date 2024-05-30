import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, Image } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { handleUpLoadOfImage } from '../services/BucketService';

const AddScreen = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);

    // Handles selecting an image from the camera roll
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // Calls our service function to actually upload the image
    const uploadImage = async () => {
        if (title && image) {
            const fileName = `${title.replace(/\s+/g, '_')}_${Date.now()}`;
            await handleUpLoadOfImage(image, fileName, title);
        } else {
            alert("Please provide both a title and an image.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputField}
                placeholder="Memory Title"
                onChangeText={newText => setTitle(newText)}
                value={title}
            />
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TouchableOpacity style={styles.button} onPress={uploadImage}>
                <Text style={styles.buttonText}>Add Memory</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    inputField: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 15,
        padding: 10,
        marginBottom: 30
    },
    button: {
        backgroundColor: "green",
        textAlign: 'center',
        padding: 15,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 30
    },
});
