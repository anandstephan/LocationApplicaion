import { launchCameraAsync,useCameraPermissions,PermissionStatus,Alert} from "expo-image-picker"
import {View,Image,Text,StyleSheet} from 'react-native'
import {Colors} from '../../constants/colors'
import {useState} from 'react'
import OutlinedButton from "../UI/OutlinedButton"
function ImagePicker({onImageTaken}){

    const [cameraPermissionInformation,requestPermission] = useCameraPermissions()
    const [pickedImage,setPickedImage] = useState('')

    async function verifyPermission(){
        if(cameraPermissionInformation.status == PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission()
            return permissionResponse.granted

        }
        if(cameraPermissionInformation.status == PermissionStatus.DENIED){
            Alert.alert('Insufficient Permission','You need to grant camera permission to use the app')
            return false
        }
        return true;
    }
    async function takeImageHandler(){
        const hasPermission = await verifyPermission()
        if(!hasPermission){
            return ;
        }
     
        const image = await launchCameraAsync({
         allowsEditing:true,
        aspect:[16,9],
        quality:0.5
     })
        setPickedImage(image.uri)
        onImageTaken(image.uri)
    }

    let imagePreview = <Text>No Image taken yet!</Text>
    if(pickedImage){
        imagePreview = <Image style={styles.image} source={{uri:pickedImage}}/>
    }

    return (
        <View>
            <View style={styles.imagePreview}>
            {imagePreview}
            </View>
            <OutlinedButton icon="camera"  onPress={takeImageHandler}>Take Image</OutlinedButton>
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({
    imagePreview:{
        width:"100%",
        height:200,
        marginVertical:8,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:Colors.primary100,
        borderRadius:4,
        overflow:"hidden"
    },
    image:{
        width:"100%",
        height:"100%",
        borderRadius:4
    }
})