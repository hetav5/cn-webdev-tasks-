import React, { useEffect, useState } from 'react';
import HomeCards from './Homecards.jsx';
const productData = {
  "clothing": [
    {
      "id": 1,
      "img": "https://assets.ajio.com/medias/sys_master/root/20230629/3fk1/649cafedeebac147fc2d44ef/-473Wx593H-465960612-teal-MODEL.jpg",
      "title": "Men's T-Shirt",
      "description": "Stylish men's t-shirt made of breathable fabric.",
      "price": 1649.18
    },
    {
      "id": 2,
      "img": "https://cdn.pixabay.com/photo/2022/12/04/07/03/woman-7633843_640.jpg",
      "title": "Women's Dress",
      "description": "Elegant dress suitable for all occasions.",
      "price": 4099.18
    },
    {
      "id": 3,
      "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkIk5Ny1Wmk32T2TRTlawKL5XtiGTElZB5Q&s",
      "title": "Kids' Jacket",
      "description": "Warm and cozy jacket for kids.",
      "price": 2499.18
    },
    {
      "id": 4,
      "img": "https://redtape.com/cdn/shop/products/8-800x800_7a6dffdc-39fd-4dd1-9c66-2f4147bf9eef.jpg?v=1709533723",
      "title": "Sneakers",
      "description": "Comfortable sneakers for everyday wear.",
      "price": 3299.18
    },
    {
      "id": 5,
      "img": "https://img.freepik.com/premium-photo/watch-with-white-background-high-quality-ultra-hd_889056-17826.jpg",
      "title": "Watch",
      "description": "Stylish analog watch for men.",
      "price": 5999.18
    },
    {
      "id": 6,
      "img": "https://t4.ftcdn.net/jpg/01/10/04/51/360_F_110045173_QgmA3gg5OwTlLNQBqmPdFnkh6sPvsvt8.jpg",
      "title": "Women's Handbag",
      "description": "Trendy handbag for women.",
      "price": 2899.18
    },
    {
      "id": 7,
      "img": "https://m.media-amazon.com/images/I/51mwneZeJ4L._AC_UY1100_.jpg",
      "title": "Cap",
      "description": "Stylish cap for casual outings.",
      "price": 999.18
    },
    {
      "id": 8,
      "img": "https://png.pngtree.com/png-vector/20210426/ourmid/pngtree-clothing-red-scarf-png-image_3243900.png",
      "title": "Scarf",
      "description": "Soft scarf for added warmth.",
      "price": 1499.18
    },
    {
      "id": 9,
      "img": "https://i.pinimg.com/736x/5f/30/34/5f3034511277e8ab76eeee629cc6613a.jpg",
      "title": "Sunglasses",
      "description": "Stylish sunglasses for sunny days.",
      "price": 1999.18
    },
    {
      "id": 10,
      "img": "https://m.media-amazon.com/images/I/71TXou7HBXL._SX569_.jpg",
      "title": "Belt",
      "description": "Classic leather belt for men.",
      "price": 1299.18
    },
    // Add more clothing products...
  ],
 "electronics": [
    {
      "id": 1,
      "img": "https://images.unsplash.com/photo-1721864429288-f77b22fdc9ea?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNhbXN1bmclMjBwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
      "title": "Smartphone",
      "description": "Latest smartphone with advanced features.",
      "price": 54999.18
    },
    {
      "id": 2,
      "img": "https://m.media-amazon.com/images/I/71bDJ9wxxWL.jpg",
      "title": "Laptop",
      "description": "Powerful laptop for work and play.",
      "price": 79999.18
    },
    {
      "id": 3,
      "img": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww",
      "title": "Headphones",
      "description": "Noise-cancelling headphones for immersive sound.",
      "price": 2999.18
    },
    {
      "id": 4,
      "img": "https://m.media-amazon.com/images/I/41WzNRxZCEL._AC_.jpg",
      "title": "Smartwatch",
      "description": "Track your fitness with this smartwatch.",
      "price": 6999.18
    },
    {
      "id": 5,
      "img": "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGJsdWV0b290aCUyMHNwZWFrZXJ8ZW58MHx8MHx8fDA%3D",
      "title": "Bluetooth Speaker",
      "description": "Portable speaker for high-quality sound.",
      "price": 3999.18
    },
    {
      "id": 6,
      "img": "https://m.media-amazon.com/images/I/71s04+f9SQL._AC_UF1000,1000_QL80_.jpg",
      "title": "Action Camera",
      "description": "Capture your adventures with this action camera.",
      "price": 24999.18
    },
    {
      "id": 7,
      "img": "https://m.media-amazon.com/images/I/511uNropzhL._AC_UF1000,1000_QL80_.jpg",
      "title": "Wireless Charger",
      "description": "Fast wireless charger for your devices.",
      "price": 1499.18
    },
    {
      "id": 8,
      "img": "https://www.digitaldreamsjaipur.com/wp-content/uploads/2020/06/Lenovo-Tab-M8-HD.jpg",
      "title": "Tablet",
      "description": "Versatile tablet for work and entertainment.",
      "price": 25999.18
    },
    {
      "id": 9,
      "img": "https://m.media-amazon.com/images/I/61+Ubj-AqxL.jpg",
      "title": "Gaming Console",
      "description": "Next-gen gaming console for ultimate gaming experience.",
      "price": 49999.18
    },
    {
      "id": 10,
      "img": "https://m.media-amazon.com/images/I/612hBRDvC5L.jpg",
      "title": "Smart TV",
      "description": "4K Smart TV for stunning visuals.",
      "price": 64999.18
    }
    // Add more electronics products...
  ],
  "home_appliances": [
    {
      "id": 1,
      "img": "https://cdn.pixabay.com/photo/2011/12/05/14/49/blender-10934_640.jpg",
      "title": "Blender",
      "description": "High-speed blender for smoothies and soups.",
      "price": 2999.18
    },
    {
      "id": 2,
      "img": "https://t3.ftcdn.net/jpg/05/71/69/60/360_F_571696078_2xtCgzkC4C8iFOCBZxoGwRH3KAAhMl7H.jpg",
      "title": "Toaster",
      "description": "Compact toaster for quick breakfast.",
      "price": 2499.18
    },
    {
      "id": 3,
      "img": "https://rukminim2.flixcart.com/image/850/1000/kmf7ki80/electric-cooker/s/l/i/cute-1-8-2-electric-rice-cooker-with-steaming-feature-cute-1-8-2-original-imagfby5kyjxqzfa.jpeg?q=90&crop=false",
      "title": "Rice Cooker",
      "description": "Easy-to-use rice cooker for perfect rice.",
      "price": 3999.18
    },
    {
      "id": 4,
      "img": "https://img.freepik.com/premium-photo/microwave-oven-hd-8k-wallpaper-stock-photographic-image_973183-5905.jpg",
      "title": "Microwave Oven",
      "description": "Versatile microwave for quick cooking.",
      "price": 8499.18
    },
    {
      "id": 5,
      "img": "https://rukminim2.flixcart.com/image/850/1000/jm6mjrk0/air-fryer/j/u/6/black-hd9220-20-philips-original-imaf95d6ccgrbmma.jpeg?q=90&crop=false",
      "title": "Air Fryer",
      "description": "Healthy cooking with less oil.",
      "price": 6999.18
    },
    {
      "id": 6,
      "img": "https://m.media-amazon.com/images/I/71sgJeU0kkL._AC_UF894,1000_QL80_.jpg",
      "title": "Coffee Maker",
      "description": "Brew your favorite coffee with this stylish coffee maker.",
      "price": 4899.18
    },
    {
      "id": 7,
      "img": "https://img.freepik.com/premium-photo/empty-opened-dishwasher-kitchen-perfect-look-ultra-hd-generative-ai_756405-13692.jpg",
      "title": "Dishwasher",
      "description": "Efficient dishwasher for hassle-free cleaning.",
      "price": 40999.18
    },
    {
      "id": 8,
      "img": "https://rukminim2.flixcart.com/image/850/1000/xif0q/painting/f/b/u/28-1-largepainting-172-hd-rapid-design-original-imahynr9usydxac4.jpeg?q=90&crop=false",
      "title": "Wall Art Decor",
      "description": "Beautiful wall art to enhance your home decor.",
      "price": 2879.18
    },
    {
      "id": 9,
      "img": "https://ii1.pepperfry.com/media/catalog/product/o/f/494x544/off-white-fabric-tripod-floor-lamp-by-craftter-off-white-fabric-tripod-floor-lamp-by-craftter-03pjhd.jpg",
      "title": "Floor Lamp",
      "description": "Stylish floor lamp for cozy lighting.",
      "price": 1999.18
    },
    {
      "id": 10,
      "img": "https://cdn.mos.cms.futurecdn.net/Ek2kyrb7BqbAZXepGvvVYL.jpg",
      "title": "Smart Thermostat",
      "description": "Control your home temperature with this smart thermostat.",
      "price": 9999.18
    },
  ]
};

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchedProducts = [];
    for (const category in productData) {
      fetchedProducts.push(...productData[category]);
    }
    setProducts(fetchedProducts);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map(product => (
        <HomeCards key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Home;
