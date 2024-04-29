type wayPointsType = {
     title: string,
     location: {
          latitude: number,
          longitude: number
     } ,
     description: string
}[]


const WAY_POINTS: wayPointsType = [

     {
          title: "TZFON HA-IR",
          location: {
          latitude:  31.2875,
          longitude: 34.7913,
          },
          description: 
          "ALT: 3000\nHDG: 106\nT road split below\nexpect HAGAV DAROM on 122.550",
     }, 
     {
          title: "OMER",
          location: {
          latitude:  31.2712,
          longitude: 34.8375,
          },
          description: "road 60 infront and omer after"
     },     
     {
          title: "SHOKET",
          location: {
          latitude:  31.3075,
          longitude: 34.9016,
          },
          description: "shoket intersection"
     },     
     {
          title: "MEITAR",
          location: {
          latitude:  31.3161,
          longitude: 34.9380,
          },
          description: "meitar to the left and hura to the right"
     },
]


export default WAY_POINTS
