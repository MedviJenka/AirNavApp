type airports = {
     title: string,
     location: {
          latitude: number,
          longitude: number
     } ,
     description: string,
     info: string
}[]


const AIRPORTS: airports = [
     {
          title: "LLBS",
          location: {
          latitude:  31.2865,
          longitude: 34.72334,
          },
          description: "LLBS (Teyman): 122.500\nKEDEM: 118.350\nVOR: 114.3\nRWY: 32/14\n AD ELEV: 650 ft",
          info: 'https://www.gov.il/he/pages/beersheva-landing-ground'
     },
     {
          title: "LLMZ",
          location: {
          latitude:  31.3250,
          longitude: 35.3879,
          },
          description: "LLMZ (Metzada): 122.550\nRWY: 01/19\nVOR: 115.0\nAD ELEV: -1233 ft",
          info: 'https://www.gov.il/he/pages/masada-landing-ground'
     }
]


export default AIRPORTS
