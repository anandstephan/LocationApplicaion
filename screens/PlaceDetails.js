import {ScrollView,View,Text,StyleSheet,Image} from 'react-native'
import { useEffect } from 'react'
import OutlinedButton from '../components/UI/OutlinedButton'
import { Colors } from '../constants/colors'
import { fetchPlaceDetails } from '../util/database'
import { useState } from 'react'

export function PlaceDetails({route,navigation}){

    const [fetchedPlace,setFetchedPlace] = useState()
    console.log(fetchedPlace)

    function showMapHandler(){
        navigation.navigate('Map',{
            initialLat:fetchedPlace.location.lat,
            initialLng:fetchedPlace.location.lng
        })
    }
    const selectedPlaceId = route.params.placeId

    useEffect(()=>{
        async function loadPlaceData(){
          const place =   await fetchPlaceDetails(selectedPlaceId)
            setFetchedPlace(place)
           navigation.setOptions({
               title:place.title
           })
        }
        loadPlaceData()
    },[selectedPlaceId])
        
    
    if(!fetchedPlace){
        return <View style={styles.fallback}>
            <Text>Loading Data...</Text>
        </View>        
        }

    return <ScrollView>
        <Image style={styles.image} source={{uri:fetchedPlace?.imageUri}}/>
        <View style={styles.locationContainer}>
            <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace?.address}</Text>
            </View>
            <OutlinedButton icon="map" onPress={showMapHandler}>
                View on Map
            </OutlinedButton>
        </View>
    </ScrollView>
}


const styles = StyleSheet.create({
    fallback:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        height:"35%",
        minHeight:300,
        width:"100%"
    },
    locationContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    addressContainer:{
        padding:20
    },
    address:{
        color:Colors.primary500
    }

})