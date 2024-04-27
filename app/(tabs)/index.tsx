import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar'
import WAY_POINTS from '../../constants/pointsOfInterest'
import INITIAL_REGION from '../../constants/initialRegion'


export default function App() {

  const logRegions =(region: any)=> {
      console.log(region)
  }

  const customMarkerIcon = require('../../assets/icons/triangle.png')

  const showLocationsOfInterest =()=> {
    return WAY_POINTS.map((item, index) => {
      return (
        <Marker key={index} 
                    coordinate={item.location} 
                    title={item.title}
                    description={item.description}
                    pinColor='red'
                    //image={customMarkerIcon}
                    //style={styles.customMarker}
                    />
      )
    })
  }

  const renderMagentaLines =()=> {
    const coordinates = WAY_POINTS.map((item) => item.location)
    return <Polyline coordinates={coordinates} strokeColor='magenta' strokeWidth={5}/>
  }

  const darkMode =()=> {
    let [on, off] = useState(0)
  }

  return (
    <View style={styles.container}>
          
      <MapView onRegionChange={logRegions}
                    style={StyleSheet.absoluteFill} 
                    provider={ PROVIDER_GOOGLE } 
                    initialRegion={ INITIAL_REGION }
                    showsUserLocation 
                    showsMyLocationButton
                    customMapStyle={[{ 
                      featureType: 'road', 
                      elementType: 'geometry', 
                      stylers: [{ 
                        color: 'brown',
                        invert_lightness: false  // darkMode in future use
                      }]}]}
                    >

   
      {renderMagentaLines()}
      {showLocationsOfInterest()}
      </MapView>

      <StatusBar style='auto'/>
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
  },
  customMarker: {
    width: 40,
    height: 40
  }
})