import React, { useState } from 'react'

// To calculate the bearing between two coordinates, 
// you can use the following formula: bearing = atan2 (sin (long2-long1)*cos (lat2), cos (lat1)*sin (lat2) – sin (lat1)*cos (lat2)*cos (long2-long1)) 
// This formula assumes that the coordinates are given in terms of latitude and longitude.

const [bearings, setBearings] = useState<number[]>([]);

// Convert degrees to radians
const toRadians = (angle: number) => {
return angle * (Math.PI / 180);
};

// Convert radians to degrees
const toDegrees = (angle: number) => {
return angle * (180 / Math.PI);
};

const calculateBearing = (start: { latitude: number; longitude: number }, end: { latitude: number; longitude: number }) => {
     const lat1 = toRadians(start.latitude);
     const lon1 = toRadians(start.longitude);
     const lat2 = toRadians(end.latitude);
     const lon2 = toRadians(end.longitude);
   
     const dLon = lon2 - lon1;
   
     const y = Math.sin(dLon) * Math.cos(lat2);
     const x =
       Math.cos(lat1) * Math.sin(lat2) -
       Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
   
     const bearing = Math.atan2(y, x);
     return (toDegrees(bearing) + 360) % 360 - 5; // Normalize to 0-360 degrees
   };
   