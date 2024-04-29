type airports = {
     title: string,
     location: {
          latitude: number,
          longitude: number
     } ,
     description: string
}[]




const AIRPORTS: airports = [
     {
          title: "LLBS",
          location: {
          latitude:  31.2865,
          longitude: 34.72334,
          },
          description: "LLBS: 122.500\nKEDEM: 118.350\nVOR: 114.3",
     }
]


export default AIRPORTS
