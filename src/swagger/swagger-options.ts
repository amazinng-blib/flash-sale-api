import { Options } from 'swagger-jsdoc';
export const swaggerOptions: Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Flash sale API',
      version: '1.0.0',
      description: 'Flash sales API Test',
    },
    servers: [
      {
        url: 'http://localhost:4000/api/v1',
        desciption: 'Local server',
      },
      {
        url: 'http://localhost:4000/',
        description: 'WebSocket Server',
      },
    ],
    paths: {
      '/auth/register': {
        post: {
          tags: ['Auth Routes'],
          summary: 'Register route',
          description: 'Register new user route',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RegisterSchema',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User Registered successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/RegisterSchema',
                  },
                },
              },
            },
          },
        },
      },
      '/auth/login': {
        post: {
          tags: ['Auth Routes'],
          summary: 'Login a user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: {
                      type: 'string',
                      example: 'johndoe@example.com',
                    },
                    password: {
                      type: 'string',
                      example: 'StrongPass@123',
                    },
                  },
                  required: ['email', 'password'],
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User Registered successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/RegisterSchema',
                  },
                },
              },
            },
          },
        },
      },
      '/product/create': {
        post: {
          tags: ['Product routes'],
          summary: 'Create a new product',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'stock', 'price'],
                  properties: {
                    name: {
                      type: 'string',
                      description: 'Name of the product',
                      example: 'Laptop',
                    },
                    stock: {
                      type: 'integer',
                      description: 'Number of items available in stock',
                      example: 20000,
                      default: 20000,
                    },
                    imageUrl: {
                      type: 'string',
                      format: 'uri',
                      description: 'URL of the product image',
                      example: 'https://example.com/image.jpg',
                      default:
                        'https://www.shutterstock.com/image-photo/fashionable-clothes-boutique-store-london-600nw-589577570.jpg',
                    },
                    rating: {
                      type: 'number',
                      format: 'float',
                      minimum: 0,
                      maximum: 5,
                      description: 'Rating of the product',
                      example: 4.5,
                      default: 0,
                    },
                    price: {
                      type: 'number',
                      format: 'float',
                      description: 'Price of the product',
                      example: 999.99,
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Product created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ProductSchema',
                  },
                },
              },
            },
          },
        },
      },

      '/product/{id}': {
        put: {
          tags: ['Product routes'],
          summary: 'Edit existing product',
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'Unique ID of the product',
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'stock', 'price'],
                  properties: {
                    name: {
                      type: 'string',
                      description: 'Name of the product',
                      example: 'Laptop',
                    },
                    stock: {
                      type: 'integer',
                      description: 'Number of items available in stock',
                      example: 20000,
                      default: 20000,
                    },
                    imageUrl: {
                      type: 'string',
                      format: 'uri',
                      description: 'URL of the product image',
                      example: 'https://example.com/image.jpg',
                      default:
                        'https://www.shutterstock.com/image-photo/fashionable-clothes-boutique-store-london-600nw-589577570.jpg',
                    },
                    rating: {
                      type: 'number',
                      format: 'float',
                      minimum: 0,
                      maximum: 5,
                      description: 'Rating of the product',
                      example: 4.5,
                      default: 0,
                    },
                    price: {
                      type: 'number',
                      format: 'float',
                      description: 'Price of the product',
                      example: 999.99,
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Product updated successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ProductSchema',
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ['Product routes'],
          summary: 'Delete a specific product',
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'Unique ID of the product',
            },
          ],
          responses: {
            '200': {
              description: 'Product deleted successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Product deleted successfully',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        get: {
          tags: ['Product routes'],
          summary: 'Get a specific product',

          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'Unique ID of the product',
            },
          ],
          responses: {
            '200': {
              description: 'Product fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Product fetched successfully',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/product': {
        post: {
          tags: ['Product routes'],
          summary: 'Get all products',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'Unique ID of the order',
            },
          ],

          responses: {
            '201': {
              description: 'Product fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ProductSchema',
                  },
                },
              },
            },
          },
        },
      },

      '/flash-sale/start': {
        post: {
          tags: ['Flash Sale trigger routes'],
          summary: 'Start or Trigger flash sale action',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['startTime', 'endTime'],
                  properties: {
                    startTime: {
                      type: 'string',
                      format: 'date-time',
                      example: '2025-3-17',
                    },
                    endTime: {
                      type: 'string',
                      format: 'date-time',
                      example: '2025-4-17',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Flash sale started successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/FlashSaleSchema',
                  },
                },
              },
            },
          },
        },
      },

      '/flash-sale/end': {
        post: {
          tags: ['Flash Sale trigger routes'],
          summary: 'Stop or End flash sale action',

          responses: {
            '201': {
              description: 'Flash sale ended successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      message: {
                        type: 'string',
                        example: 'Flash sale ended successfully',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },

      '/order': {
        post: {
          tags: ['Orders routes'],
          summary: 'Create a new order',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/OrderSchema',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Order created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/OrderSchema',
                  },
                },
              },
            },
          },
        },

        get: {
          tags: ['Orders routes'],
          summary: 'Get single order',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/OrderSchema',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Order fetched successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/OrderSchema',
                  },
                },
              },
            },
          },
        },
      },
      '/order/all-orders': {
        get: {
          tags: ['Orders routes'],
          summary: 'Get all orders',
          security: [{ bearerAuth: [] }],
        },
        responses: {
          '200': {
            description: 'Orders fetched successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/OrderSchema',
                },
              },
            },
          },
        },
      },

      '/order/cancel-order/{orderId}': {
        get: {
          tags: ['Orders routes'],
          summary: 'Cancel order',
          security: [{ bearerAuth: [] }],
        },
        responses: {
          '200': {
            description: 'Orders deleted successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Orders deleted successfully',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        RegisterSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'John Doe',
              description: 'The full name of the user',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'johndoe@example.com',
              description: 'User email, must be unique',
            },
            password: {
              type: 'string',
              format: 'password',
              example: 'StrongPass@123',
              description: 'User password (should be hashed in the backend)',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'USER', 'MARKETER'],
              example: 'USER',
              description: 'User role, defaults to USER',
            },
          },
          required: ['name', 'email', 'password'],
        },
        ProductSchema: {
          type: 'object',
          required: ['name', 'stock', 'price'],
          properties: {
            _id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the product',
            },
            name: {
              type: 'string',
              description: 'Name of the product',
              example: 'Laptop',
            },
            stock: {
              type: 'integer',
              description: 'Number of items available in stock',
              example: 20000,
              default: 20000,
            },
            imageUrl: {
              type: 'string',
              format: 'uri',
              description: 'URL of the product image',
              example: 'https://example.com/image.jpg',
              default:
                'https://www.shutterstock.com/image-photo/fashionable-clothes-boutique-store-london-600nw-589577570.jpg',
            },
            rating: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 5,
              description: 'Rating of the product',
              example: 4.5,
              default: 0,
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Price of the product',
              example: 999.99,
            },
          },
        },

        FlashSaleSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Unique identifier for the flash sale',
            },
            productId: {
              type: 'string',
              format: 'uuid',
              description:
                'Reference to the Product associated with the flash sale',
            },
            startTime: {
              type: 'string',
              format: 'date-time',
              description: 'Start time of the flash sale',
            },
            endTime: {
              type: 'string',
              format: 'date-time',
              description: 'End time of the flash sale',
            },
            discount: {
              type: 'number',
              description: 'Discount percentage applied to the product',
              example: 20,
            },
            actualPrice: {
              type: 'number',
              description: 'Original price of the product before discount',
              example: 100,
            },
            currentPrice: {
              type: 'number',
              description: 'Price of the product after applying the discount',
              example: 80,
            },
            availableStock: {
              type: 'number',
              description: 'Stock available during the flash sale',
              example: 200,
            },
            status: {
              type: 'string',
              enum: ['active', 'ended'],
              description: 'Current status of the flash sale',
              example: 'active',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the flash sale was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the flash sale was last updated',
            },
          },
          required: [
            'productId',
            'startTime',
            'endTime',
            'discount',
            'actualPrice',
            'currentPrice',
            'availableStock',
            'status',
          ],
        },

        OrderSchema: {
          type: 'object',
          properties: {
            user: {
              type: 'string',
              format: 'uuid',
              description: 'User ID who placed the order',
            },
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  productId: {
                    type: 'string',
                    format: 'uuid',
                    description: 'Product ID',
                  },
                  quantity: {
                    type: 'integer',
                    description: 'Quantity of the product',
                  },
                },
                required: ['productId', 'quantity'],
              },
            },
            totalPrice: {
              type: 'number',
              format: 'double',
              description: 'Total price of the order',
            },
            purchaseTime: {
              type: 'string',
              format: 'date-time',
              description: 'Time when the order was placed',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the order was created',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when the order was last updated',
            },
          },
          required: ['user', 'items', 'totalPrice'],
        },

        WebSocketEvents: {
          type: 'object',
          description: 'WebSocket events emitted by the server.',
          properties: {
            orderPlaced: {
              type: 'object',
              description: 'Emitted when a new order is placed.',
              properties: {
                order: {
                  $ref: '#/components/schemas/OrderSchema',
                },
                message: { type: 'string', example: 'New order placed!' },
              },
            },
            stockUpdated: {
              type: 'object',
              description: 'Emitted when stock levels are updated.',
              properties: {
                items: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      productId: {
                        type: 'string',
                        example: '64b2a67d8f4e7d00123efc12',
                      },
                      quantity: { type: 'integer', example: 5 },
                    },
                  },
                },
                message: { type: 'string', example: 'Stock updated!' },
              },
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};
