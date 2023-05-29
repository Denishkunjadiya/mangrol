import React from 'react'
import ReactPaginate from 'react-paginate';

// onPageChange, recordPerPage, pageCount, currentPage, setRecordPerPage

export default function Pagination({ cPage, pageCount, pageChange, recordPerPage, setRecordPerPage }) {
    return (
        <div>
            <nav className="" >
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(e) => pageChange(e)}
                    pageRangeDisplayed={2}
                    pageCount={pageCount}
                    initialPage={cPage - 1}
                    previousLabel="<"
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
                <div className='pagination_page'>
                    <select id="countries" className="bg-gray-50 border border-indigo-600 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500" value={recordPerPage} onChange={(e) => setRecordPerPage(e.target.value)}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </nav>
        </div>
    )
}
