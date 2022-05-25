import {View, StyleSheet, Alert} from 'react-native'
import OutlinedButton from "../UI/OutlinedButton";
import {Colors} from "../../constants/colors";
import {getCurrentPositionAsync, useForegroundPermissions, PermissionStatus} from 'expo-location'


function LocationPicker() {
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()

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
        console.log(location)
    }

    function pickOnMapHandler() {
    }

    return (
        <View>
            <View style={styles.mapPreview}></View>
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
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default LocationPicker