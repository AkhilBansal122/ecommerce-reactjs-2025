import React from "react";
import classNames from "classnames";
import "./pagination.scss";
import { DOTS, usePagination } from "./usePagination";
export const Pagination = ({
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });
    const onNext = () => {
        onPageChange(currentPage + 1);
        window.scrollTo(0, 0);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
        window.scrollTo(0, 0);
    };


    let lastPage = paginationRange[paginationRange.length - 1];
    if (totalCount <= pageSize) {
        return null
    } else {
        return (
            <ul
                className={classNames("pagination-container", { [className]: className })}
            >
                {/* Left navigation arrow */}
                <li
                    className={classNames("pagination-item active_visible previous_icon", {
                        disabled: currentPage === 1,
                    })}
                    onClick={onPrevious}
                >
                    <div className="arrow_right_text">
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 0.292893C8.09763 0.683418 8.09763 1.31658 7.70711 1.70711L2.41421 7L7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L0.292893 7.70711C-0.0976318 7.31658 -0.0976317 6.68342 0.292893 6.29289L6.29289 0.292893C6.68342 -0.0976312 7.31658 -0.0976311 7.70711 0.292893Z" fill="currentcolor" />
                        </svg>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M7.70711 0.292893C8.09763 0.683418 8.09763 1.31658 7.70711 1.70711L2.41421 7L7.70711 12.2929C8.09763 12.6834 8.09763 13.3166 7.70711 13.7071C7.31658 14.0976 6.68342 14.0976 6.29289 13.7071L0.292893 7.70711C-0.0976318 7.31658 -0.0976317 6.68342 0.292893 6.29289L6.29289 0.292893C6.68342 -0.0976312 7.31658 -0.0976311 7.70711 0.292893Z" fill="currentcolor" />
                        </svg>
                        {/* <span>Previous</span> */}
                    </div>
                </li>
                <div className="pagination_number_center">
                {paginationRange.map((pageNumber, index) => {
                    if (pageNumber === DOTS) {
                        return <li className="pagination-item dots" key={index}>&#8230;</li>;
                    }
                    return (
                            <li
                            className={classNames("pagination-item", {
                                selected: pageNumber === currentPage,
                            })}
                            onClick={() => {
                                onPageChange(pageNumber)
                                window.scrollTo(0, 0);
                            }}
                            key={index}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                </div>
                <li
                    className={classNames("pagination-item active_visible next_icon", {
                        disabled: currentPage === lastPage,
                    })}
                    onClick={onNext}
                >
                    <div className="arrow_right_text">
                        {/* <span>Next</span> */}
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893C0.683418 -0.0976314 1.31658 -0.0976314 1.70711 0.292893L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071Z" fill="currentcolor" />
                        </svg>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7L0.292893 1.70711C-0.0976309 1.31658 -0.0976309 0.683417 0.292893 0.292893C0.683418 -0.0976314 1.31658 -0.0976314 1.70711 0.292893L7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L1.70711 13.7071C1.31658 14.0976 0.683417 14.0976 0.292893 13.7071Z" fill="currentcolor" />
                        </svg>
                    </div>
                </li>
            </ul>
        )
    }
};
