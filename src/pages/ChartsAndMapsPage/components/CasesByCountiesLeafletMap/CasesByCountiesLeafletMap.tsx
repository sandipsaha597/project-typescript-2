import { useQuery } from '@tanstack/react-query'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { fetchData } from '../../../../utils/functions'

// adding marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})

type CovidDataByCountry = {
  country: string
  countryInfo: {
    lat: number
    long: number
  }
  active: number
  recovered: number
  deaths: number
}

const fetchCovidDataByCountry = async (): Promise<CovidDataByCountry[]> => {
  /* below api end point returns us covid data by country in detailed format which includes country
  info, latitude, longitude, active cases, recovered, deaths etc */
  return fetchData('https://disease.sh/v3/covid-19/countries')
}

/* Simple leaflet map with markers that indicates the country name, total number
of active, recovered cases and deaths in that particular country as a popup. */
const CasesByCountiesLeafletMap = () => {
  const { data, error, isLoading } = useQuery<CovidDataByCountry[]>({
    queryKey: ['covidDataByCountry'],
    queryFn: fetchCovidDataByCountry,
  })

  return (
    <div>
      {isLoading ? (
        'Loading...'
      ) : error ? (
        error.message
      ) : (
        // center in pointing to India
        <MapContainer className="h-96" center={[20, 77]} zoom={5}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data?.map((v, i) => (
            /* Ideally we should use a unique & stable id in key but countryInfo._id has 2 null values
            so that cannot be used here */
            <Marker key={i} position={[v.countryInfo.lat, v.countryInfo.long]}>
              <Popup>
                <div>Country Name: {v.country}</div>
                <div>Active: {v.active}</div>
                <div>Recovered: {v.recovered}</div>
                <div>Deaths: {v.deaths}</div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  )
}

export default CasesByCountiesLeafletMap
