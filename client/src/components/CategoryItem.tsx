import { NavLink } from "react-router-dom";

type CategoryItemProps = {
    category: {
        href: string;
        name: string;
        imageUrl: string;
    };
};

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
    return (
        <div className="relative overflow-hidden h-96 w-full rounded-lg group">
            <NavLink
                to={`/category${category.href}`} // links to /category/category_name
            >
                <div className='w-full h-full cursor-pointer'>
                    <div className='absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10' />
                    <img
                        src={category.imageUrl}
                        alt={category.name}
                        className='w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'
                        loading='lazy'
                    />
                    <div className='absolute bottom-0 left-0 right-0 p-4 z-20'>
                        <h3 className='text-white text-2xl font-bold mb-2'>{category.name}</h3>
                        <p className='text-gray-200 text-sm'>Explore {category.name}</p>
                    </div>
                </div>
            </NavLink>
        </div>
    );
};

export default CategoryItem;