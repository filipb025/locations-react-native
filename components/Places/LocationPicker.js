import {View, StyleSheet} from 'react-native'
import OutlinedButton from "../UI/OutlinedButton";
import {Colors} from "../../constants/colors";

function LocationPicker() {
    function getLocationHandler() {

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