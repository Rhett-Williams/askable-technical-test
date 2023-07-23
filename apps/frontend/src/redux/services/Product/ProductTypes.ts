import { Types } from "../../../types/Types"

export type GetProductsArgs = {
    sortedBy: "CreateDate" | "Price" | undefined
}

export type GetProductsData = Types.Product[]
