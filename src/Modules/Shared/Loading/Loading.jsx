export default function Loading({ colSpan }) {
    return (
        <tr>
            <td colSpan={colSpan} className="text-center">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </td>
        </tr>
    )
}
