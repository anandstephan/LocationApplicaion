import { useIsFocused } from "@react-navigation/native"
import { useState,useEffect } from "react"

import PlacesList from "../components/Places/PlacesList"
import {fetchPlaces} from '../util/database'

    function AllPlaces({route}){
        const [loadedPlaces,setLoadedPlaces] = useState([])
        const isFocused = useIsFocused()
        
        async function loadPlaces(){
           const places = await fetchPlaces()
          
           setLoadedPlaces(places)
        }
        useEffect(()=>{
            if(isFocused){
                loadPlaces()
            }
        },[isFocused])
        

        return <PlacesList places={loadedPlaces}/>
    }

    export default AllPlaces