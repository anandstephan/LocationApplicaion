import {useState,useLayoutEffect,useCallback} from 'react'
import {StyleSheet,Alert} from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import IconButton from '../components/UI/IconButton'

export default function Map({navigation,route}){
   
   
    const initialLocation =  route.params && {
        lat:route.params.initialLat,
        lng:route.params.initialLng
    }
    const [selectedLocation,setSelectedLocation] = useState(initialLocation)
    console.log("selectedLocation",selectedLocation)
    const region = {
        latitude: initialLocation ? initialLocation.lat :28.3833,
        longitude: initialLocation ? initialLocation.lng :79.4247,
        latitudeDelta:0.000922,
        longitudeDelta:0.000421
    }

    function selectLocationHandler(event){
        if(initialLocation)return;
        const lat = event.nativeEvent.coordinate.latitude
       const lng = event.nativeEvent.coordinate.longitude
    
        setSelectedLocation({latitude:lat,longitude:lng})
    }


    const savedPickedLocationHandler = useCallback(() =>{

        if(!selectedLocation){
            Alert.alert('No Location Picked','You have to pick a location (by tapping on the map) first!!!')
            return;
        }
        navigation.navigate('AddPlace',{
            pickedLat:selectedLocation.latitude,
            pickedLng:selectedLocation.longitude
        })
    
    },[navigation,selectedLocation])

    useLayoutEffect(() => {
        if(initialLocation){
            return;
        }
        navigation.setOptions({
            headerRight: ({tintColor}) => <IconButton icon="save" size={24} color={tintColor} onPress={savedPickedLocationHandler}/>
        })
    }, [navigation,savedPickedLocationHandler,initialLocation])


    return <MapView onPress={selectLocationHandler}  style={styles.map} initialRegion={region}>
    {selectedLocation && <Marker
            title='Picked Location'
            coordinate={{
                latitude:selectedLocation?.lat,
                longitude:selectedLocation?.lng
            }}/>}
    </MapView>
}

const styles = StyleSheet.create({
    map:{
        flex:1
    }
})