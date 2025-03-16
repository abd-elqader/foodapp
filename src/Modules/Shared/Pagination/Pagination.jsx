import { Link } from "react-router-dom";

export const Pagination = ({ currentPage, totalPages, onPageChange, entityType }) => {
    const arrayOfPages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const pageRange = 2;

    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - pageRange);
        let endPage = Math.min(totalPages, currentPage + pageRange);

        // Add the first page and ellipsis if needed
        if (startPage > 1) {
            pages.push(1);
            if (startPage > 2) {
                pages.push('...');
            }
        }

        // Add the pages within the range
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Add the last page and ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push('...');
            }
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">

                <li className="page-item">
                    <Link
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 1) onPageChange(currentPage - 1);
                        }}
                    >
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                    </Link>
                </li>

                {getPageNumbers().map((page, index) => (
                    <li
                        key={index}
                        className={`page-item ${currentPage === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                        onClick={() => {
                            if (page !== '...') onPageChange(page);
                        }}

                    >
                        <Link className="page-link" href="#">
                            {page}
                        </Link>
                    </li>
                ))}

                <li className="page-item">
                    <Link
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < totalPages) onPageChange(currentPage + 1);
                        }}
                    >
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
