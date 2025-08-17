'use client';

import { Package } from '@/app/types/admin.types';

interface PackageDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  packageData: Package;
  isLoading: boolean;
}

export default function PackageDetailModal({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  packageData,
  isLoading
}: PackageDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Package Details</h3>
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
              <h4 className="text-sm font-medium text-gray-700">Package Name</h4>
              <p className="mt-1 text-gray-900">{packageData.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Price</h4>
              <p className="mt-1 text-gray-900">₹{packageData.price}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700">Description</h4>
            <p className="mt-1 text-gray-900">{packageData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Duration</h4>
              <p className="mt-1 text-gray-900">{packageData.duration}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Package Type</h4>
              <p className="mt-1 text-gray-900">{packageData.packageType}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700">Destinations</h4>
            <p className="mt-1 text-gray-900">{packageData.destinations.join(', ')}</p>
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