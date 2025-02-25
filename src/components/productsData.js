const products = [ 
  { id: 1, name: 'iPhone 13', price: 650000, image: 'https://images-cdn.ubuy.co.id/64dc1dbacb432b7bec5203e4-open-box-apple-iphone-13-pro-max-a2484.jpg' },
  { id: 2, name: 'AirPods Pro', price: 45000, image: 'https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907_big.jpg.large.jpg' },
  { id: 3, name: 'Portable Power Bank', price: 25000, image: 'https://www-konga-com-res.cloudinary.com/f_auto,fl_lossy,dpr_3.0,q_auto/media/catalog/product/G/K/69398_1727450194.jpg' },
  { id: 4, name: 'Laptop Charger', price: 20000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCURZ9sDM1Mf2pb5rJeo8gnlS_kDYCzS_y5A&s' },

  // New Products
  { id: 5, name: 'iPhone 13 Red', price: 670000, image: 'https://images-na.ssl-images-amazon.com/images/I/71EvexPYtWL._AC_UL165_SR145,165_.jpg' },
  { id: 6, name: 'Iphone7 64gb', price: 80000, image: 'https://www.phonerepairphilly.com/uploads/9/9/6/7/9967087/s365228547906582083_p4_i2_w640.png' },
  { id: 7, name: 'Iphone 12 pro max 128gb', price: 500000, image: 'https://i.ebayimg.com/thumbs/images/g/DS0AAOSwoUJld2p4/s-l225.jpg' },
  { id: 8, name: 'Iphone 14', price: 900000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmqmtok6tAEEOvxXNHi9nQ7Fb6wDT36I0EZg&s' },

  { id: 9, name: 'Iphone XXmax 64gb', price: 350000, image: 'https://www.nairaland.com/attachments/10834106_fa14e4b611cd4a488feb7a8fec41f3a6_jpeg_jpeg4dc2c8f228f260a51833f4bf858ce015' },
  { id: 10, name: 'Iphone 11 pro max 64gb', price: 450000, image: 'https://apollo.olx.in/v1/files/49qxeip5w1kx1-ADVIN/image;s=272x0' },
  { id: 11, name: 'Iphone 8 plus 64gb', price: 115000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThVHMXT8c7zvHl8U0d_WG0LevCYMhun7efHQ&s' },
  { id: 12, name: 'Iphone 11 64gb', price: 350000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReytT5xoLsuWRHlggrL9dOYukM3qlgUVpE9Q&s' },
  { id: 13, name: 'IPhone7,8 64gb ', price: 95000, image: 'https://www.upfrica.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcTRmIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e4e928b22ba48787567ee7ee81597644b5d25a30/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2REdOdmJuWmxjblE2Q1hkbFluQT0iLCJleHAiOm51bGwsInB1ciI6InZhcmlhdGlvbiJ9fQ==--6ebee877eb446e7a3476cc7c3aed153245b974c5/IMG-20220502-WA0015.jpg?h=1400' },
  { id: 14, name: 'IPhone7 64gb ', price: 90000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk7QWEldtrtwKyODe8lCboA6gnCPIF_v_T0Q&s' },
  { id: 15, name: 'Apple iphone Earpiece', price: 3000, image: 'https://applepremiumstore.com.ng/wp-content/uploads/2021/09/MMTN2-247x296.png' },
  { id: 16, name: 'Iphone Fast Charger', price: 10000, image: 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/59/8402261/1.jpg?1403' },
  { id: 17, name: 'Wireless Charging Pad', price: 18000, image: 'https://pictures-nigeria.jijistatic.net/33537306_s-l640_620x620.jpg' },
  { id: 18, name: 'Oraimo Charger', price: 5000, image: 'https://opor.ng/imgs/board/96/182696-1.jpg' },
  { id: 19, name: 'Iphone Charger', price: 85000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf7w5_n1SZ-Gn5MIIUE63uVhvRj4sC2XPcow&s' },
  { id: 20, name: 'Bluetooth Airpods i9s', price: 7500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5snzz67bK8a31M2Q29LwPFIOcDBS_1e4CGQ&s' },
  { id: 21, name: 'Iphone Charger', price: 7000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk7QO3Ut5VSRNds5WhiLBQxWKLikpgz8pPNw&s' },
  { id: 22, name: 'Bluetooth Earbuds i9s', price: 12000, image: 'https://i.ebayimg.com/images/g/6wsAAOSwNdRnigJQ/s-l400.jpg' },
  { id: 23, name: 'Bluetooth Earbuds Oraimo', price: 15000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGfrFstDkuwX2LsczBapvuFnTLSNOJB0_rew&s' },
  { id: 24, name: 'Bluetooth Earbuds Oraimo', price: 20000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTARDe50j7J4zIpxSnHMuSp7aHiyCpCgOJZ3Q&s' },

  // Newly Added Products (From 25 to 51)
  { id: 25, name: 'Bluetooth Earbuds', price: 35000, image: 'https://i2-prod.liverpoolecho.co.uk/article29558251.ece/ALTERNATES/s615/0_EARBUDS__AMAZON.jpg' },
  { id: 26, name: 'Gaming Laptop', price: 400000, image: 'https://i0.wp.com/ng.oklaptops.com/wp-content/uploads/2023/12/WhatsApp-Image-2024-12-03-at-17.03.30_97ada398.jpg?fit=600%2C450&ssl=1' },
  { id: 27, name: 'Apple Laptop MAC', price: 750000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTay3Ww7LTj2dllHXYTtG0lBcDel0wE74mbqQ&s' },
  { id: 28, name: 'HP Laptop 350gb', price: 350000, image: 'https://opor.ng/imgs/board/49/227649-1.jpg' },
  { id: 29, name: 'HP Laptop 150gb', price: 150000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtt__xzZlhKJIou4UEQrfNjO9c_dBblan3gA&s' },
  { id: 30, name: 'HP Laptop charger', price: 20000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1geYLByzse27OLu3njXTmanwRko9Z2_lr5w&s' },
  { id: 31, name: 'HP Laptop charger', price: 18000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxTEqrXULXHLhJkKPfiq8w18Yu0M0FBftHww&s' },
  { id: 32, name: 'Samsung FOLD', price: 850000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmBeXGQ-gtBOji1pjmjWvfq1fLoRCzw4bUcA&s' },
  { id: 33, name: 'Samsung S22 ULTRA Pink', price: 400000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjiAMpEU0s9FbneSy9njAkdrpFoP4TYoRlQQ&s' },
  { id: 34, name: 'Samsung S22 ULTRA', price: 350000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrxIaI-ivY7AHx3OBCWMuOAK2Re55AHX7tCA&s' },
  { id: 35, name: 'Samsung Galaxy Note 7', price: 150000, image: 'https://cdn.businessday.ng/2016/10/galaxy-note-7.jpg' },
  { id: 36, name: 'Samsung S10', price: 250000, image: 'https://cdn.i-scmp.com/sites/default/files/styles/1020x680/public/d8/images/2019/04/09/p1000354.jpg?itok=2UzUfNzw' },
  { id: 37, name: 'TYPE C in and Out Charger', price: 25000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVDfuql2Lk2E2dp0ihtgu8Mpy1xBLzp1WcjQ&s' },
  { id: 38, name: 'Type C Charger', price: 4000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYldjMieea121dUiqzXGTYzmXb2j128L7-hw&s' },
  { id: 39, name: 'Oraimo Android and TYPE C Charger', price: 5000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ8n8U1GCAEIckeL_3OBPNYKfIeoT5lbGprg&s' },
  { id: 40, name: 'Oraimo Power bank 20,000mh', price: 15000, image: 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/74/523389/1.jpg?7967' },
  { id: 41, name: 'New Age Power bank', price: 11000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaCF6CFuOMbNzUHaYT3szV7vFf9cdY_AQUIA&s' },
  { id: 42, name: 'New power bank', price: 18000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmcv4QWdrl1uWyOwvQlgQufog1NX60mfeyFg&s' },
  { id: 43, name: 'Oraimo Power bank', price: 15000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh-QcD-1JMIRHcs8pEQo4YjM7k-JCVPVGLiw&s' },
  { id: 44, name: 'Power bank', price: 30000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ48dRm3uVka7Ut4p75MweJnS2hIzls7jTAyQ&s' },
  { id: 45, name: 'MP3 speaker', price: 80000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCNywpMz5K2X-SCWBeljK2nx2-1aviXKFOg&s' }
];

export default products;
