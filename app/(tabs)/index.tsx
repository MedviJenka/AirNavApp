import React, { useRef, useEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import MapView, { PROVIDER_GOOGLE, AnimatedRegion, Animated } from 'react-native-maps';
import { useNavigation } from 'expo-router';


const INITAL_REGION = {
  latitude: 31.17,
  longitude: 34.43,
  latitudeDelta: 5,
  longitudeDelta: 5 
}


const LLBS = {
  latitude: 31.1712,
  longitude: 34.4327,
  latitudeDelta: 100,
  longitudeDelta: 100 
}



export default function App() {

  const mapRef = useRef<MapView>()
  const navigation = useNavigation()

  useEffect(()=> {
    navigation.setOptions({
      headerRight: ()=> (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ justifyContent: 'center', paddingLeft: 20 }}>
            <Text>
              Focus
            </Text>
          </View>
        </TouchableOpacity>
      ),
    })
  }, [])

  const focusMap =()=> {
    mapRef.current?.animateCamera({ center: LLBS, zoom: 10 }, { duration: 3000 })
  }
 
  return (
    <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill} 
                    provider={ PROVIDER_GOOGLE } 
                    initialRegion={ INITAL_REGION } 
                    showsUserLocation 
                    showsMyLocationButton
                    ref={ mapRef }/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  map: {
    width: '100%',
    height: '100%',
  }
});
