type wayPointsType = {
     title: string,
     location: {
          latitude: number,
          longitude: number
     } ,
     description: string
}[]


const VOR: wayPointsType = [

     {
          title: "LMZ VOR",
          location: {
          latitude:  31.3310,
          longitude: 35.5909,
          },
          description: 
          "115.0",
     }
]


export default VOR
