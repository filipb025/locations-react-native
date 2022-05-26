import {useState, useEffect} from 'react'
import {View, StyleSheet, Alert, Image, Text} from 'react-native'
import OutlinedButton from "../UI/OutlinedButton";
import {Colors} from "../../constants/colors";
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location'
import {getMapPreview} from "../../util/location";
import {useNavigation, useRoute, useIsFocused} from "@react-navigation/native";

function LocationPicker({onPickLocation}) {
    const [pickedLocation, setPickedLocation] = useState()
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const route = useRoute()

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {lat: route.params.pickedLat, lng: route.params.pickedLng}
            setPickedLocation(mapPickedLocation)
        }
    }, [route, isFocused])

    useEffect(() => {
        onPickLocation(pickedLocation)
    }, [pickedLocation, onPickLocation])

    async function verifyPermission() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission()

            return permissionResponse.granted
        }

        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permissions!')
            return false
        }
        return true
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermission()

        if (!hasPermission) {
            return
        }

        const location = await getCurrentPositionAsync()
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
    }

    function pickOnMapHandler() {
        navigation.navigate('Map')

    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
        locationPreview = (
            <Image style={styles.image} source={{uri: getMapPreview(pickedLocation.lat, pickedLocation.lng)}}/>
        )
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton onPress={getLocationHandler} icon='location'>Locate User</OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon='map'>Pick on map</OutlinedButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        marginVertical: 8,
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4
    }
})

export default LocationPicker