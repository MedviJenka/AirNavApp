import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar'
import WAY_POINTS from '@/constants/pointsOfInterest'
import AIRPORTS from '@/constants/airports'
import INITIAL_REGION from '@/constants/initialRegion'
import displayWayPoints from '@/components/displayWayPoints';
import { Stack } from 'expo-router'
import VOR from '@/components/displayVOR';


export default function App() {

  const [selectedWayPoints, setSelectedWayPoints] = useState([])
  const [count, setCount] = useState(0)

  const toggleWayPoints =(waypoint: never)=> {
    if (selectedWayPoints.length <= 5) {
      setSelectedWayPoints([...selectedWayPoints, waypoint]) 
    } else {
      setSelectedWayPoints([waypoint])
      setCount((count) => count + 1)
    }
  }



  let customMapStyles = [
    {
      stylers: [{ 
        color: 'brown',
        //invert_lightness: false  // darkMode in future use
        }]
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'poi.business',
      elementType: 'all',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [{ visibility: 'on' }],
    }     
  ]

  const showWayPoints =()=> {

    return WAY_POINTS.map((item, index: any) => {
      return (
    
        <TouchableOpacity onPress={()=> setCount((count) => count + 1)}>
          <Marker key={index} 
                      coordinate={item.location} 
                      description={item.description}        
                      pinColor={selectedWayPoints.includes(item) ? 'blue' : 'red'}
                      onPress={() => toggleWayPoints(item)}
                      //image={customMarkerIcon}
                      //style={styles.customMarker}
                      >
              <View style={styles.wayPoints}>      
                <Text style={ styles.wayPointsText }>
                  {item.title}
                </Text>
              </View>
              <View style={styles.iconsCenter}>
                <Image source={require('@/assets/icons/triangle.png')} style={styles.wayPointsIconSize}/>    
              </View>
              
            </Marker>
      </TouchableOpacity>
      )
    }) 
  }


  const showAirports =()=> {
    return AIRPORTS.map((item, index: any) => {
      return (
        <TouchableOpacity onPress={()=> setCount((count) => count + 1)}>
  
          <Marker key={index} 
                      coordinate={item.location} 
                      description={item.description}        
                      pinColor={selectedWayPoints.includes(item) ? 'blue' : 'red'}
                      onPress={() => toggleWayPoints(item)}
                      //image={customMarkerIcon}
                      //style={styles.customMarker}
                      >

                        <View style={styles.wayPoints}>      
                          <Text style={ styles.wayPointsText }>
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.iconsCenter}>
                        <Image source={require('@/assets/icons/airport.png')} style={styles.airportsIconSize}/>    
                        </View>
            </Marker>
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


  const logRegions =(region: any)=> {
      console.log(region)
  }


  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }}/>
      <MapView onRegionChange={logRegions}
                    style={StyleSheet.absoluteFill} 
                    provider={ PROVIDER_GOOGLE } 
                    initialRegion={ INITIAL_REGION }
                    showsUserLocation 
                    showsMyLocationButton
                    customMapStyle={customMapStyles}>
    
      {renderMagentaLines()}
      {showAirports()}
      {showWayPoints()}
      {/* {displayWayPointsAndAirports(AIRPORTS, '@/assets/icons/airport.png')} */}
      {/* {displayWayPointsAndAirports(WAY_POINTS, '@/assets/icons/triangle.png')} */}
      
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
  },
  wayPoints: {
    width: 66,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
  wayPointsText: {
    //position: 'absolute',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  airportsIconSize: {
    width: 60,
    height: 60,
  },
  wayPointsIconSize: {
    width: 50,
    height: 50,
  },
  iconsCenter: {
    justifyContent: 'center'
  }

})