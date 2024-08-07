import { ProductModel } from "../../data";
import { CreateProductDto, CustomError } from "../../domain";
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';

export class ProductService {
    
    constructor() {}

    async getProducts( paginationDto: PaginationDto ) {
        const { page, limit } = paginationDto;

        try {
            const [ total, products ] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip( (page - 1) * limit )
                    .limit( limit )
                    .populate('user','name email')
                    .populate('category')
            ]);

            return {
                page,
                limit,
                total,
                next: `/api/products?page=${ page + 1 }&limit=${ limit }`,
                prev: ( page - 1 > 0 ) ? `/api/products?page=${ page - 1 }&limit=${ limit }` : null,

                products,
            }
        } catch (error) {
            
        }

    }

    async createProduct( createProductDto: CreateProductDto ) {

        const productExists = await ProductModel.findOne({ name: createProductDto.name });
        if (productExists) throw new Error('Product already exists');

        try {
            const product = new ProductModel( createProductDto );
            await product.save();

            return product;
        } catch (error) {
            throw CustomError.internalServer(`${ error }`)
        }
        

    }
}