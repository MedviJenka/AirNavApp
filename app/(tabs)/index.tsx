import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Callout } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar'
import WAY_POINTS from '@/constants/pointsOfInterest'
import AIRPORTS from '@/constants/airports'
import INITIAL_REGION from '@/constants/initialRegion'


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
  ]



  const showAirports =()=> {
    return AIRPORTS.map((item: any, index: any) => {
      return (
        <TouchableOpacity onPress={()=> setCount((count) => count + 1)}>
          
          <Marker key={index} 
                      coordinate={item.location} 
                      title={item.title}
                      description={item.description}
                      pinColor={selectedWayPoints.includes(item) ? 'blue' : 'red'}
                      onPress={() => toggleWayPoints(item)}
                      //image={customMarkerIcon}
                      //style={styles.customMarker}
                      />
        <View style={styles.wayPoints}>
                                               
          <Text style={ styles.wayPointsText }>
            {item.title}
          </Text>
  
        </View>
        <View>
          <Image source={require('@/assets/icons/airport.png')} style={{ width: 40, height: 40 }}/>
        </View>
      </TouchableOpacity>
      )
    })
  }

  const displayWayPointsAndAirports = (pointsOfInterest: any, imageName: string) => {
    return pointsOfInterest.map((item: any, index: any) => {
      return (
        <TouchableOpacity onPress={() => setCount((count) => count + 1)} key={index}>
          <Marker
            coordinate={item.location}
            description={item.description}
            pinColor={selectedWayPoints.includes(item) ? 'blue' : 'red'}
            onPress={() => toggleWayPoints(item)}
          >
            <View style={styles.wayPoints}>
              <Text style={styles.wayPointsText}>
                {item.title}
              </Text>
            </View>
            <View>
              {/* Use the imagePath parameter as the source for the Image component */}
       
            </View>
          </Marker>
        </TouchableOpacity>
      )
    })
  }

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
                        <View>
                          <Image source={require('@/assets/icons/triangle.png')} style={{ width: 40, height: 40 }}/>
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
      <MapView onRegionChange={logRegions}
                    style={StyleSheet.absoluteFill} 
                    provider={ PROVIDER_GOOGLE } 
                    initialRegion={ INITIAL_REGION }
                    showsUserLocation 
                    showsMyLocationButton
                    customMapStyle={customMapStyles}
                  >
    
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
     backgroundColor: 'white',
     padding: 0,
     borderWidth: 1,
     borderColor: 'gray',
     borderRadius: 20,
  },
  wayPointsText: {
    fontWeight: 'bold',
    fontSize: 20,
  }

})