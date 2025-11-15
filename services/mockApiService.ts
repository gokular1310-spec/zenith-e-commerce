import { Product, User, Order, OrderStatus, NewProduct, CartItem, ShippingAddress, Conversation, Message, Review, NewReview, AITopic, Page, NewPage, SavedTheme, ThemeSettings, JobOpening, PressRelease, AdminSearchResults, SocialMediaLinks } from '../types';

const mockProducts: Product[] = [
  // Accessories
  { 
    id: 1, name: "Fusion Wireless Mouse", description: "Ergonomic mouse with 8-week battery life.", price: 79.99, category: "Accessories", subCategory: "Mice", 
    imageUrls: [
      "https://placehold.co/600x400/1e40af/white?text=Mouse+Front",
      "https://placehold.co/600x400/1e40af/white?text=Mouse+Side",
      "https://placehold.co/600x400/1e40af/white?text=Mouse+Top",
      "https://placehold.co/600x400/1e40af/white?text=Mouse+Angle"
    ], stock: 120,
    specs: { "Connectivity": "Bluetooth 5.1, 2.4GHz Wireless", "DPI": "16,000", "Battery": "8 weeks" },
    reviews: [ { id: 1, author: "customer@example.com", rating: 5, comment: "Absolutely love this mouse! So comfortable.", date: "2023-10-15" } ],
    addedBy: '1'
  },
  { 
    id: 2, name: "Aura Mechanical Keyboard", description: "RGB backlit mechanical keyboard with custom switches.", price: 149.99, originalPrice: 166.66, category: "Accessories", subCategory: "Keyboards", 
    imageUrls: [
      "https://placehold.co/600x400/1e40af/white?text=Keyboard+Main",
      "https://placehold.co/600x400/1e40af/white?text=Keyboard+Keys",
      "https://placehold.co/600x400/1e40af/white?text=Keyboard+RGB"
    ], stock: 75,
    specs: { "Switch Type": "Custom Tactile", "Backlight": "Full RGB", "Layout": "104-Key" },
    reviews: [ { id: 2, author: "jane.s@example.com", rating: 4, comment: "Great keyboard, very clicky.", date: "2023-10-20" } ],
    addedBy: '5'
  },
  { id: 101, name: "Pro Gaming Mousepad", description: "Large surface area for maximum precision.", price: 29.99, category: "Accessories", subCategory: "Mice", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Mousepad"], stock: 200, specs: {}, reviews: [], addedBy: '1' },
  { id: 102, name: "Compact TKL Keyboard", description: "Tenkeyless design for more desk space.", price: 119.99, category: "Accessories", subCategory: "Keyboards", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=TKL+Keyboard"], stock: 60, specs: {}, reviews: [], addedBy: '5' },
  { id: 103, name: "USB-C Hub", description: "7-in-1 hub with HDMI, USB-A, and SD card reader.", price: 59.99, category: "Accessories", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=USB-C+Hub"], stock: 150, specs: {}, reviews: [], addedBy: '1' },
  { id: 104, name: "Laptop Stand", description: "Ergonomic aluminum laptop stand.", price: 45.00, category: "Accessories", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Laptop+Stand"], stock: 180, specs: {}, reviews: [], addedBy: '5' },
  { id: 105, name: "Webcam Cover", description: "Slide cover for privacy.", price: 9.99, category: "Accessories", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Webcam+Cover"], stock: 500, specs: {}, reviews: [], addedBy: '1' },
  { id: 106, name: "Silent Click Mouse", description: "Quiet clicks for a peaceful environment.", price: 34.99, category: "Accessories", subCategory: "Mice", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Silent+Mouse"], stock: 90, specs: {}, reviews: [], addedBy: '5' },
  { id: 107, name: "Ergonomic Keyboard", description: "Split design to reduce wrist strain.", price: 189.99, category: "Accessories", subCategory: "Keyboards", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Ergo+Keyboard"], stock: 45, specs: {}, reviews: [], addedBy: '1' },
  { id: 108, name: "4K Webcam", description: "Crystal clear video for streaming and meetings.", price: 199.00, category: "Accessories", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=4K+Webcam"], stock: 70, specs: {}, reviews: [], addedBy: '5' },
  { id: 109, name: "Vertical Mouse", description: "Natural handshake position for comfort.", price: 89.99, category: "Accessories", subCategory: "Mice", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Vertical+Mouse"], stock: 65, specs: {}, reviews: [], addedBy: '1' },
  { id: 110, name: "Wireless Charging Pad", description: "Fast wireless charging for your devices.", price: 49.99, category: "Accessories", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Charger"], stock: 250, specs: {}, reviews: [], addedBy: '5' },

  // Monitors
  { 
    id: 3, name: "Zenith 27\" 4K Monitor", description: "Ultra-sharp 4K UHD display with HDR support.", price: 499.99, category: "Monitors", 
    imageUrls: [
      "https://placehold.co/600x400/1e40af/white?text=4K+Monitor",
      "https://placehold.co/600x400/1e40af/white?text=Monitor+Back",
      "https://placehold.co/600x400/1e40af/white?text=Monitor+Ports"
    ], stock: 50,
    specs: { "Resolution": "3840 x 2160", "Refresh Rate": "144Hz", "Panel": "IPS" },
    reviews: [], addedBy: '1'
  },
  { 
    id: 12, name: "Terra Ultra-Wide Monitor", description: "34-inch curved monitor for immersive productivity.", price: 799.50, category: "Monitors", imageUrls: ["https://placehold.co/600x400/1d4ed8/white?text=Ultra-Wide"], stock: 40,
    specs: { "Resolution": "3440 x 1440", "Aspect Ratio": "21:9", "Curvature": "1800R" },
    reviews: [], addedBy: '5'
  },
  { id: 111, name: "Portable 15\" Monitor", description: "USB-C powered monitor for on-the-go.", price: 249.99, category: "Monitors", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Portable+Monitor"], stock: 80, specs: {}, reviews: [], addedBy: '1' },
  { id: 112, name: "Gaming 240Hz Monitor", description: "Blazing fast refresh rate for competitive gaming.", price: 399.00, category: "Monitors", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=240Hz+Monitor"], stock: 55, specs: {}, reviews: [], addedBy: '5' },
  { id: 113, name: "Creator's Color-Accurate Monitor", description: "99% Adobe RGB for professional photo and video editing.", price: 899.00, category: "Monitors", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Creator+Monitor"], stock: 30, specs: {}, reviews: [], addedBy: '1' },
  { id: 114, name: "Budget 24\" 1080p Monitor", description: "A great everyday monitor for work or play.", price: 149.99, category: "Monitors", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=1080p+Monitor"], stock: 200, specs: {}, reviews: [], addedBy: '5' },
  { id: 115, name: "49\" Super Ultrawide", description: "The ultimate multitasking and gaming experience.", price: 1299.00, category: "Monitors", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Super+Ultrawide"], stock: 20, specs: {}, reviews: [], addedBy: '1' },
  { id: 116, name: "27\" 1440p 144Hz Monitor", description: "The sweet spot for gaming and productivity.", price: 349.99, category: "Monitors", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=1440p+Monitor"], stock: 110, specs: {}, reviews: [], addedBy: '5' },
  { id: 117, name: "Touchscreen Monitor", description: "10-point multi-touch for interactive applications.", price: 329.00, category: "Monitors", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Touchscreen"], stock: 40, specs: {}, reviews: [], addedBy: '1' },
  { id: 118, name: "OLED Gaming Monitor", description: "True blacks and vibrant colors.", price: 999.00, category: "Monitors", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=OLED+Monitor"], stock: 25, specs: {}, reviews: [], addedBy: '5' },

  // Audio
  { 
    id: 6, name: "Solaris Noise-Cancelling Headphones", description: "Immersive sound with industry-leading noise cancellation.", price: 349.00, category: "Audio", subCategory: "Headphones", 
    imageUrls: [
      "https://placehold.co/600x400/1e40af/white?text=Headphones+Main",
      "https://placehold.co/600x400/1e40af/white?text=Headphones+Folded",
      "https://placehold.co/600x400/1e40af/white?text=Headphones+Case"
    ], stock: 65,
    specs: { "Driver Size": "40mm", "Noise Cancellation": "Active Hybrid", "Playtime": "30 hours" },
    reviews: [ { id: 3, author: "customer@example.com", rating: 5, comment: "Best headphones I've ever owned.", date: "2023-09-01" } ],
    addedBy: '1'
  },
  { 
    id: 11, name: "EchoBuds Wireless Earbuds", description: "Crisp, clear sound in a compact wireless design.", price: 129.99, category: "Audio", subCategory: "Earbuds", imageUrls: ["https://placehold.co/600x400/1d4ed8/white?text=Earbuds"], stock: 300,
    specs: { "Connectivity": "Bluetooth 5.2", "Playtime": "6 hours (24 with case)", "Water Resistance": "IPX4" },
    reviews: [], addedBy: '5'
  },
  { id: 119, name: "Studio Monitor Speakers", description: "Flat response for accurate audio mixing.", price: 299.00, category: "Audio", subCategory: "Headphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Studio+Speakers"], stock: 50, specs: {}, reviews: [], addedBy: '1' },
  { id: 120, name: "Hi-Fi Open-Back Headphones", description: "Wide soundstage for critical listening.", price: 499.00, category: "Audio", subCategory: "Headphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Open-Back"], stock: 40, specs: {}, reviews: [], addedBy: '5' },
  { id: 121, name: "Sport Earbuds", description: "Secure fit and sweat resistance.", price: 179.99, category: "Audio", subCategory: "Earbuds", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Sport+Earbuds"], stock: 150, specs: {}, reviews: [], addedBy: '1' },
  { id: 122, name: "Bluetooth Speaker", description: "Portable and powerful sound.", price: 99.00, category: "Audio", subCategory: "Headphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=BT+Speaker"], stock: 200, specs: {}, reviews: [], addedBy: '5' },
  { id: 123, name: "USB Condenser Microphone", description: "Perfect for podcasting and streaming.", price: 129.00, category: "Audio", subCategory: "Headphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Microphone"], stock: 90, specs: {}, reviews: [], addedBy: '1' },
  { id: 124, name: "Budget In-Ear Monitors", description: "Great sound quality for the price.", price: 49.99, category: "Audio", subCategory: "Earbuds", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=IEMs"], stock: 300, specs: {}, reviews: [], addedBy: '5' },
  { id: 125, name: "Gaming Headset", description: "7.1 surround sound and a clear mic.", price: 119.00, category: "Audio", subCategory: "Headphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Gaming+Headset"], stock: 120, specs: {}, reviews: [], addedBy: '1' },
  { id: 126, name: "Noise-Isolating Earbuds", description: "Block out the world and focus on your music.", price: 89.99, category: "Audio", subCategory: "Earbuds", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Isolation+Buds"], stock: 180, specs: {}, reviews: [], addedBy: '5' },

  // Laptops
  { 
    id: 9, name: "Nebula Gaming Laptop", description: "High-performance gaming laptop with RTX 4080.", price: 2499.00, category: "Laptops", 
    imageUrls: [
      "https://placehold.co/600x400/1d4ed8/white?text=Gaming+Laptop",
      "https://placehold.co/600x400/1d4ed8/white?text=Laptop+Keyboard",
      "https://placehold.co/600x400/1d4ed8/white?text=Laptop+Side"
    ], stock: 25,
    specs: { "CPU": "Intel Core i9", "GPU": "NVIDIA RTX 4080", "RAM": "32GB DDR5" },
    reviews: [], addedBy: '5'
  },
  { id: 127, name: "Ultrabook Pro", description: "Thin, light, and powerful for professionals.", price: 1399.00, category: "Laptops", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Ultrabook"], stock: 60, specs: {}, reviews: [], addedBy: '1' },
  { id: 128, name: "2-in-1 Convertible Laptop", description: "Laptop and tablet in one.", price: 999.00, category: "Laptops", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=2-in-1"], stock: 75, specs: {}, reviews: [], addedBy: '5' },
  { id: 129, name: "Creator Laptop", description: "4K OLED screen and powerful internals.", price: 2199.00, category: "Laptops", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Creator+Laptop"], stock: 35, specs: {}, reviews: [], addedBy: '1' },
  { id: 130, name: "Student Chromebook", description: "Affordable, simple, and secure.", price: 349.00, category: "Laptops", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Chromebook"], stock: 150, specs: {}, reviews: [], addedBy: '5' },
  { id: 131, name: "Rugged Laptop", description: "Built to withstand drops, spills, and extreme temperatures.", price: 1899.00, category: "Laptops", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Rugged+Laptop"], stock: 20, specs: {}, reviews: [], addedBy: '1' },
  { id: 132, name: "Workstation Laptop", description: "For demanding tasks like 3D rendering and data science.", price: 3499.00, category: "Laptops", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Workstation"], stock: 15, specs: {}, reviews: [], addedBy: '5' },
  { id: 133, name: "Fanless Ultrabook", description: "Completely silent operation.", price: 1199.00, category: "Laptops", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Fanless"], stock: 50, specs: {}, reviews: [], addedBy: '1' },
  { id: 134, name: "17-inch Desktop Replacement", description: "Large screen and powerful components.", price: 1799.00, category: "Laptops", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=17-inch"], stock: 40, specs: {}, reviews: [], addedBy: '5' },
  { id: 135, name: "Budget Gaming Laptop", description: "Great performance for 1080p gaming.", price: 899.00, category: "Laptops", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Budget+Gaming"], stock: 90, specs: {}, reviews: [], addedBy: '1' },

  // Smartphones
  { 
    id: 10, name: "Pixel Pro Smartphone", description: "The latest smartphone with an amazing camera system.", price: 999.00, originalPrice: 1099.00, category: "Smartphones", 
    imageUrls: [
      "https://placehold.co/600x400/1d4ed8/white?text=Smartphone+Front",
      "https://placehold.co/600x400/1d4ed8/white?text=Smartphone+Back"
    ], stock: 110,
    specs: { "Display": "6.7-inch OLED", "Camera": "50MP Main", "Storage": "256GB" },
    reviews: [], addedBy: '1'
  },
  {
      id: 13, name: "Galaxy Supernova 10", description: "Next-gen smartphone with a dynamic display and pro-grade camera.", price: 1199.00, category: "Smartphones", imageUrls: ["https://placehold.co/600x400/1e3a8a/white?text=Supernova+10"], stock: 80,
      specs: { "Display": "6.8-inch Dynamic AMOLED", "Camera": "108MP Main", "Storage": "512GB" },
      reviews: [], addedBy: '1'
  },
  {
      id: 14, name: "Photon X", description: "Blazing fast performance and a stunning edge-to-edge screen.", price: 899.00, category: "Smartphones", imageUrls: ["https://placehold.co/600x400/1e3a8a/white?text=Photon+X"], stock: 150,
      specs: { "Display": "6.5-inch OLED", "Camera": "64MP Main", "Storage": "128GB" },
      reviews: [], addedBy: '5'
  },
  { id: 136, name: "Compact Mini Phone", description: "A smaller phone that doesn't compromise on power.", price: 699.00, category: "Smartphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Mini+Phone"], stock: 120, specs: {}, reviews: [], addedBy: '1' },
  { id: 137, name: "Foldable Smartphone", description: "A large screen that fits in your pocket.", price: 1799.00, category: "Smartphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Foldable"], stock: 40, specs: {}, reviews: [], addedBy: '5' },
  { id: 138, name: "Gaming Phone", description: "High refresh rate screen and shoulder triggers.", price: 799.00, category: "Smartphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Gaming+Phone"], stock: 60, specs: {}, reviews: [], addedBy: '1' },
  { id: 139, name: "Budget Smartphone", description: "All the essentials at a great price.", price: 299.00, category: "Smartphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Budget+Phone"], stock: 300, specs: {}, reviews: [], addedBy: '5' },
  { id: 140, name: "Camera Centric Phone", description: "Professional-grade lenses and camera software.", price: 1099.00, category: "Smartphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Camera+Phone"], stock: 90, specs: {}, reviews: [], addedBy: '1' },
  { id: 141, name: "Rugged Smartphone", description: "Waterproof, dustproof, and shockproof.", price: 599.00, category: "Smartphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Rugged+Phone"], stock: 70, specs: {}, reviews: [], addedBy: '5' },
  { id: 142, name: "Long Battery Life Phone", description: "A battery that lasts for days.", price: 499.00, category: "Smartphones", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Battery+Phone"], stock: 180, specs: {}, reviews: [], addedBy: '1' },

  // Smart Watches
  {
      id: 15, name: "Chrono Watch Pro", description: "Elegant smartwatch with advanced health tracking features.", price: 299.99, originalPrice: 352.93, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/1d4ed8/white?text=Chrono+Watch"], stock: 95,
      specs: { "Display": "1.4-inch AMOLED", "Sensors": "Heart Rate, SpO2, GPS", "Battery": "14 days" },
      reviews: [], addedBy: '1'
  },
  {
      id: 16, name: "FitBand Active", description: "A lightweight and durable fitness tracker for your active lifestyle.", price: 99.50, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/1d4ed8/white?text=FitBand"], stock: 250,
      specs: { "Display": "1.1-inch Color", "Water Resistance": "5 ATM", "Features": "Sleep Tracking, Step Counter" },
      reviews: [], addedBy: '5'
  },
  { id: 143, name: "Classic Hybrid Watch", description: "Analog style with smart features.", price: 199.00, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Hybrid+Watch"], stock: 110, specs: {}, reviews: [], addedBy: '1' },
  { id: 144, name: "Adventure GPS Watch", description: "Rugged watch with advanced mapping and long battery life.", price: 499.00, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=GPS+Watch"], stock: 60, specs: {}, reviews: [], addedBy: '5' },
  { id: 145, name: "Minimalist Smartwatch", description: "Simple, elegant, and focused on the essentials.", price: 249.00, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Minimalist+Watch"], stock: 85, specs: {}, reviews: [], addedBy: '1' },
  { id: 146, name: "Kids Smartwatch", description: "GPS tracking and two-way calling for peace of mind.", price: 129.00, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Kids+Watch"], stock: 150, specs: {}, reviews: [], addedBy: '5' },
  { id: 147, name: "Dive Computer Watch", description: "For scuba diving and water sports.", price: 799.00, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Dive+Watch"], stock: 30, specs: {}, reviews: [], addedBy: '1' },
  { id: 148, name: "Smart Ring", description: "Track your health from your finger.", price: 299.00, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Smart+Ring"], stock: 90, specs: {}, reviews: [], addedBy: '5' },
  { id: 149, name: "ECG Smartwatch", description: "Monitor your heart health with an ECG app.", price: 399.00, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=ECG+Watch"], stock: 70, specs: {}, reviews: [], addedBy: '1' },
  { id: 150, name: "Solar Powered Watch", description: "A watch that never needs charging.", price: 549.00, category: "Smart Watches", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Solar+Watch"], stock: 50, specs: {}, reviews: [], addedBy: '5' },

  // Apparel
  {
      id: 17, name: "Zenith Logo Tee", description: "Comfortable and stylish 100% cotton t-shirt with the Zenith logo.", price: 24.99, category: "Apparel", subCategory: "T-Shirts", imageUrls: ["https://placehold.co/600x400/2563eb/white?text=Zenith+Tee"], stock: 400,
      specs: { "Material": "100% Cotton", "Fit": "Modern" },
      reviews: [], addedBy: '1'
  },
  {
      id: 18, name: "Tech Fleece Hoodie", description: "Warm and breathable hoodie, perfect for any weather.", price: 89.00, originalPrice: 99.00, category: "Apparel", subCategory: "Hoodies", imageUrls: ["https://placehold.co/600x400/2563eb/white?text=Tech+Hoodie"], stock: 180,
      specs: { "Material": "Polyester Blend", "Features": "Zippered Pockets, Water-resistant" },
      reviews: [], addedBy: '5'
  },
  { id: 151, name: "Performance Quarter-Zip", description: "Moisture-wicking and comfortable for workouts.", price: 65.00, category: "Apparel", subCategory: "Hoodies", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Quarter-Zip"], stock: 120, specs: {}, reviews: [], addedBy: '1' },
  { id: 152, name: "Classic Polo Shirt", description: "A timeless look for any occasion.", price: 45.00, category: "Apparel", subCategory: "T-Shirts", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Polo+Shirt"], stock: 200, specs: {}, reviews: [], addedBy: '5' },
  { id: 153, name: "Waterproof Shell Jacket", description: "Stay dry in any weather.", price: 149.00, category: "Apparel", subCategory: "Hoodies", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Jacket"], stock: 90, specs: {}, reviews: [], addedBy: '1' },
  { id: 154, name: "Graphic Tee", description: "Unique designs on a comfortable shirt.", price: 29.99, category: "Apparel", subCategory: "T-Shirts", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Graphic+Tee"], stock: 300, specs: {}, reviews: [], addedBy: '5' },
  { id: 155, name: "Insulated Puffer Vest", description: "A great layering piece for warmth.", price: 99.00, category: "Apparel", subCategory: "Hoodies", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Vest"], stock: 110, specs: {}, reviews: [], addedBy: '1' },
  { id: 156, name: "V-Neck T-Shirt", description: "A classic V-neck in soft cotton.", price: 22.00, category: "Apparel", subCategory: "T-Shirts", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=V-Neck"], stock: 400, specs: {}, reviews: [], addedBy: '5' },
  { id: 157, name: "Full-Zip Hoodie", description: "A comfortable and versatile hoodie.", price: 79.00, category: "Apparel", subCategory: "Hoodies", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Full-Zip"], stock: 150, specs: {}, reviews: [], addedBy: '1' },
  { id: 158, name: "Long Sleeve Henley", description: "A stylish and comfortable long sleeve shirt.", price: 39.00, category: "Apparel", subCategory: "T-Shirts", imageUrls: ["https://placehold.co/600x400/3b82f6/white?text=Henley"], stock: 180, specs: {}, reviews: [], addedBy: '5' },

  // Lifestyle
  { id: 4, name: "Nomad Leather Backpack", description: "Stylish and durable backpack for daily commute.", price: 129.50, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product4/600/400"], stock: 90, reviews: [], addedBy: '1' },
  { id: 159, name: "Smart Mug", description: "Keeps your drink at the perfect temperature.", price: 129.00, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product159/600/400"], stock: 70, reviews: [], addedBy: '5' },
  { id: 160, name: "Digital Photo Frame", description: "Share photos from your phone to the frame.", price: 179.00, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product160/600/400"], stock: 100, reviews: [], addedBy: '1' },
  { id: 161, name: "Sunrise Alarm Clock", description: "Wake up naturally with a simulated sunrise.", price: 89.00, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product161/600/400"], stock: 120, reviews: [], addedBy: '5' },
  { id: 162, name: "Portable Projector", description: "Movie nights anywhere.", price: 499.00, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product162/600/400"], stock: 50, reviews: [], addedBy: '1' },
  { id: 163, name: "Smart Garden", description: "Grow fresh herbs indoors.", price: 199.00, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product163/600/400"], stock: 80, reviews: [], addedBy: '5' },
  { id: 164, name: "E-Reader", description: "Carry thousands of books in one device.", price: 139.00, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product164/600/400"], stock: 200, reviews: [], addedBy: '1' },
  { id: 165, name: "Drone", description: "Capture stunning aerial photos and videos.", price: 799.00, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product165/600/400"], stock: 40, reviews: [], addedBy: '5' },
  { id: 166, name: "3D Printer", description: "Bring your ideas to life.", price: 349.00, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product166/600/400"], stock: 60, reviews: [], addedBy: '1' },
  { id: 167, name: "Meditation Headband", description: "Get real-time feedback on your meditation practice.", price: 249.00, category: "Lifestyle", imageUrls: ["https://picsum.photos/seed/product167/600/400"], stock: 50, reviews: [], addedBy: '5' },

  // Health
  { id: 5, name: "Echo Smart Water Bottle", description: "Tracks water intake and glows to remind you to drink.", price: 59.99, category: "Health", imageUrls: ["https://picsum.photos/seed/product5/600/400"], stock: 200, reviews: [], addedBy: '1' },
  { id: 168, name: "Smart Scale", description: "Track your weight, BMI, and body fat percentage.", price: 79.00, category: "Health", imageUrls: ["https://picsum.photos/seed/product168/600/400"], stock: 150, reviews: [], addedBy: '5' },
  { id: 169, name: "Massage Gun", description: "Relieve muscle soreness and stiffness.", price: 199.00, category: "Health", imageUrls: ["https://picsum.photos/seed/product169/600/400"], stock: 100, reviews: [], addedBy: '1' },
  { id: 170, name: "Air Purifier", description: "Remove allergens and pollutants from the air.", price: 249.00, category: "Health", imageUrls: ["https://picsum.photos/seed/product170/600/400"], stock: 80, reviews: [], addedBy: '5' },
  { id: 171, name: "UV Sanitizer Box", description: "Sanitize your phone, keys, and other small items.", price: 59.00, category: "Health", imageUrls: ["https://picsum.photos/seed/product171/600/400"], stock: 200, reviews: [], addedBy: '1' },
  { id: 172, name: "Blood Pressure Monitor", description: "Track your blood pressure at home.", price: 69.00, category: "Health", imageUrls: ["https://picsum.photos/seed/product172/600/400"], stock: 120, reviews: [], addedBy: '5' },
  { id: 173, name: "Sleep Tracker", description: "Analyze your sleep patterns and get insights.", price: 129.00, category: "Health", imageUrls: ["https://picsum.photos/seed/product173/600/400"], stock: 90, reviews: [], addedBy: '1' },
  { id: 174, name: "Foam Roller", description: "A simple tool for muscle recovery.", price: 29.00, category: "Health", imageUrls: ["https://picsum.photos/seed/product174/600/400"], stock: 300, reviews: [], addedBy: '5' },
  { id: 175, name: "Electric Toothbrush", description: "Get a deeper clean.", price: 89.00, category: "Health", imageUrls: ["https://picsum.photos/seed/product175/600/400"], stock: 180, reviews: [], addedBy: '1' },
  { id: 176, name: "Red Light Therapy Panel", description: "For skin health and muscle recovery.", price: 299.00, category: "Health", imageUrls: ["https://picsum.photos/seed/product176/600/400"], stock: 60, reviews: [], addedBy: '5' },

  // Furniture
  { id: 7, name: "Atlas Standing Desk", description: "Adjustable height electric standing desk.", price: 599.00, originalPrice: 649.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product7/600/400"], stock: 30, reviews: [], addedBy: '5' },
  { id: 177, name: "Ergonomic Office Chair", description: "All-day comfort and support.", price: 399.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product177/600/400"], stock: 50, reviews: [], addedBy: '1' },
  { id: 178, name: "Monitor Arm", description: "Free up desk space and get the perfect monitor position.", price: 99.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product178/600/400"], stock: 150, reviews: [], addedBy: '5' },
  { id: 179, name: "Cable Management Box", description: "Keep your cables tidy and out of sight.", price: 25.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product179/600/400"], stock: 300, reviews: [], addedBy: '1' },
  { id: 180, name: "Bookshelf", description: "A stylish way to display your books and collectibles.", price: 199.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product180/600/400"], stock: 80, reviews: [], addedBy: '5' },
  { id: 181, name: "Filing Cabinet", description: "Organize your documents.", price: 149.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product181/600/400"], stock: 100, reviews: [], addedBy: '1' },
  { id: 182, name: "Desk Lamp", description: "Adjustable and bright light for your workspace.", price: 59.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product182/600/400"], stock: 200, reviews: [], addedBy: '5' },
  { id: 183, name: "Anti-Fatigue Mat", description: "Stay comfortable while standing.", price: 49.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product183/600/400"], stock: 180, reviews: [], addedBy: '1' },
  { id: 184, name: "Floating Shelves", description: "A modern way to display your favorite items.", price: 79.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product184/600/400"], stock: 120, reviews: [], addedBy: '5' },
  { id: 185, name: "Gaming Chair", description: "Comfort and style for long gaming sessions.", price: 299.00, category: "Furniture", imageUrls: ["https://picsum.photos/seed/product185/600/400"], stock: 70, reviews: [], addedBy: '1' },

  // Appliances
  { id: 8, name: "Vortex Portable Blender", description: "Compact and powerful blender for smoothies on the go.", price: 49.95, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product8/600/400"], stock: 150, reviews: [], addedBy: '5' },
  { id: 186, name: "Robot Vacuum", description: "Keep your floors clean with minimal effort.", price: 499.00, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product186/600/400"], stock: 60, reviews: [], addedBy: '1' },
  { id: 187, name: "Air Fryer", description: "Enjoy crispy food with less oil.", price: 129.00, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product187/600/400"], stock: 200, reviews: [], addedBy: '5' },
  { id: 188, name: "Espresso Machine", description: "Be your own barista.", price: 599.00, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product188/600/400"], stock: 50, reviews: [], addedBy: '1' },
  { id: 189, name: "Sous Vide Cooker", description: "Perfectly cooked food every time.", price: 199.00, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product189/600/400"], stock: 80, reviews: [], addedBy: '5' },
  { id: 190, name: "Electric Kettle", description: "Boil water quickly and efficiently.", price: 69.00, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product190/600/400"], stock: 250, reviews: [], addedBy: '1' },
  { id: 191, name: "Toaster Oven", description: "A versatile addition to any kitchen.", price: 149.00, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product191/600/400"], stock: 120, reviews: [], addedBy: '5' },
  { id: 192, name: "Stand Mixer", description: "A must-have for any baker.", price: 349.00, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product192/600/400"], stock: 90, reviews: [], addedBy: '1' },
  { id: 193, name: "Food Processor", description: "Save time on food prep.", price: 179.00, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product193/600/400"], stock: 110, reviews: [], addedBy: '5' },
  { id: 194, name: "Wine Fridge", description: "Keep your wine at the perfect temperature.", price: 299.00, category: "Appliances", imageUrls: ["https://picsum.photos/seed/product194/600/400"], stock: 70, reviews: [], addedBy: '1' },
];

let mockOrders: Order[] = [
  { 
    id: "ORD-001", 
    customerEmail: "customer@example.com", 
    date: "2023-10-26", 
    total: 229.98, 
    status: OrderStatus.DELIVERED, 
    items: [{ productId: 1, productName: "Fusion Wireless Mouse", quantity: 1, price: 79.99 }, { productId: 2, productName: "Aura Mechanical Keyboard", quantity: 1, price: 149.99 }],
    shippingAddress: { fullName: "John Doe", addressLine1: "123 Tech Avenue", city: "Innovateville", state: "CA", postalCode: "90210", country: "USA" },
    trackingNumber: "1Z999AA10123456784"
  },
  { 
    id: "ORD-002", 
    customerEmail: "customer@example.com", 
    date: "2023-10-25", 
    total: 499.99, 
    status: OrderStatus.SHIPPED, 
    items: [{ productId: 3, productName: "Zenith 27\" 4K Monitor", quantity: 1, price: 499.99 }],
    shippingAddress: { fullName: "John Doe", addressLine1: "123 Tech Avenue", city: "Innovateville", state: "CA", postalCode: "90210", country: "USA" },
    trackingNumber: "1Z999AA10123456785"
  },
  { 
    id: "ORD-003", 
    customerEmail: "admin@example.com", 
    date: "2023-10-24", 
    total: 59.99, 
    status: OrderStatus.PROCESSING, 
    items: [{ productId: 5, productName: "Echo Smart Water Bottle", quantity: 1, price: 59.99 }],
    shippingAddress: { fullName: "Admin User", addressLine1: "456 Admin Plaza", city: "Control City", state: "NY", postalCode: "10001", country: "USA" },
    trackingNumber: "1Z999AA10123456786"
  },
];

let mockConversations: Conversation[] = [
    {
        id: 'CONV-001',
        customerEmail: 'customer@example.com',
        subject: 'Question about my recent order...',
        messages: [
            { author: 'customer', text: 'Hello! I have a question about my recent order (ORD-002). Can you please help me track it?', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
            { author: 'admin', text: 'Hello! Of course. It looks like your order has been shipped and is currently in transit. The tracking number is 1Z999AA10123456785. Let me know if you need anything else!', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() }
        ],
        status: 'open',
        lastUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
        id: 'CONV-002',
        customerEmail: 'jane.s@example.com',
        subject: 'Interested in the Nebula Gaming Laptop...',
        messages: [
            { author: 'customer', text: 'I am interested in the Nebula Gaming Laptop, but I would like to know if it supports international shipping. Thank you!', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() }
        ],
        status: 'open',
        lastUpdatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
];


let mockUsers: User[] = [
    { id: '1', email: 'admin@example.com', password_bcrypt: 'password123', role: 'admin', status: 'active', mobile: '555-0101'},
    { id: '2', email: 'customer@example.com', password_bcrypt: 'password123', role: 'customer', status: 'active', mobile: '555-0102'},
    { id: '3', email: 'blocked@example.com', password_bcrypt: 'password123', role: 'customer', status: 'blocked'},
    { id: '4', email: 'jane.s@example.com', password_bcrypt: 'password123', role: 'customer', status: 'active', mobile: '555-0103'},
    { id: '5', email: 'subadmin@example.com', password_bcrypt: 'password123', role: 'sub-admin', status: 'active', mobile: '555-0104'},
];

let mockAITopics: AITopic[] = [
    { id: '1', topic: 'Product Information', enabled: true },
    { id: '2', topic: 'Shipping & Delivery', enabled: true },
    { id: '3', topic: 'Return Policy', enabled: true },
    { id: '4', topic: 'Technical Support', enabled: false },
    { id: '5', topic: 'Account Issues', enabled: false },
];

let mockPages: Page[] = [
    {
        id: 'page-1',
        title: 'About Us',
        slug: 'about',
        content: [
            {
                id: 'el-1',
                type: 'heading',
                content: 'Our Story',
                styles: { 
                    paddingTop: '20px', 
                    paddingBottom: '10px',
                    fontSize: '48px', 
                    fontWeight: 'bold', 
                    color: '#1e3a8a',
                    textAlign: 'center'
                }
            },
            {
                id: 'el-2',
                type: 'text',
                content: 'Founded in 2024, Zenith was born from a passion for cutting-edge technology and minimalist design. We believe that the right tools can not only enhance productivity but also bring joy and inspiration to everyday life.',
                styles: { 
                    paddingTop: '10px',
                    paddingBottom: '20px',
                    fontSize: '18px', 
                    lineHeight: '1.6',
                    textAlign: 'center',
                    maxWidth: '800px',
                    margin: '0 auto'
                }
            },
            {
                id: 'el-3',
                type: 'image',
                content: 'https://picsum.photos/seed/about/800/400',
                styles: { 
                    width: '100%',
                    maxWidth: '800px',
                    height: 'auto',
                    margin: '0 auto',
                    borderRadius: '12px'
                }
            }
        ],
        status: 'published',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'page-2',
        title: 'Our Team',
        slug: 'team',
        content: [],
        status: 'published',
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
     {
        id: 'page-3',
        title: 'Contact Us',
        slug: 'contact',
        content: [],
        status: 'published',
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'page-4',
        title: 'Privacy Policy',
        slug: 'privacy-policy',
        content: [],
        status: 'published',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'page-5',
        title: 'Terms of Service',
        slug: 'terms-of-service',
        content: [],
        status: 'published',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 'page-6',
        title: 'Return Policy',
        slug: 'return-policy',
        content: [],
        status: 'published',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

let mockSavedThemes: SavedTheme[] = [
    {
        id: 'theme-default',
        name: 'Default',
        isActive: true,
        header: {
            background: { type: 'solid', color1: '#FFFFFF' },
            textColor: '#374151'
        },
        footer: {
            background: { type: 'solid', color1: '#FFFFFF' },
            textColor: '#6B7280'
        }
    },
    {
        id: 'theme-dark',
        name: 'Zenith Dark',
        isActive: false,
        header: {
            background: { type: 'solid', color1: '#1F2937' },
            textColor: '#F9FAFB'
        },
        footer: {
            background: { type: 'solid', color1: '#1F2937' },
            textColor: '#D1D5DB'
        }
    },
];

let mockJobOpenings: JobOpening[] = [
    {
        id: 'job-1',
        title: 'Senior Frontend Engineer',
        department: 'Engineering',
        location: 'Remote',
        description: 'Build and maintain our customer-facing e-commerce platform using modern technologies like React and Tailwind CSS.'
    },
    {
        id: 'job-2',
        title: 'Product Manager',
        department: 'Product',
        location: 'Remote',
        description: 'Define the product vision, strategy, and roadmap. Work closely with engineering, design, and marketing to launch new features.'
    },
    {
        id: 'job-3',
        title: 'Digital Marketing Specialist',
        department: 'Marketing',
        location: 'New York, NY',
        description: 'Develop and execute digital marketing campaigns across various channels to drive traffic, engagement, and conversions.'
    },
    {
        id: 'job-4',
        title: 'Customer Support Advocate',
        department: 'Support',
        location: 'Remote',
        description: 'Provide exceptional support to our customers, answering questions and resolving issues via email and chat.'
    }
];

let mockPressReleases: PressRelease[] = [
    {
        id: 'pr-1',
        title: 'Zenith Launches New "Fusion" Line of Ergonomic Peripherals',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'Zenith today announced its new Fusion line, featuring an advanced wireless mouse and mechanical keyboard designed for ultimate comfort and productivity.'
    },
    {
        id: 'pr-2',
        title: 'Zenith Partners with EcoTech to Achieve Carbon Neutral Shipping',
        date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'In a landmark move for sustainable e-commerce, Zenith has partnered with EcoTech to ensure all customer shipments are 100% carbon neutral.'
    },
    {
        id: 'pr-3',
        title: 'The Nebula Gaming Laptop Receives "Editor\'s Choice" Award',
        date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        excerpt: 'The highly anticipated Nebula Gaming Laptop has been awarded the prestigious "Editor\'s Choice" award from Tech Radar for its exceptional performance and design.'
    }
];

let mockSocialMediaLinks: SocialMediaLinks = {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: '',
    linkedin: 'https://linkedin.com',
};


const simulateDelay = <T,>(data: T): Promise<T> =>
  new Promise(resolve => setTimeout(() => resolve(data), 500));

export const api = {
  getProducts: (userId?: string) => {
    if (userId) {
        const userProducts = mockProducts.filter(p => p.addedBy === userId);
        return simulateDelay([...userProducts]);
    }
    return simulateDelay([...mockProducts]);
  },
  getProductById: (id: number) => simulateDelay(mockProducts.find(p => p.id === id)),
  addProduct: (productData: NewProduct) => {
    const newId = Math.max(...mockProducts.map(p => p.id)) + 1;
    const newProduct: Product = {
        id: newId,
        reviews: [],
        ...productData
    };
    mockProducts.unshift(newProduct);
    return simulateDelay(newProduct);
  },
  updateProduct: (productId: number, updatedData: Partial<Product>) => {
    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        mockProducts[productIndex] = { ...mockProducts[productIndex], ...updatedData };
        return simulateDelay(mockProducts[productIndex]);
    }
    return simulateDelay(null);
  },
  deleteProduct: (productId: number) => {
    const productIndex = mockProducts.findIndex(p => p.id === productId);
    if (productIndex > -1) {
        mockProducts.splice(productIndex, 1);
        return simulateDelay(true);
    }
    return simulateDelay(false);
  },
  addProductReview: (productId: number, reviewData: NewReview) => {
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
        return simulateDelay(null);
    }
    const newReview: Review = {
        id: Math.random(),
        date: new Date().toISOString(),
        ...reviewData
    };
    if (!product.reviews) {
        product.reviews = [];
    }
    product.reviews.push(newReview);
    return simulateDelay(newReview);
  },
  getOrders: (userId?: string) => {
    if (!userId) {
      return simulateDelay([...mockOrders]);
    }
    const userProductIds = new Set(mockProducts.filter(p => p.addedBy === userId).map(p => p.id));
    const userOrders = mockOrders.filter(order => 
      order.items.some(item => userProductIds.has(item.productId))
    );
    return simulateDelay([...userOrders]);
  },
  getOrdersByCustomerEmail: (email: string) => {
    const orders = mockOrders.filter(o => o.customerEmail === email);
    return simulateDelay([...orders]);
  },
  getOrderById: (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    return simulateDelay(order ? {...order} : undefined);
  },
  updateOrderStatus: (orderId: string, status: OrderStatus) => {
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
        mockOrders[orderIndex].status = status;
        return simulateDelay({ ...mockOrders[orderIndex] });
    }
    return simulateDelay(null);
  },
  deleteOrder: (orderId: string) => {
    const orderIndex = mockOrders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
        mockOrders.splice(orderIndex, 1);
        return simulateDelay(true);
    }
    return simulateDelay(false);
  },
  placeOrder: (
    { cartItems, shippingAddress, customerEmail }:
    { cartItems: CartItem[], shippingAddress: ShippingAddress, customerEmail: string }
  ) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customerEmail,
      date: new Date().toISOString().split('T')[0],
      total,
      status: OrderStatus.PENDING,
      items: cartItems.map(({ id, name, quantity, price }) => ({
        productId: id,
        productName: name,
        quantity,
        price,
      })),
      shippingAddress,
      trackingNumber: `1Z${Math.random().toString().slice(2, 18)}`,
    };
    mockOrders.unshift(newOrder);
    return simulateDelay(newOrder);
  },
  login: (email: string, password_bcrypt: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
        return simulateDelay(undefined);
    }
    if (user.status === 'blocked') {
      return simulateDelay('blocked' as const);
    }
    if (user.status === 'pending_verification') {
        return simulateDelay('pending_verification' as const);
    }
    if (user.password_bcrypt === password_bcrypt) {
        return simulateDelay(user);
    }
    return simulateDelay(undefined); // Incorrect password
  },
  register: (email: string, password_bcrypt: string) => {
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
        return simulateDelay(null);
    }
    const verificationToken = btoa(email + Date.now());
    const newUser: User = {
        id: String(mockUsers.length + 1),
        email,
        password_bcrypt,
        role: 'customer',
        status: 'pending_verification',
        verificationToken,
    };
    mockUsers.push(newUser);
    console.log(`Verification link for ${email}: /#/verify-email/${verificationToken}`);
    return simulateDelay(newUser);
  },
  verifyEmail: (token: string): Promise<{ success: boolean; message?: string }> => {
    const userIndex = mockUsers.findIndex(u => u.verificationToken === token);
    if (userIndex > -1) {
        if (mockUsers[userIndex].status === 'pending_verification') {
            mockUsers[userIndex].status = 'active';
            delete mockUsers[userIndex].verificationToken;
            return simulateDelay({ success: true });
        }
    }
    return simulateDelay({ success: false, message: 'Invalid or expired token.' });
  },
  forgotPassword: (email: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (user) {
        // In a real app, generate a secure token, save it with an expiry, and email it.
        // For this mock, we'll just log the "token" to the console.
        // The "token" will be the user's email encoded in base64 for simplicity.
        const token = btoa(email);
        console.log(`Password reset requested for ${email}.`);
        console.log(`Reset link: /#/reset-password/${token}`);
    }
    // Always resolve successfully to prevent email enumeration attacks.
    return simulateDelay({ success: true, message: 'If your email is in our system, you will receive a reset link.' });
  },
  resetPassword: (token: string, newPassword_bcrypt: string): Promise<{ success: boolean; message?: string }> => {
      try {
          const email = atob(token); // Decode the "token" to get the email
          const userIndex = mockUsers.findIndex(u => u.email === email);
          if (userIndex > -1) {
              mockUsers[userIndex].password_bcrypt = newPassword_bcrypt;
              return simulateDelay({ success: true });
          }
      } catch (e) {
          // Invalid base64 token
          return simulateDelay({ success: false, message: 'Invalid token.' });
      }
      return simulateDelay({ success: false, message: 'Invalid or expired token.' });
  },
  getCategories: () => simulateDelay([...new Set(mockProducts.map(p => p.category))]),
  getCategoryTree: () => {
    const categoryTree: { [key: string]: string[] } = {};
    mockProducts.forEach(product => {
        if (!categoryTree[product.category]) {
            categoryTree[product.category] = [];
        }
        if (product.subCategory && !categoryTree[product.category].includes(product.subCategory)) {
            categoryTree[product.category].push(product.subCategory);
        }
    });
    // sort subcategories
    for (const category in categoryTree) {
        categoryTree[category].sort();
    }
    return simulateDelay(categoryTree);
  },
  
  // Conversation API
  getConversations: (userId?: string) => {
    if (!userId) {
      return simulateDelay([...mockConversations]);
    }
    const userProductNames = new Set(mockProducts.filter(p => p.addedBy === userId).map(p => p.name.toLowerCase()));
    const userConversations = mockConversations.filter(convo => 
      userProductNames.has(convo.subject.replace('Interested in the ', '').replace('...', '').toLowerCase())
    );
    return simulateDelay([...userConversations]);
  },
  getConversationById: (id: string) => {
    const conversation = mockConversations.find(c => c.id === id);
    return simulateDelay(conversation ? {...conversation} : undefined);
  },
  getConversationsByCustomerEmail: (email: string) => {
    const conversations = mockConversations.filter(c => c.customerEmail === email);
    return simulateDelay([...conversations]);
  },
  addReplyToConversation: (conversationId: string, message: { author: 'customer' | 'admin', text: string }) => {
    const conversationIndex = mockConversations.findIndex(c => c.id === conversationId);
    if (conversationIndex > -1) {
      const timestamp = new Date().toISOString();
      const newMessage: Message = { ...message, timestamp };
      mockConversations[conversationIndex].messages.push(newMessage);
      mockConversations[conversationIndex].lastUpdatedAt = timestamp;
      mockConversations[conversationIndex].status = 'open'; // Re-open conversation on reply
      return simulateDelay({...mockConversations[conversationIndex]});
    }
    return simulateDelay(null);
  },
  startConversation: (formData: { name: string; email: string; message: string }) => {
     const timestamp = new Date().toISOString();
     const newConversation: Conversation = {
        id: `CONV-${Date.now()}`,
        customerEmail: formData.email,
        subject: formData.message.substring(0, 40) + '...',
        messages: [
            { author: 'customer', text: `From: ${formData.name}\n\n${formData.message}`, timestamp }
        ],
        status: 'open',
        lastUpdatedAt: timestamp
     };
     mockConversations.unshift(newConversation);
     return simulateDelay(newConversation);
  },

  getUsers: () => simulateDelay([...mockUsers]),
  addUser: (userData: Pick<User, 'email' | 'password_bcrypt' | 'role'>) => {
    const existingUser = mockUsers.find(u => u.email === userData.email);
    if (existingUser) {
        return simulateDelay(null);
    }
    const newUser: User = {
        id: String(Date.now()), // Use timestamp for more unique ID
        email: userData.email,
        password_bcrypt: userData.password_bcrypt,
        role: userData.role,
        status: 'active'
    };
    mockUsers.push(newUser);
    return simulateDelay(newUser);
  },
  updateUser: (userId: string, updatedData: Partial<User>) => {
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...updatedData };
        return simulateDelay(mockUsers[userIndex]);
    }
    return simulateDelay(null);
  },
  deleteUser: (userId: string) => {
    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex > -1) {
        mockUsers.splice(userIndex, 1);
        return simulateDelay(true);
    }
    return simulateDelay(false);
  },
  
  // AI Settings API
  getAITopics: () => simulateDelay([...mockAITopics]),
  addAITopic: (topic: string) => {
    const newTopic: AITopic = {
      id: `TOPIC-${Date.now()}`,
      topic,
      enabled: true,
    };
    mockAITopics.push(newTopic);
    return simulateDelay(newTopic);
  },
  updateAITopic: (topicId: string, updatedData: Partial<AITopic>) => {
    const topicIndex = mockAITopics.findIndex(t => t.id === topicId);
    if (topicIndex > -1) {
      mockAITopics[topicIndex] = { ...mockAITopics[topicIndex], ...updatedData };
      return simulateDelay(mockAITopics[topicIndex]);
    }
    return simulateDelay(null);
  },
  deleteAITopic: (topicId: string) => {
    const topicIndex = mockAITopics.findIndex(t => t.id === topicId);
    if (topicIndex > -1) {
      mockAITopics.splice(topicIndex, 1);
      return simulateDelay(true);
    }
    return simulateDelay(false);
  },
  
    // Page CMS API
  getPages: () => simulateDelay([...mockPages]),
  getPageById: (pageId: string) => {
      const page = mockPages.find(p => p.id === pageId);
      return simulateDelay(page ? { ...page } : undefined);
  },
  getPageBySlug: (slug: string) => {
      const page = mockPages.find(p => p.slug === slug && p.status === 'published');
      return simulateDelay(page ? { ...page } : undefined);
  },
  createPage: (pageData: NewPage) => {
      const now = new Date().toISOString();
      const newPage: Page = {
          id: `page-${Date.now()}`,
          ...pageData,
          createdAt: now,
          updatedAt: now,
      };
      mockPages.push(newPage);
      return simulateDelay(newPage);
  },
  updatePage: (pageId: string, updatedData: Partial<Page>) => {
      const pageIndex = mockPages.findIndex(p => p.id === pageId);
      if (pageIndex > -1) {
          mockPages[pageIndex] = { 
              ...mockPages[pageIndex], 
              ...updatedData,
              updatedAt: new Date().toISOString() 
          };
          return simulateDelay(mockPages[pageIndex]);
      }
      return simulateDelay(null);
  },
  deletePage: (pageId: string) => {
      const pageIndex = mockPages.findIndex(p => p.id === pageId);
      if (pageIndex > -1) {
          mockPages.splice(pageIndex, 1);
          return simulateDelay(true);
      }
      return simulateDelay(false);
  },

  // Theme Customization API
  getSavedThemes: () => simulateDelay([...mockSavedThemes]),
  getActiveThemeSettings: () => {
    const activeTheme = mockSavedThemes.find(t => t.isActive);
    return simulateDelay(activeTheme ? { header: activeTheme.header, footer: activeTheme.footer } : null);
  },
  saveTheme: (name: string, settings: ThemeSettings) => {
    const newTheme: SavedTheme = {
        id: `theme-${Date.now()}`,
        name,
        isActive: false,
        ...settings
    };
    mockSavedThemes.push(newTheme);
    return simulateDelay(newTheme);
  },
  deleteTheme: (themeId: string) => {
    const themeIndex = mockSavedThemes.findIndex(t => t.id === themeId);
    if (themeIndex > -1 && !mockSavedThemes[themeIndex].isActive) { // Don't delete active theme
        mockSavedThemes.splice(themeIndex, 1);
        return simulateDelay(true);
    }
    return simulateDelay(false);
  },
  setActiveTheme: (themeId: string) => {
    let activatedTheme: SavedTheme | null = null;
    mockSavedThemes.forEach(theme => {
        if (theme.id === themeId) {
            theme.isActive = true;
            activatedTheme = theme;
        } else {
            theme.isActive = false;
        }
    });
    return simulateDelay(activatedTheme);
  },

  // Social Media Links API
  getSocialMediaLinks: (): Promise<SocialMediaLinks> => {
    return simulateDelay({ ...mockSocialMediaLinks });
  },
  updateSocialMediaLinks: (newLinks: SocialMediaLinks): Promise<SocialMediaLinks> => {
    mockSocialMediaLinks = { ...newLinks };
    return simulateDelay({ ...mockSocialMediaLinks });
  },

  // Job Openings API
  getJobOpenings: () => simulateDelay([...mockJobOpenings]),
  
  // Press Releases API
  getPressReleases: () => simulateDelay([...mockPressReleases]),

  // Search API
  searchProducts: (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const results = mockProducts.filter(product => 
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery)
    );
    return simulateDelay([...results]);
  },
  
  // Admin Global Search
  adminSearch: (query: string, user: User | null): Promise<AdminSearchResults> => {
    const lowercasedQuery = query.toLowerCase();
    let searchedProducts: Product[] = [];
    let searchedOrders: Order[] = [];
    let searchedUsers: User[] = [];

    if (user?.role === 'admin') {
      // Admin searches everything
      searchedProducts = mockProducts.filter(p =>
        p.name.toLowerCase().includes(lowercasedQuery) ||
        p.description.toLowerCase().includes(lowercasedQuery)
      );
      searchedOrders = mockOrders.filter(o =>
        o.id.toLowerCase().includes(lowercasedQuery) ||
        o.customerEmail.toLowerCase().includes(lowercasedQuery)
      );
      searchedUsers = mockUsers.filter(u =>
        u.email.toLowerCase().includes(lowercasedQuery)
      );
    } else if (user?.role === 'sub-admin') {
      // Sub-admin searches their own products and related orders
      const userProductIds = new Set(mockProducts.filter(p => p.addedBy === user.id).map(p => p.id));
      
      searchedProducts = mockProducts.filter(p =>
        userProductIds.has(p.id) &&
        (p.name.toLowerCase().includes(lowercasedQuery) ||
         p.description.toLowerCase().includes(lowercasedQuery))
      );
      
      searchedOrders = mockOrders.filter(o =>
        (o.id.toLowerCase().includes(lowercasedQuery) || o.customerEmail.toLowerCase().includes(lowercasedQuery)) &&
        o.items.some(item => userProductIds.has(item.productId))
      );
      // Sub-admins cannot search users
      searchedUsers = [];
    }

    return simulateDelay({
      products: searchedProducts,
      orders: searchedOrders,
      users: searchedUsers,
    });
  },

  // Homepage Sections API
  getBestSellers: () => {
    const bestSellerIds = [1, 9, 15, 18, 186, 127, 6, 177];
    const results = mockProducts.filter(p => bestSellerIds.includes(p.id));
    return simulateDelay([...results]);
  },
  getSpecialOffers: () => {
    const results = mockProducts.filter(p => p.originalPrice && p.originalPrice > p.price);
    return simulateDelay([...results]);
  },
  getProductsUnderPrice: (price: number) => {
    const results = mockProducts.filter(p => p.price < price);
    return simulateDelay([...results]);
  },
  getInspiredByHistory: () => {
    const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
    return simulateDelay(shuffled.slice(0, 8));
  },
};