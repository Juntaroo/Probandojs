const $BASE_REST = 'http://localhost:3000/api/v1';

export const environment = {
  production: false,
  baseRest: $BASE_REST,

  api: {
    
    auth: {
      login: `${$BASE_REST}/auth/login`,
      register: `${$BASE_REST}/auth/register`,
      perfil: `${$BASE_REST}/auth/profile`,
      refresh: `${$BASE_REST}/auth/refresh`,
    },

   
    users: `${$BASE_REST}/usuarios`,

    
    products: {
      all: `${$BASE_REST}/productos`,
      byId: (id: string | number) => `${$BASE_REST}/productos/${id}`,
      create: `${$BASE_REST}/productos`,
      update: (id: string | number) => `${$BASE_REST}/productos/${id}`,
      delete: (id: string | number) => `${$BASE_REST}/productos/${id}`,
    },

    
    carts: {
        byUserToken: `${$BASE_REST}/usuarios/carrito`,   
      create: `${$BASE_REST}/usuarios/carrito/agregar`,
      checkout: `${$BASE_REST}/usuarios/carrito/checkout`,
    },

    
    invoices: {
      all: `${$BASE_REST}/invoices`,
      byId: (id: string | number) => `${$BASE_REST}/invoices/${id}`,
      create: `${$BASE_REST}/invoices`,
    },
  },
};
