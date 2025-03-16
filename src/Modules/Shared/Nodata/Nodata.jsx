import noDataImage from '../../../assets/noData.png'
export default function Nodata() {
    return (
        <div>
            <div className="text-center">
                <img className="w-25" src={noDataImage} alt="no data" />
                <h4>No Data</h4>
                <p>No data available</p>
            </div>
        </div>
    )
}