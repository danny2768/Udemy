import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from "../../domain";

export class CategoryService {

    constructor() {}

    async createCategory( createCategoryDto: CreateCategoryDto, user: UserEntity) {
        const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });   
        if (categoryExists) throw CustomError.badRequest('Category already exists');

        try {
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id,
            })

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available,
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }        
    }

    async getCategories( paginationDto: PaginationDto) {

        const { page, limit } = paginationDto;

        try {
            // const total = await CategoryModel.countDocuments();
            // const categories = await CategoryModel.find()
            //     .skip( (page - 1) * limit )
             //     .limit( limit )
                
            const [ total, categories ] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip( (page - 1) * limit )
                    .limit( limit ),
            ])

            return {
                pagination: {
                    page: page,
                    limit: limit,
                    total: total,
                    next: `/api/categories?page=${page + 1}&limit=${limit}`,
                    previous: ( page - 1 > 0) ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
                    first: `/api/categories?page=1&limit=${limit}`,
                    last: `/api/categories?page=${Math.ceil(total / limit)}&limit=${limit}`,        
                },     

                categories: categories.map( category => ({
                    id: category.id,
                    name: category.name,
                    available: category.available,
                })),
            }
        } catch (error) {
            throw  CustomError.internalServer(`Internal server error`);
        }
    }
}