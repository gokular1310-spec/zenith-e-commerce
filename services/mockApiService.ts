import { Product, User, Order, OrderStatus, NewProduct, CartItem, ShippingAddress, Conversation, Message, Review, NewReview, AITopic, Page, NewPage, SavedTheme, ThemeSettings } from '../types';

const mockProducts: Product[] = [
  // Electronics
  { 
    id: 1, name: "Fusion Wireless Mouse", description: "Ergonomic mouse with 8-week battery life.", price: 79.99, category: "Accessories", imageUrl: "https://placehold.co/600x400/1e40af/white?text=Wireless+Mouse", stock: 120,
    specs: { "Connectivity": "Bluetooth 5.1, 2.4GHz Wireless", "DPI": "16,000", "Battery": "8 weeks" },
    reviews: [
      { id: 1, author: "customer@example.com", rating: 5, comment: "Absolutely love this mouse! So comfortable.", date: "2023-10-15" }
    ],
    addedBy: '1' // admin
  },
  { 
    id: 2, name: "Aura Mechanical Keyboard", description: "RGB backlit mechanical keyboard with custom switches.", price: 149.99, category: "Accessories", imageUrl: "https://placehold.co/600x400/1e40af/white?text=Keyboard", stock: 75,
    offer: "Save 10%",
    specs: { "Switch Type": "Custom Tactile", "Backlight": "Full RGB", "Layout": "104-Key" },
    reviews: [
       { id: 2, author: "jane.s@example.com", rating: 4, comment: "Great keyboard, very clicky.", date: "2023-10-20" }
    ],
    addedBy: '5' // sub-admin
  },
  { 
    id: 3, name: "Zenith 27\" 4K Monitor", description: "Ultra-sharp 4K UHD display with HDR support.", price: 499.99, category: "Monitors", imageUrl: "https://placehold.co/600x400/1e40af/white?text=4K+Monitor", stock: 50,
    specs: { "Resolution": "3840 x 2160", "Refresh Rate": "144Hz", "Panel": "IPS" },
    reviews: [],
    addedBy: '1' // admin
  },
  { 
    id: 6, name: "Solaris Noise-Cancelling Headphones", description: "Immersive sound with industry-leading noise cancellation.", price: 349.00, category: "Audio", imageUrl: "https://placehold.co/600x400/1e40af/white?text=Headphones", stock: 65,
    specs: { "Driver Size": "40mm", "Noise Cancellation": "Active Hybrid", "Playtime": "30 hours" },
    reviews: [
      { id: 3, author: "customer@example.com", rating: 5, comment: "Best headphones I've ever owned.", date: "2023-09-01" }
    ],
    addedBy: '1' // admin
  },
  { 
    id: 9, name: "Nebula Gaming Laptop", description: "High-performance gaming laptop with RTX 4080.", price: 2499.00, category: "Laptops", imageUrl: "https://placehold.co/600x400/1d4ed8/white?text=Gaming+Laptop", stock: 25,
    specs: { "CPU": "Intel Core i9", "GPU": "NVIDIA RTX 4080", "RAM": "32GB DDR5" },
    reviews: [],
    addedBy: '5' // sub-admin
  },
  { 
    id: 10, name: "Pixel Pro Smartphone", description: "The latest smartphone with an amazing camera system.", price: 999.00, category: "Smartphones", imageUrl: "https://placehold.co/600x400/1d4ed8/white?text=Smartphone", stock: 110,
    offer: "Free Earbuds Included",
    specs: { "Display": "6.7-inch OLED", "Camera": "50MP Main", "Storage": "256GB" },
    reviews: [],
    addedBy: '1' // admin
  },
  { 
    id: 11, name: "EchoBuds Wireless Earbuds", description: "Crisp, clear sound in a compact wireless design.", price: 129.99, category: "Audio", imageUrl: "https://placehold.co/600x400/1d4ed8/white?text=Earbuds", stock: 300,
    specs: { "Connectivity": "Bluetooth 5.2", "Playtime": "6 hours (24 with case)", "Water Resistance": "IPX4" },
    reviews: [],
    addedBy: '5' // sub-admin
  },
  { 
    id: 12, name: "Terra Ultra-Wide Monitor", description: "34-inch curved monitor for immersive productivity.", price: 799.50, category: "Monitors", imageUrl: "https://placehold.co/600x400/1d4ed8/white?text=Ultra-Wide", stock: 40,
    specs: { "Resolution": "3440 x 1440", "Aspect Ratio": "21:9", "Curvature": "1800R" },
    reviews: [],
    addedBy: '5' // sub-admin
  },

  // Other Categories
  { id: 4, name: "Nomad Leather Backpack", description: "Stylish and durable backpack for daily commute.", price: 129.50, category: "Lifestyle", imageUrl: "https://picsum.photos/seed/product4/600/400", stock: 90, reviews: [], addedBy: '1' },
  { id: 5, name: "Echo Smart Water Bottle", description: "Tracks water intake and glows to remind you to drink.", price: 59.99, category: "Health", imageUrl: "https://picsum.photos/seed/product5/600/400", stock: 200, reviews: [], addedBy: '1' },
  { id: 7, name: "Atlas Standing Desk", description: "Adjustable height electric standing desk.", price: 599.00, category: "Furniture", imageUrl: "https://picsum.photos/seed/product7/600/400", stock: 30, reviews: [], addedBy: '5' },
  { id: 8, name: "Vortex Portable Blender", description: "Compact and powerful blender for smoothies on the go.", price: 49.95, category: "Appliances", imageUrl: "https://picsum.photos/seed/product8/600/400", stock: 150, reviews: [], addedBy: '5' },
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
    const user = mockUsers.find(u => u.email === email && u.password_bcrypt === password_bcrypt);
    if (user && user.status === 'blocked') {
      return simulateDelay('blocked' as const);
    }
    return simulateDelay(user);
  },
  register: (email: string, password_bcrypt: string) => {
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
        return simulateDelay(null);
    }
    const newUser: User = {
        id: String(mockUsers.length + 1),
        email,
        password_bcrypt,
        role: 'customer',
        status: 'active'
    };
    mockUsers.push(newUser);
    return simulateDelay(newUser);
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
};