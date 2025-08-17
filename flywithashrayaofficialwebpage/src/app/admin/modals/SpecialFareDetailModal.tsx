'use client';

import { SpecialFare } from '@/app/types/admin.types';

interface SpecialFareDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  specialFareData: SpecialFare;
  isLoading: boolean;
}

export default function SpecialFareDetailModal({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  specialFareData,
  isLoading
}: SpecialFareDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Special Fare Details</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Title</h4>
              <p className="mt-1 text-gray-900">{specialFareData.title}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Price</h4>
              <p className="mt-1 text-gray-900">₹{specialFareData.price}</p>
              <p className="text-sm text-gray-500 line-through">₹{specialFareData.originalPrice}</p>
              {specialFareData.discountPercentage && (
                <p className="text-sm text-green-600">
                  Save {specialFareData.discountPercentage}% (₹{specialFareData.discountAmount})
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700">Description</h4>
            <p className="mt-1 text-gray-900">{specialFareData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Valid From</h4>
              <p className="mt-1 text-gray-900">
                {new Date(specialFareData.validFrom).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Valid To</h4>
              <p className="mt-1 text-gray-900">
                {new Date(specialFareData.validTo).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              specialFareData.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {specialFareData.isActive ? 'Active' : 'Inactive'}
            </span>
            {specialFareData.isFeatured && (
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                Featured
              </span>
            )}
            {specialFareData.isLimitedTime && (
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                Limited Time
              </span>
            )}
            {specialFareData.isBestSeller && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                Best Seller
              </span>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onDelete}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}