import noDataImage from '../../../assets/noData.png'
export default function NoFound() {
    return (
        <tr>
            <td className="text-center" colSpan="6">
                <div>
                    <div className="text-center">
                        <img className="w-25" src={noDataImage} alt="no data" />
                        <h4>No Data</h4>
                        <p>No data available</p>
                    </div>
                </div>
            </td>
        </tr>
    )
}