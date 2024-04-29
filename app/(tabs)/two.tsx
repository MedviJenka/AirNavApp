import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from '@/components/Themed';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar'
import WAY_POINTS from '../../constants/pointsOfInterest'
import INITIAL_REGION from '../../constants/initialRegion'


export default function App() {

  const [selectedWayPoints, setSelectedWayPoints] = useState([])
  const [_, setCount] = useState(0)

  const toggleWayPoints =(waypoint: never)=> {
    if (selectedWayPoints.length <= 5) {
      setSelectedWayPoints([...selectedWayPoints, waypoint]) 
    } else {
      setSelectedWayPoints([waypoint])
      setCount((count) => count + 1)
    }
  }


  const showLocationsOfInterest =()=> {
    return WAY_POINTS.map((item: any, index: any) => {
      return (
        <TouchableOpacity>
          
          <Marker key={index} 
                      coordinate={item.location} 
                      title={item.title}
                      description={item.description}
                      pinColor={selectedWayPoints.includes(item) ? 'blue' : 'red'}
                      onPress={() => toggleWayPoints(item)}
                      //image={customMarkerIcon}
                      //style={styles.customMarker}
                      />
      </TouchableOpacity>
      )
    })
  }

  const renderMagentaLines = () => {
    if (selectedWayPoints.length >= 2) {
      const coordinates = selectedWayPoints.map((item) => item.location);
      return <Polyline coordinates={coordinates} strokeColor='magenta' strokeWidth={5} />;
    }
    return null;
  };

  const customMarkerIcon = require('../../assets/icons/triangle.png')



  const logRegions =(region: any)=> {
      console.log(region)
  }


  return (
    <View style={styles.container}>
          
      <MapView onRegionChange={logRegions}
                    style={StyleSheet.absoluteFill} 
                    provider={ PROVIDER_GOOGLE } 
                    initialRegion={ INITIAL_REGION }
                    showsUserLocation 
                    showsMyLocationButton
                    customMapStyle={[
                      {
                        stylers: [{ 
                          color: 'brown',
                          //invert_lightness: false  // darkMode in future use
                          }]
                      },
                      {
                        featureType: 'poi',
                        elementType: 'all',
                        stylers: [{ visibility: 'off' }],
                      },
                      {
                        featureType: 'poi.business',
                        elementType: 'all',
                        stylers: [{ visibility: 'off' }],
                      },
                      {
                        featureType: 'transit',
                        elementType: 'all',
                        stylers: [{ visibility: 'off' }],
                      }     
                    ]}
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