'use client';

import { useState, useEffect } from 'react';
import { Package } from '@/app/types/admin.types';

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<Package>) => void;
  initialData?: Partial<Package>;
  isEditing: boolean;
  isLoading: boolean;
}

export default function PackageModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
  isLoading
}: PackageModalProps) {
  const [formData, setFormData] = useState<Partial<Package>>(initialData || {
    name: '',
    description: '',
    price: 0,
    duration: '5 Days / 4 Nights',
    destinations: [],
    departureCities: [],
    packageType: 'Standard',
    accommodation: {
      type: 'Hotel',
      name: 'Park Inn Baku',
      rating: 3,
      roomType: 'Standard Room',
      occupancy: 'Double'
    },
    inclusions: [],
    exclusions: [],
    itinerary: [],
    flights: {
      onward: {
        airline: '',
        departure: '',
        departureAirport: '',
        arrival: '',
        arrivalAirport: '',
        duration: '',
        baggageAllowance: ''
      },
      return: {
        airline: '',
        departure: '',
        departureAirport: '',
        arrival: '',
        arrivalAirport: '',
        duration: '',
        baggageAllowance: ''
      }
    },
    images: [],
    thumbnail: '',
    gallery: [],
    market: 'Indian Nationals Only',
    tags: [],
    highlights: [],
    minPersons: 1,
    departureDates: [],
    cancellationPolicy: '',
    contact: {
      address: 'Velikkakathu Building, Kalachanda Jn., NH 183, Pampady, Kottayam, Kerala, India - 686502',
      phoneNumbers: ['+91 9400416016', '+91 9496416016', '+965 69680820'],
      website: 'www.flywithashraya.com'
    },
    isActive: true,
    isFeatured: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: type === 'number' ? Number(value) : value
        }
      }));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setFormData((prev: any) => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value
      }));
    }
  };

  const handleArrayChange = (field: keyof Package, value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({
      ...prev,
      [field]: value.split(',').map(item => item.trim()).filter(item => item)
    }));
  };

  const handleArrayItemChange = (parent: string, index: number, field: string, value: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => {
      const parentArray = [...(prev[parent] || [])];
      if (!parentArray[index]) {
        parentArray[index] = {};
      }
      
      if (field === 'attractions' || field === 'activities' || field === 'meals') {
        parentArray[index][field] = value.split(',').map(item => item.trim()).filter(item => item);
      } else {
        parentArray[index][field] = value;
      }
      
      return {
        ...prev,
        [parent]: parentArray
      };
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addArrayItem = (parent: string, defaultItem: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({
      ...prev,
      [parent]: [...(prev[parent] || []), defaultItem]
    }));
  };

  const removeArrayItem = (parent: string, index: number) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormData((prev: any) => ({
      ...prev,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [parent]: prev[parent].filter((_: any, i: number) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">
            {isEditing ? 'Edit' : 'Add New'} Package
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="border-b pb-4">
            <h4 className="text-md font-semibold mb-3">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Package Name*</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Price*</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description*</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration*</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration || ''}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Package Type*</label>
                <select
                  name="packageType"
                  value={formData.packageType || 'Standard'}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Budget">Budget</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Min Persons*</label>
                <input
                  type="number"
                  name="minPersons"
                  value={formData.minPersons || 1}
                  onChange={handleChange}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Destinations (comma separated)*</label>
                <input
                  type="text"
                  value={Array.isArray(formData.destinations) ? formData.destinations.join(', ') : ''}
                  onChange={(e) => handleArrayChange('destinations', e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Departure Cities (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.departureCities) ? formData.departureCities.join(', ') : ''}
                  onChange={(e) => handleArrayChange('departureCities', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Market</label>
                <input
                  type="text"
                  name="market"
                  value={formData.market || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                  onChange={(e) => handleArrayChange('tags', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Accommodation Details */}
          <div className="border-b pb-4">
            <h4 className="text-md font-semibold mb-3">Accommodation Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Accommodation Type</label>
                <select
                  name="accommodation.type"
                  value={formData.accommodation?.type || 'Hotel'}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="Hotel">Hotel</option>
                  <option value="Resort">Resort</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Cruise">Cruise</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                <input
                  type="text"
                  name="accommodation.name"
                  value={formData.accommodation?.name || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <select
                  name="accommodation.rating"
                  value={formData.accommodation?.rating || 3}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>{rating} Star</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Room Type</label>
                <input
                  type="text"
                  name="accommodation.roomType"
                  value={formData.accommodation?.roomType || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Occupancy</label>
                <input
                  type="text"
                  name="accommodation.occupancy"
                  value={formData.accommodation?.occupancy || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="border-b pb-4">
            <h4 className="text-md font-semibold mb-3">Inclusions & Exclusions</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Inclusions (comma separated)</label>
                <textarea
                  value={Array.isArray(formData.inclusions) ? formData.inclusions.join(', ') : ''}
                  onChange={(e) => handleArrayChange('inclusions', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Exclusions (comma separated)</label>
                <textarea
                  value={Array.isArray(formData.exclusions) ? formData.exclusions.join(', ') : ''}
                  onChange={(e) => handleArrayChange('exclusions', e.target.value)}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="border-b pb-4">
            <h4 className="text-md font-semibold mb-3">Highlights</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700">Highlights (comma separated)</label>
              <input
                type="text"
                value={Array.isArray(formData.highlights) ? formData.highlights.join(', ') : ''}
                onChange={(e) => handleArrayChange('highlights', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Flight Details */}
          <div className="border-b pb-4">
            <h4 className="text-md font-semibold mb-3">Flight Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Onward Flight</h5>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="flights.onward.airline"
                    value={formData.flights?.onward?.airline || ''}
                    onChange={handleChange}
                    placeholder="Airline"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.onward.departure"
                    value={formData.flights?.onward?.departure || ''}
                    onChange={handleChange}
                    placeholder="Departure Time"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.onward.departureAirport"
                    value={formData.flights?.onward?.departureAirport || ''}
                    onChange={handleChange}
                    placeholder="Departure Airport"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.onward.arrival"
                    value={formData.flights?.onward?.arrival || ''}
                    onChange={handleChange}
                    placeholder="Arrival Time"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.onward.arrivalAirport"
                    value={formData.flights?.onward?.arrivalAirport || ''}
                    onChange={handleChange}
                    placeholder="Arrival Airport"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.onward.duration"
                    value={formData.flights?.onward?.duration || ''}
                    onChange={handleChange}
                    placeholder="Duration"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.onward.baggageAllowance"
                    value={formData.flights?.onward?.baggageAllowance || ''}
                    onChange={handleChange}
                    placeholder="Baggage Allowance"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Return Flight</h5>
                <div className="space-y-2">
                  <input
                    type="text"
                    name="flights.return.airline"
                    value={formData.flights?.return?.airline || ''}
                    onChange={handleChange}
                    placeholder="Airline"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.return.departure"
                    value={formData.flights?.return?.departure || ''}
                    onChange={handleChange}
                    placeholder="Departure Time"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.return.departureAirport"
                    value={formData.flights?.return?.departureAirport || ''}
                    onChange={handleChange}
                    placeholder="Departure Airport"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.return.arrival"
                    value={formData.flights?.return?.arrival || ''}
                    onChange={handleChange}
                    placeholder="Arrival Time"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.return.arrivalAirport"
                    value={formData.flights?.return?.arrivalAirport || ''}
                    onChange={handleChange}
                    placeholder="Arrival Airport"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.return.duration"
                    value={formData.flights?.return?.duration || ''}
                    onChange={handleChange}
                    placeholder="Duration"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="flights.return.baggageAllowance"
                    value={formData.flights?.return?.baggageAllowance || ''}
                    onChange={handleChange}
                    placeholder="Baggage Allowance"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary */}
          <div className="border-b pb-4">
            <h4 className="text-md font-semibold mb-3">Itinerary</h4>
            {Array.isArray(formData.itinerary) && formData.itinerary.map((item, index) => (
              <div key={index} className="border p-3 mb-2 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Day {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('itinerary', index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleArrayItemChange('itinerary', index, 'title', e.target.value)}
                    placeholder="Title"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={item.overnight || ''}
                    onChange={(e) => handleArrayItemChange('itinerary', index, 'overnight', e.target.value)}
                    placeholder="Overnight"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <textarea
                  value={item.description || ''}
                  onChange={(e) => handleArrayItemChange('itinerary', index, 'description', e.target.value)}
                  placeholder="Description"
                  rows={2}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={Array.isArray(item.attractions) ? item.attractions.join(', ') : ''}
                  onChange={(e) => handleArrayItemChange('itinerary', index, 'attractions', e.target.value)}
                  placeholder="Attractions (comma separated)"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={Array.isArray(item.activities) ? item.activities.join(', ') : ''}
                  onChange={(e) => handleArrayItemChange('itinerary', index, 'activities', e.target.value)}
                  placeholder="Activities (comma separated)"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={Array.isArray(item.meals) ? item.meals.join(', ') : ''}
                  onChange={(e) => handleArrayItemChange('itinerary', index, 'meals', e.target.value)}
                  placeholder="Meals (comma separated)"
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('itinerary', { day: 1, title: '', description: '', attractions: [], activities: [], meals: [], overnight: '' })}
              className="mt-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Day
            </button>
          </div>

          {/* Images & Media */}
          <div className="border-b pb-4">
            <h4 className="text-md font-semibold mb-3">Images & Media</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                <input
                  type="text"
                  name="thumbnail"
                  value={formData.thumbnail || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Images (comma separated URLs)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.images) ? formData.images.join(', ') : ''}
                  onChange={(e) => handleArrayChange('images', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Gallery (comma separated URLs)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.gallery) ? formData.gallery.join(', ') : ''}
                  onChange={(e) => handleArrayChange('gallery', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Policies & Contact */}
          <div className="border-b pb-4">
            <h4 className="text-md font-semibold mb-3">Policies & Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cancellation Policy</label>
                <textarea
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy || ''}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Address</label>
                <input
                  type="text"
                  name="contact.address"
                  value={formData.contact?.address || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Status & Settings */}
          <div className="border-b pb-4">
            <h4 className="text-md font-semibold mb-3">Status & Settings</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured</span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : isEditing ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
