import react from 'react'
import { Types } from '../../types/Types'
import './ProductListItem.css'

type Props = {
    product: Types.Product
    onPress: () => void
}

const ProductListItem = ({product, onPress}: Props) => {
    return (
        <div className='product-list-item-container'>
            <div>{product.title}</div>
            <div>Created Date: {product.created_at}</div>
            <div>Price: ${product.price}</div>
            <button onClick={onPress}>View Product</button>
        </div>
    )
}

export default ProductListItem