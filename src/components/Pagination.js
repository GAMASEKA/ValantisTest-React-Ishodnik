import React, { useEffect } from "react";
import { getProduct } from "../http/productStore";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ReactLoading from "react-loading";


const Pagination = ({ setLoading, productPerPage, totalProducts, paginate, setProduct }) => {
    const pageNumbers = [];    

    for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
        pageNumbers.push(i);

    }
    return (
        
        <div>
            <ul className="pagination">
                {
                    pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a className="page-link" href="!#"
                                onClick={() => {
                                    paginate(number)
                                    setProduct(number)
                                }
                                }
                            >{number}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Pagination;