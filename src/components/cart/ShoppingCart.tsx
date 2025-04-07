import React from 'react';
import { ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { useMediaQuery } from '../../utils/hooks';

// Define the props for the Cart component
interface CartProps {
  isMobile: boolean;
}

const CartIconComponent: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <React.Fragment>
      {isMobile ? (
        <ShoppingCartIcon size={24} />
      ) : (
        <ShoppingCartIcon size={32} />
      )}
    </React.Fragment>
  );
};

export { CartIconComponent };

// Removed duplicate ShoppingCart function
export default function ShoppingCart() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  function handleCartClick() {
    // Handle cart click event here, e.g., open a modal or navigate to the cart page
  }

  return (
    <div
      className={`fixed z-[9999] ${
        isMobile === undefined
          ? 'top-4 right-4'
          : isMobile
          ? 'bottom-4 right-4'
          : 'top-4 right-4'
      } bg-white rounded-lg shadow-lg p-4 transition-all duration-300`}
    >
      <div className="relative">
        <ShoppingCartIcon className="h-6 w-6 text-gray-600" onClick={handleCartClick} />
        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          0
        </span>
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <p className="text-gray-600">Your cart is empty.</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={handleCartClick}
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}
