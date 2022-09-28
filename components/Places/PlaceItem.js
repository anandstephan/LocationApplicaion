import { Pressable,Image,View,Text,StyleSheet } from "react-native"
import { Colors } from "../../constants/colors"

function PlaceItem({place,onSelect}){
    
    if(!place || place.length === 0 ){
        return (<View style={styles.fallbackContainer}>
            <Text style={styles.fallbackText}>No places add yet </Text>
            </View>)
    }
    return (
        <Pressable style={({pressed}) =>[styles.item,pressed &&   styles.pressed]} onPress={()=>onSelect(place.id)}>
            <Image source={{uri:place.imageUri}} style={styles.image}/>
            <View style={styles.info}>
            <Text style={styles.title}>{place.title}</Text>
            <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    )
}

export default PlaceItem

const styles = StyleSheet.create({
    fallbackContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    },
    fallbackText:{
        fontSize:16
    },
    item:{
        flexDirection:"row",
        alignItems:"flex-start",
        borderRadius:6,
        marginVertical:12,
        backgroundColor:Colors.primary500,
        elevation:2,
        shadowColor:"black",
        shadowOpacity:0.15,
        shadowOffset:{width:1,height:1},
        shadowRadius:2
    },
    pressed:{
        opacity:0.9
    },
    image:{
        flex:1,
        borderBottomLeftRadius:4,
        borderTopLeftRadius:4,
        height:100
    },
    info:{
        flex:2,
        padding:12
    },
    title:{
        fontWeight:"bold",
        fontSize:18,
        color:Colors.gray700
    },
    address:{
        fontSize:12,
        color:Colors.gray700
    }
})