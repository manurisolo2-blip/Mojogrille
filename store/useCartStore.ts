import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  imageUrl?: string;
  quantity: number;
  sides?: string[];
  notes?: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  itemName: string;
  visible: boolean;
}

export interface CartStoreState {
  items: CartItem[];
  isOpen: boolean;
  toast: ToastNotification | null;

  // Actions
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  clearCart: () => void;
  dismissToast: () => void;

  // Selectors
  getSubtotal: () => number;
  getItemCount: () => number;
}

let toastTimeout: NodeJS.Timeout | null = null;

export const useCartStore = create<CartStoreState>((set, get) => ({
  items: [],
  isOpen: false,
  toast: null,

  addItem: (itemInput) => {
    const qtyToAdd = itemInput.quantity ?? 1;
    const currentItems = get().items;
    const existingIndex = currentItems.findIndex((i) => i.id === itemInput.id);

    let updatedItems: CartItem[];
    if (existingIndex > -1) {
      updatedItems = currentItems.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + qtyToAdd }
          : item
      );
    } else {
      updatedItems = [
        ...currentItems,
        {
          ...itemInput,
          quantity: qtyToAdd,
          image: itemInput.image || itemInput.imageUrl || '',
        },
      ];
    }

    if (toastTimeout) clearTimeout(toastTimeout);

    const toastId = Date.now().toString();
    set({
      items: updatedItems,
      toast: {
        id: toastId,
        message: '¡Añadido al pedido criollo!',
        itemName: itemInput.name,
        visible: true,
      },
    });

    toastTimeout = setTimeout(() => {
      set((state) => (state.toast?.id === toastId ? { toast: null } : state));
    }, 3200);
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  increment: (id: string) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  },

  decrement: (id: string) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ items: [] }),

  dismissToast: () => {
    if (toastTimeout) clearTimeout(toastTimeout);
    set({ toast: null });
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));

export default useCartStore;
