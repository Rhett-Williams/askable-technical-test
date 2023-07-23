import React, { useEffect, useState } from "react";
import { useGetProductsMutation } from "../../redux/services/Product/ProductService";
import ProductListItem from "../../components/producListItem/ProductListItem";
import { useNavigate } from "react-router-dom";
import './Products.css'
import { GetProductsArgs } from "../../redux/services/Product/ProductTypes";

const Products = () => {
    const [getProducts, {data: products}] = useGetProductsMutation()
    const [sortedBy, setSortedBy] = useState<GetProductsArgs['sortedBy']>()
    const navigate = useNavigate();

    useEffect(() => {
        getProductData()
    },[sortedBy])

    const getProductData = async () => {
        try {
            await getProducts({sortedBy}).unwrap()
        } catch (error) {
            console.log("error", error)
        }
    }

    const renderProducts = () => {
        return products?.map((product, index) => {
            return <ProductListItem product={product} onPress={() => navigate(`/viewProduct/${product._id}`)}/>
        })
    }

    const renderSortedByButtons = () => {
        const sortedByOptions: GetProductsArgs['sortedBy'][] = ["CreateDate", "Price"]
        return sortedByOptions.map((option, index) => {
            return (
            <>
                <div
                    className="sorted-by-option"
                    onClick={() => option !== sortedBy ? setSortedBy(option) : setSortedBy(undefined)}
                    style={{color: sortedBy === option ? "orange" : "black"}}
                    >{option}
                </div>
                {(index !== sortedByOptions.length-1) && <div>&nbsp;|&nbsp;</div>}
            </>
            )
        })
    }

    return (
        <div>
            <h2>Products</h2>
            <div className="filtered-by-contained">Filtered by: {renderSortedByButtons()}</div>
            {renderProducts()}
        </div>
    )
};

export default Products;