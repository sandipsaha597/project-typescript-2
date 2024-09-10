import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import ApexChart from 'react-apexcharts'
import { fetchData } from '../../../../utils/functions'

type CovidData = {
  cases: Record<string, number>
  deaths: Record<string, number>
  recovered: Record<string, number>
}

const fetchCovidData = async (): Promise<CovidData> => {
  // below api end point returns us covid data by dates in format <date: number of cases>
  return fetchData('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
}

// line chart showing cases fluctuations using apex charts
const CasesFluctuationsLineChart = () => {
  const { data, error, isLoading } = useQuery<CovidData>({
    queryKey: ['covidData'],
    queryFn: fetchCovidData,
  })

  /* [IMPORTANT] [TODO] ==== This is a hack around there's currently 1117(approx) points in the api result
  that's why chart rendering is taking time and it's blocking the main thread.
  initially the mounted is false, it becomes true in useEffect. So the DOM is painted and we
  atleast see something. Lazy loading using React.lazy and Suspense only works for the first time
  after that it doesn't because react-query caches responses, so the data is available and also the
  component was loaded earlier. So we see a frozen screen temporarily which horrible for user experience
  possible solutions: 
    - Reducing the the number of data points we are showing in chart can help
    - There must be some options in react-query to handle it better. I don't know react-query in-depth yet
      that's why unable to get it done correctly
    */
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // if data is still loading or an error occurred we get an empty array
  const datesArray = useMemo(
    () => (!isLoading && !error ? Object.keys(data?.cases || {}) : []),
    [isLoading, error, data]
  )
  // if data is still loading or an error occurred we get an empty array
  const casesArray = useMemo(
    () => (!isLoading && !error ? Object.values(data?.cases || {}) : []),
    [isLoading, error, data]
  )

  const chartData = {
    series: [
      {
        name: 'Cases',
        data: casesArray,
      },
    ],
    options: {
      xaxis: {
        /* There's currently 1117(approx) points in the api result. Showing all of the in x-axis
        is not possible. That is why reducing the tick amount */
        tickAmount: Math.floor(datesArray.length / 100),
        categories: datesArray,
      },
    },
  }

  return (
    <div className="bg-white p-2 sm:p-5 pb-1">
      {mounted && (
        <ApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      )}
    </div>
  )
}

export default CasesFluctuationsLineChart
