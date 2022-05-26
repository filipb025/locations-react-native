import {useState, useCallback} from "react";
import {StyleSheet, TextInput, View, Text, ScrollView} from 'react-native'
import {Colors} from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import {Place} from "../../models/place";

function PlaceForm({onCreatePlace}) {
    const [enteredTitle, setEnteredTitle] = useState('')
    const [pickedLocation, setPickedLocation] = useState()
    const [selectImage, setSelectedImage] = useState()

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText)
    }

    function takeImageHandler(imageUri) {
        setSelectedImage(imageUri)
    }

    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    }, [])

    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, selectImage, pickedLocation)
        onCreatePlace(placeData)
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle}/>
            </View>
            <ImagePicker onTakeImage={takeImageHandler}/>
            <LocationPicker onPickLocation={pickLocationHandler}/>
            <Button onPress={savePlaceHandler}>Add place</Button>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        marginHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
})

export default PlaceForm