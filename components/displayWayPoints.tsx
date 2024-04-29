import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import WAY_POINTS from '@/constants/pointsOfInterest'


const [selectedWayPoints, setSelectedWayPoints] = useState([])
const [count, setCount] = useState(0)
const toggleWayPoints =(waypoint: never)=> {
  if (selectedWayPoints.length <= 5) {
    setSelectedWayPoints([...selectedWayPoints, waypoint]) 
  } else {
    setSelectedWayPoints([waypoint])
    setCount((count: any) => count + 1)
  }
}

export default function displayWayPoints() {

     return WAY_POINTS.map((item: any, index: any) => {
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


const styles = StyleSheet.create({

  wayPoints: {
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20,
  },
  wayPointsText: {
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