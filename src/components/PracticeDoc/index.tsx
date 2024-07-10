enum ProductStatus{
    Instock= "In Stock",
    Outofstock= "Out of Stock",
}

enum Category{
    Electronics= "Electronics",
    Clothing= "Clothing",
    Books= "Books",
}

interface Product {
    id: number,
    name: string,
    description: string,
    price: number,
    status: ProductStatus,
    category: Category
}

interface Warrenty {
    duration: number,
    type: string
}

interface ColorOptions {
    color?: string,
}

interface SizeOptions {
    size?: "XS" | "S" | "M" | "L" | "XL" | "XXL"    
}

interface ProductReview {
    user: string,
    rating: number,
    Comment: string
}

interface FinalProduct extends Product {
    warraenty: Warrenty,
    rating: number,
    reviews: ProductReview[],
    colorOptions: ColorOptions,
    sizeOptions: SizeOptions
}

const product:FinalProduct[]= [
    {
        id:1,
        name: "Laptop",
        description: "Dell Inspiron 15 3000 Core i3 6th Gen - (4 GB/1 TB HDD/Windows 10 Home) 3567 Laptop",
        price: 30000,
        status: ProductStatus.Instock,
        category: Category.Electronics,
        warraenty: {
            duration: 1,
            type: "Manufacturer"
        },
        rating: 4.5,
        reviews: [
            { user: "User1", rating: 4, Comment: "Good Product" }, 
            { user: "User2", rating: 5, Comment: "Excellent Product" }] ,
        colorOptions: { color: "Black" },
        sizeOptions: { size: "L" }  
    },
    {
        id:2,
        name: "Shirt",
        description: "good quality shirt",
        price: 500,
        status: ProductStatus.Instock,
        category: Category.Clothing,
        warraenty: {
            duration: 1,
            type: "Manufacturer"
        },
        rating: 4.5,
        reviews: [
            { user: "User1", rating: 4, Comment: "Good Product" }, 
            { user: "User2", rating: 5, Comment: "Excellent Product" }] ,
        colorOptions: { color: "Black" },
        sizeOptions: { size: "L" }
    },
]

const FindSumOfProductPrice = (product: FinalProduct[]):number =>{
    let sum = 0;
    product.forEach((product) => {
        sum += product.price;
    });
    return sum; 
}

console.log(FindSumOfProductPrice(product));

let newProduct: Required<Product>= {
    id:3,
    name: "Book",
    description: "Good Book",
    price: 500,
    status: ProductStatus.Instock,
    category: Category.Books }



let newProduct1: Partial<Product>= {}  
newProduct1.id = 4;
newProduct1.name = "Book";
newProduct1.description = "Good Book";
newProduct1.price = 500;
newProduct1.status = ProductStatus.Instock;
newProduct1.category = Category.Books;


let newProduct2: Pick<Product, "id" | "name" | "description">= {
    id: 5,
    name: "Book",
    description: "Good Book"
}

let newProduct3: Omit<FinalProduct, "reviews" | "category">= {      
    id: 6,
    name: "Book",
    description: "Good Book",
    price: 500,
    status: ProductStatus.Instock,
    warraenty: {
        duration: 1,
        type: "Manufacturer"
    },
    rating: 4.5,
    colorOptions: { color: "Black" },
    sizeOptions: { size: "L" }
}

export{}