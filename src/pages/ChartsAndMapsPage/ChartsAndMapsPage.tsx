import PageLayout1 from '../../components/layouts/PageLayout1/PageLayout1'
import CasesByCountiesLeafletMap from './components/CasesByCountiesLeafletMap/CasesByCountiesLeafletMap'
import CasesFluctuationsLineChart from './components/CasesFluctuationsLineChart/CasesFluctuationsLineChart'

const ChartsAndMapsPage = () => {
  return (
    <PageLayout1 pageTitle="Charts and Maps Page">
      <div className="w-11/12 sm:w-4/5 grid gap-10 m-auto py-5">
        <CasesFluctuationsLineChart />
        <CasesByCountiesLeafletMap />
      </div>
    </PageLayout1>
  )
}

export default ChartsAndMapsPage
