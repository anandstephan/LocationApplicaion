import {useState,useEffect} from 'react'
import {Text,View,StyleSheet,Alert,Image} from 'react-native'

import OutlinedButton from '../UI/OutlinedButton'
import {getAddress, getMapPreview} from '../../util/location'
import {Colors} from '../../constants/colors'


import { useNavigation,useRoute,useIsFocused } from '@react-navigation/native'
import {getCurrentPositionAsync,useForegroundPermissions,PermissionStatus} from 'expo-location'


function LocationPicker({onPickLocation}){
   
    const [pickedLocation,setPickedLocation] = useState()
    const [locationPermissionInformation,requestPermission] = useForegroundPermissions()
    const navigation = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused()
    
     async function verifyPermission(){
        if(locationPermissionInformation.status == PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission()
            return permissionResponse.granted

        }
        if(locationPermissionInformation.status == PermissionStatus.DENIED){
            Alert.alert('Insufficient Permission','You need to grant location permission to use the app')
            return false
        }
        return true;
     }
   
   
     async function getlocationHandler(){
         const hasPermission = await verifyPermission()
         if(!hasPermission){
            return;
         }
        const location = await getCurrentPositionAsync()
        // console.log(location)
        setPickedLocation({
            lat:location.coords.latitude,
            lng:location.coords.longitude
        })
    }
    function pickOnMapHandler(){
        navigation.navigate('Map')
    }

   

    useEffect(()=>{
     
        if(route.params){
            const mapPickedLocation =  {
                lat:route.params.pickedLat,
                lng:route.params.pickedLng
            }
            setPickedLocation(mapPickedLocation)
           
        }
        
    },[route,isFocused])

    useEffect(()=>{
        async function  handleLocation(){
            if(pickedLocation){
                const address = await getAddress(
                    pickedLocation.lat,
                    pickedLocation.lng
                )
                onPickLocation({...pickedLocation,address:address})
            }
        }
        handleLocation()

    },[pickedLocation,onPickLocation])

    let locationPreview = <Text>No Location picked yet</Text>

    //  getMapPreview(pickedLocation?.lat,pickedLocation?.lng)
    if(pickedLocation){
        locationPreview =  <Image style={styles.image} source={{uri:'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyA3kg7YWugGl1lTXmAmaBGPNhDW9pEh5bo&signature=GJnbP6sQrFY1ce8IsvG2WR2P0Jw='}}/>
    }
    return <View>
        <View style={styles.mapPreview}>
        {locationPreview}
        </View>
        <View style={styles.actions}>
            <OutlinedButton icon="location" onPress={getlocationHandler}>
                Locate User
            </OutlinedButton>
            <OutlinedButton icon="map" onPress={pickOnMapHandler}>
                Pick on Map
            </OutlinedButton>
        </View>
    </View>
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview:{
        width:"100%",
        height:200,
        marginVertical:8,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.primary100,
        borderRadius:4,
        overflow:"hidden"
    },
    actions:{
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:4
    }
})