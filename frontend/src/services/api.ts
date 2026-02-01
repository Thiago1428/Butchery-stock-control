import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3333'
});

// Tipos
export interface Customer {
    id: number;
    name: string;
    orders_count?: number;
    total_spent?: number;
}

export interface Steak {
    id: number;
    name: string;
    price: number;
}

export interface OrderItem {
    id?: number;
    steak_id?: number;
    steakId?: number;
    weight: number;
    unit_price?: number;
    subtotal: number;
    steak_name?: string;
}

export interface Order {
    id: number;
    customer_id: number;
    total_value: number;
    payment_method: string;
    payment_received: number;
    obs?: string;
    created_at?: string;
    items?: OrderItem[];
    customer_name?: string;
}

export interface CreateOrderPayload {
    customer_id: number;
    total_value: number;
    payment_method: string;
    payment_received?: number;
    obs?: string;
    created_at?: string;
    items: Array<{
        steakId: number;
        weight: number;
        subtotal: number;
    }>;
}




// --- CUSTOMERS (Clientes) ---
export const CustomersService = {
    getAll: async () => {
        const response = await api.get<Customer[]>('/customers/getAll');
        return response.data;
    },
    getById: async (id: number) => {
        const response = await api.get<Customer>(`/customers/get/${id}`);
        return response.data;
    },
    create: async (name: string) => {
        const response = await api.post('/customers/create', { name });
        return response.data;
    },
    update: async (id: number, name: string) => {
        const response = await api.post(`/customers/update/${id}`, { name });
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete(`/customers/delete/${id}`);
        return response.data;
    }
};

// --- STEAKS (Carnes) ---
export const SteaksService = {
    getAll: async () => {
        const response = await api.get<Steak[]>('/steaks/getAll');
        return response.data;
    },
    getById: async (id: number) => {
        const response = await api.get<Steak>(`/steaks/get/${id}`);
        return response.data;
    },
    create: async (name: string, price: number) => {
        const response = await api.post('/steaks/create', { name, price });
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete(`/steaks/delete/${id}`);
        return response.data;
    },
    update: async (id: number, name: string, price: number) => {
        const response = await api.post(`/steaks/update/${id}`, { name, price });
        return response.data;
    }
};


// --- ORDERS (Pedidos) ---
export const OrdersService = {
    getAll: async () => {
        const response = await api.get<Order[]>('/orders/getAll');
        return response.data;
    },
    getById: async (id: number) => {
        const response = await api.get<Order>(`/orders/get/${id}`);
        return response.data;
    },
    getByCustomer: async (customerId: number) => {
        const response = await api.get<Order[]>(`/orders/get/customer/${customerId}`);
        return response.data;
    },
    create: async (data: CreateOrderPayload) => {
        const response = await api.post('/orders/create', data);
        return response.data;
    },
    delete: async (id: number) => {
        const response = await api.delete(`/orders/delete/${id}`);
        return response.data;
    }
};
