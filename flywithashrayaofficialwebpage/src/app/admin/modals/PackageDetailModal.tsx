'use client';

import { Package } from '@/app/types/admin.types';
import Image from 'next/image';

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

  const renderArray = (arr: string[] | undefined) => {
    if (!arr || arr.length === 0) return 'None';
    return arr.join(', ');
  };

  const renderDateArray = (dates: (Date | string)[] | undefined) => {
    if (!dates || dates.length === 0) return 'None';
    return dates.map(date => {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString();
    }).join(', ');
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
        {/* Modal header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Package Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Thumbnail Image */}
          {packageData.thumbnail && (
            <div className="w-full h-64 relative rounded-md overflow-hidden mb-4">
              <Image
                src={packageData.thumbnail}
                alt={`${packageData.name} thumbnail`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Package Name</h4>
              <p className="mt-1 text-gray-900">{packageData.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Price</h4>
              <p className="mt-1 text-gray-900">₹{packageData.price}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Duration</h4>
              <p className="mt-1 text-gray-900">{packageData.duration}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Package Type</h4>
              <p className="mt-1 text-gray-900">{packageData.packageType}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-gray-700">Description</h4>
            <p className="mt-1 text-gray-900">{packageData.description}</p>
          </div>

          {/* Destinations and Departures */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Destinations</h4>
              <p className="mt-1 text-gray-900">{renderArray(packageData.destinations)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Departure Cities</h4>
              <p className="mt-1 text-gray-900">{renderArray(packageData.departureCities)}</p>
            </div>
          </div>

          {/* Accommodation */}
          <div className="border-t pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Accommodation Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Type</h4>
                <p className="mt-1 text-gray-900">{packageData.accommodation?.type || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Name</h4>
                <p className="mt-1 text-gray-900">{packageData.accommodation?.name || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Rating</h4>
                <p className="mt-1 text-gray-900">{packageData.accommodation?.rating || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Room Type</h4>
                <p className="mt-1 text-gray-900">{packageData.accommodation?.roomType || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Occupancy</h4>
                <p className="mt-1 text-gray-900">{packageData.accommodation?.occupancy || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Inclusions</h4>
              <ul className="mt-1 text-gray-900 list-disc pl-5">
                {packageData.inclusions?.map((item, index) => (
                  <li key={index}>{item}</li>
                )) || <li>None</li>}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Exclusions</h4>
              <ul className="mt-1 text-gray-900 list-disc pl-5">
                {packageData.exclusions?.map((item, index) => (
                  <li key={index}>{item}</li>
                )) || <li>None</li>}
              </ul>
            </div>
          </div>

          {/* Itinerary */}
          {packageData.itinerary && packageData.itinerary.length > 0 && (
            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">Itinerary</h4>
              <div className="space-y-4">
                {packageData.itinerary.map((day, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h5 className="font-medium">Day {day.day}: {day.title}</h5>
                    <p className="text-sm text-gray-700 mt-1">{day.description}</p>
                    <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500">Attractions:</span>
                        <p className="text-sm">{renderArray(day.attractions)}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500">Activities:</span>
                        <p className="text-sm">{renderArray(day.activities)}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500">Meals:</span>
                        <p className="text-sm">{renderArray(day.meals)}</p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-gray-500">Overnight:</span>
                        <p className="text-sm">{day.overnight || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flight Details */}
          {(packageData.flights?.onward || packageData.flights?.return) && (
            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">Flight Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {packageData.flights?.onward && (
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium">Onward Flight</h5>
                    <div className="mt-2 space-y-1">
                      <p><span className="text-xs font-medium text-gray-500">Airline:</span> {packageData.flights.onward.airline}</p>
                      <p><span className="text-xs font-medium text-gray-500">Departure:</span> {packageData.flights.onward.departure}</p>
                      <p><span className="text-xs font-medium text-gray-500">From:</span> {packageData.flights.onward.departureAirport}</p>
                      <p><span className="text-xs font-medium text-gray-500">Arrival:</span> {packageData.flights.onward.arrival}</p>
                      <p><span className="text-xs font-medium text-gray-500">To:</span> {packageData.flights.onward.arrivalAirport}</p>
                      <p><span className="text-xs font-medium text-gray-500">Duration:</span> {packageData.flights.onward.duration}</p>
                      <p><span className="text-xs font-medium text-gray-500">Baggage:</span> {packageData.flights.onward.baggageAllowance}</p>
                    </div>
                  </div>
                )}
                {packageData.flights?.return && (
                  <div className="border rounded-lg p-4">
                    <h5 className="font-medium">Return Flight</h5>
                    <div className="mt-2 space-y-1">
                      <p><span className="text-xs font-medium text-gray-500">Airline:</span> {packageData.flights.return.airline}</p>
                      <p><span className="text-xs font-medium text-gray-500">Departure:</span> {packageData.flights.return.departure}</p>
                      <p><span className="text-xs font-medium text-gray-500">From:</span> {packageData.flights.return.departureAirport}</p>
                      <p><span className="text-xs font-medium text-gray-500">Arrival:</span> {packageData.flights.return.arrival}</p>
                      <p><span className="text-xs font-medium text-gray-500">To:</span> {packageData.flights.return.arrivalAirport}</p>
                      <p><span className="text-xs font-medium text-gray-500">Duration:</span> {packageData.flights.return.duration}</p>
                      <p><span className="text-xs font-medium text-gray-500">Baggage:</span> {packageData.flights.return.baggageAllowance}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Images Gallery */}
          {(packageData.images && packageData.images.length > 0) && (
            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">Package Images</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {packageData.images.map((image, index) => (
                  <div key={index} className="aspect-square relative rounded-md overflow-hidden border">
                    <Image
                      src={image}
                      alt={`${packageData.name} image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Gallery */}
          {(packageData.gallery && packageData.gallery.length > 0) && (
            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">Additional Photos</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {packageData.gallery.map((image, index) => (
                  <div key={index} className="aspect-square relative rounded-md overflow-hidden border">
                    <Image
                      src={image}
                      alt={`${packageData.name} gallery image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Market</h4>
              <p className="mt-1 text-gray-900">{packageData.market || 'N/A'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Tags</h4>
              <p className="mt-1 text-gray-900">{renderArray(packageData.tags)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Highlights</h4>
              <p className="mt-1 text-gray-900">{renderArray(packageData.highlights)}</p>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700">Minimum Persons</h4>
              <p className="mt-1 text-gray-900">{packageData.minPersons || 1}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Departure Dates</h4>
              <p className="mt-1 text-gray-900">{renderDateArray(packageData.departureDates)}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700">Status</h4>
              <p className="mt-1 text-gray-900">{packageData.isActive ? 'Active' : 'Inactive'}</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-4">
            <h4 className="text-md font-medium text-gray-900 mb-3">Contact Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Address</h4>
                <p className="mt-1 text-gray-900">{packageData.contact?.address || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Phone Numbers</h4>
                <p className="mt-1 text-gray-900">{renderArray(packageData.contact?.phoneNumbers)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Website</h4>
                <p className="mt-1 text-gray-900">{packageData.contact?.website || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Cancellation Policy */}
          {packageData.cancellationPolicy && (
            <div className="border-t pt-4">
              <h4 className="text-md font-medium text-gray-900 mb-3">Cancellation Policy</h4>
              <p className="text-gray-900">{packageData.cancellationPolicy}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
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