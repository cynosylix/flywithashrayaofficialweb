'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  destinations: string[];
  inclusions: string[];
  exclusions: string[];
  images: string[];
  isActive: boolean;
  isFeatured: boolean;
  departureCities?: string[];
  packageType?: string;
  accommodation?: {
    type: string;
    name: string;
    rating: number;
    roomType: string;
    occupancy: string;
  };
  itinerary?: Array<{
    title: string;
    description: string;
    overnight: string;
    attractions: string[];
  }>;
  flights?: {
    onward: {
      airline: string;
      departure: string;
      departureAirport: string;
    };
    return: {
      airline: string;
      departure: string;
      departureAirport: string;
    };
  };
  thumbnail?: string;
  market?: string;
  tags?: string[];
  highlights?: string[];
}

interface SpecialFare {
  _id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  validFrom: string;
  validTo: string;
  destinations: string[];
  isActive: boolean;
}

export default function AdminDashboard() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [specialFares, setSpecialFares] = useState<SpecialFare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'packages' | 'specialFares'>('packages');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Package | SpecialFare | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({
    name: '',
    description: '',
    price: 0,
    duration: '5 Days / 4 Nights',
    destinations: 'Baku',
    departureCities: 'Ernakulam, Kottayam, Cochin',
    packageType: 'Standard',
    accommodation: {
      type: 'Hotel',
      name: 'Park Inn Baku',
      rating: 3,
      roomType: 'Standard Room',
      occupancy: 'Double'
    },
    inclusions: [
      "Airport transfers",
      "Hotel accommodation",
      "Daily breakfast",
      "Sightseeing tours",
      "Entrance fees",
      "English speaking guide"
    ].join(', '),
    exclusions: [
      "Flight tickets",
      "Visa fees",
      "Personal expenses",
      "Travel insurance",
      "Meals not mentioned"
    ].join(', '),
    itinerary: Array(5).fill({}),
    flights: {
      onward: {},
      return: {}
    },
    images: [],
    thumbnail: '',
    market: 'Indian Nationals Only',
    tags: ['Azerbaijan', 'Baku', 'Shahdag', 'Gabala', 'Cultural Tour'],
    highlights: [
      "Baku Old City (UNESCO Site)",
      "Shahdag Mountain Resort",
      "Gobustan National Park",
      "Mud Volcanoes",
      "Gabala Waterfalls"
    ].join(', '),
    isActive: true
  });
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([
        fetchPackages(),
        fetchSpecialFares()
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/admin/packages');
      if (response.ok) {
        const data = await response.json();
        setPackages(data.packages || []);
      } else {
        throw new Error('Failed to fetch packages');
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  };

  const fetchSpecialFares = async () => {
    try {
      const response = await fetch('/api/admin/special-fares');
      if (response.ok) {
        const data = await response.json();
        setSpecialFares(data.specialFares || []);
      } else {
        throw new Error('Failed to fetch special fares');
      }
    } catch (error) {
      console.error('Error fetching special fares:', error);
      throw error;
    }
  };

  const handleViewDetails = (item: Package | SpecialFare) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const handleEdit = (item: Package | SpecialFare) => {
    const formattedData = {
      ...item,
      destinations: (item as Package).destinations?.join(', ') || '',
      inclusions: (item as Package).inclusions?.join(', ') || '',
      exclusions: (item as Package).exclusions?.join(', ') || '',
      tags: (item as Package).tags?.join(', ') || '',
      highlights: (item as Package).highlights?.join(', ') || '',
      departureCities: (item as Package).departureCities?.join(', ') || '',
    };
    setFormData(formattedData);
    setIsEditing(true);
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const endpoint = activeTab === 'packages' 
        ? `/api/admin/packages?id=${id}`
        : `/api/admin/special-fares?id=${id}`;
      
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete item');
      }

      fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete item');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = activeTab === 'packages' 
        ? isEditing 
          ? `/api/admin/packages?id=${formData._id}`
          : '/api/admin/packages'
        : isEditing
          ? `/api/admin/special-fares?id=${formData._id}`
          : '/api/admin/special-fares';
      
      const method = isEditing ? 'PUT' : 'POST';

      const dataToSend = {
        ...formData,
        price: parseInt(formData.price),
        destinations: typeof formData.destinations === 'string' ? 
          formData.destinations.split(',').map((d: string) => d.trim()) : 
          formData.destinations || [],
        departureCities: typeof formData.departureCities === 'string' ? 
          formData.departureCities.split(',').map((d: string) => d.trim()) : 
          formData.departureCities || [],
        inclusions: typeof formData.inclusions === 'string' ? 
          formData.inclusions.split(',').map((i: string) => i.trim()) : 
          formData.inclusions || [],
        exclusions: typeof formData.exclusions === 'string' ? 
          formData.exclusions.split(',').map((i: string) => i.trim()) : 
          formData.exclusions || [],
        tags: Array.isArray(formData.tags) ? 
          formData.tags : 
          (typeof formData.tags === 'string' ? 
            formData.tags.split(',').map(t => t.trim()).filter(t => t) : 
            []),
        highlights: typeof formData.highlights === 'string' ? 
          formData.highlights.split(',').map((h: string) => h.trim()) : 
          formData.highlights || [],
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save data');
      }

      setShowAddModal(false);
      setIsEditing(false);
      setFormData({
        name: '',
        description: '',
        price: 0,
        duration: '5 Days / 4 Nights',
        destinations: 'Baku',
        departureCities: 'Ernakulam, Kottayam, Cochin',
        packageType: 'Standard',
        accommodation: {
          type: 'Hotel',
          name: 'Park Inn Baku',
          rating: 3,
          roomType: 'Standard Room',
          occupancy: 'Double'
        },
        inclusions: [
          "Airport transfers",
          "Hotel accommodation",
          "Daily breakfast",
          "Sightseeing tours",
          "Entrance fees",
          "English speaking guide"
        ].join(', '),
        exclusions: [
          "Flight tickets",
          "Visa fees",
          "Personal expenses",
          "Travel insurance",
          "Meals not mentioned"
        ].join(', '),
        itinerary: Array(5).fill({}),
        flights: {
          onward: {},
          return: {}
        },
        images: [],
        thumbnail: '',
        market: 'Indian Nationals Only',
        tags: ['Azerbaijan', 'Baku', 'Shahdag', 'Gabala', 'Cultural Tour'],
        highlights: [
          "Baku Old City (UNESCO Site)",
          "Shahdag Mountain Resort",
          "Gobustan National Park",
          "Mud Volcanoes",
          "Gabala Waterfalls"
        ].join(', '),
        isActive: true
      });
      fetchData();
    } catch (error) {
      console.error('Error saving item:', error);
      setError(error instanceof Error ? error.message : 'Failed to save item');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
        <button 
          onClick={() => setError(null)}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  const DetailModal = () => {
    if (!selectedItem) return null;

    return (
      <div 
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowDetailModal(false);
          }
        }}
      >
        <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {activeTab === 'packages' ? 'Package Details' : 'Special Fare Details'}
            </h3>
            <button
              onClick={() => setShowDetailModal(false)}
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
                <h4 className="text-sm font-medium text-gray-700">Name</h4>
                <p className="mt-1 text-gray-900">{selectedItem.name || (selectedItem as SpecialFare).title}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">Price</h4>
                <p className="mt-1 text-gray-900">₹{selectedItem.price}</p>
                {activeTab === 'specialFares' && (
                  <p className="text-sm text-gray-500 line-through">₹{(selectedItem as SpecialFare).originalPrice}</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700">Description</h4>
              <p className="mt-1 text-gray-900">{selectedItem.description}</p>
            </div>

            {activeTab === 'packages' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Duration</h4>
                    <p className="mt-1 text-gray-900">{(selectedItem as Package).duration}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Package Type</h4>
                    <p className="mt-1 text-gray-900">{(selectedItem as Package).packageType}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">Destinations</h4>
                  <p className="mt-1 text-gray-900">{(selectedItem as Package).destinations?.join(', ')}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">Departure Cities</h4>
                  <p className="mt-1 text-gray-900">{(selectedItem as Package).departureCities?.join(', ')}</p>
                </div>

                <div className="border p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Accommodation Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-medium text-gray-500">Type</h5>
                      <p className="text-sm">{(selectedItem as Package).accommodation?.type}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-gray-500">Name</h5>
                      <p className="text-sm">{(selectedItem as Package).accommodation?.name}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-gray-500">Rating</h5>
                      <p className="text-sm">{(selectedItem as Package).accommodation?.rating}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-gray-500">Room Type</h5>
                      <p className="text-sm">{(selectedItem as Package).accommodation?.roomType}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-gray-500">Occupancy</h5>
                      <p className="text-sm">{(selectedItem as Package).accommodation?.occupancy}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Inclusions</h4>
                    <ul className="mt-1 list-disc list-inside">
                      {(selectedItem as Package).inclusions?.map((inc, i) => (
                        <li key={i} className="text-gray-900">{inc}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Exclusions</h4>
                    <ul className="mt-1 list-disc list-inside">
                      {(selectedItem as Package).exclusions?.map((exc, i) => (
                        <li key={i} className="text-gray-900">{exc}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border p-3 rounded-md">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Itinerary</h4>
                  {(selectedItem as Package).itinerary?.map((day, index) => (
                    day && (
                      <div key={index} className="mb-4 border-b pb-4 last:border-b-0">
                        <h5 className="font-medium text-gray-800">Day {index + 1}: {day.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{day.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Overnight: {day.overnight}</p>
                        {day.attractions && day.attractions.length > 0 && (
                          <div className="mt-2">
                            <h6 className="text-xs font-medium text-gray-500">Attractions:</h6>
                            <ul className="list-disc list-inside text-xs">
                              {day.attractions.map((att, i) => (
                                <li key={i}>{att}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </div>
              </>
            )}

            {activeTab === 'specialFares' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Valid From</h4>
                    <p className="mt-1 text-gray-900">
                      {new Date((selectedItem as SpecialFare).validFrom).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Valid To</h4>
                    <p className="mt-1 text-gray-900">
                      {new Date((selectedItem as SpecialFare).validTo).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Are you sure you want to delete this item?')) {
                    handleDelete(selectedItem._id);
                    setShowDetailModal(false);
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDetailModal(false);
                  handleEdit(selectedItem);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('packages')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'packages'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Packages ({packages.length})
                </button>
                <button
                  onClick={() => setActiveTab('specialFares')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'specialFares'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Special Fares ({specialFares.length})
                </button>
              </nav>
            </div>
          </div>

          <div className="mb-4 flex justify-end">
            <button
              onClick={() => {
                setIsEditing(false);
                setShowAddModal(true);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New {activeTab === 'packages' ? 'Package' : 'Special Fare'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
              <button 
                onClick={() => setError(null)}
                className="ml-4 text-red-700 hover:text-red-900"
              >
                ×
              </button>
            </div>
          )}

          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            {activeTab === 'packages' ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Manage Packages</h2>
                {packages.length === 0 ? (
                  <p className="text-gray-500">No packages found. Click 'Add New Package' to create one.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                      <div 
                        key={pkg._id} 
                        className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleViewDetails(pkg)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{pkg.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">{pkg.description}</p>
                            <p className="text-lg font-bold text-green-600 mt-2">₹{pkg.price}</p>
                            <p className="text-sm text-gray-500">{pkg.duration}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(pkg);
                              }}
                              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('Are you sure you want to delete this package?')) {
                                  handleDelete(pkg._id);
                                }
                              }}
                              className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {pkg.isActive ? 'Active' : 'Inactive'}
                          </span>
                          {pkg.isFeatured && (
                            <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Manage Special Fares</h2>
                {specialFares.length === 0 ? (
                  <p className="text-gray-500">No special fares found. Click 'Add New Special Fare' to create one.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {specialFares.map((fare) => (
                      <div 
                        key={fare._id} 
                        className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleViewDetails(fare)}
                      >
                        <h3 className="text-lg font-semibold">{fare.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{fare.description}</p>
                        <div className="mt-2">
                          <span className="text-lg font-bold text-green-600">₹{fare.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">₹{fare.originalPrice}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Valid: {new Date(fare.validFrom).toLocaleDateString()} - {new Date(fare.validTo).toLocaleDateString()}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            fare.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {fare.isActive ? 'Active' : 'Inactive'}
                          </span>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(fare);
                              }}
                              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm('Are you sure you want to delete this special fare?')) {
                                  handleDelete(fare._id);
                                }
                              }}
                              className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAddModal(false);
              setIsEditing(false);
            }
          }}
        >
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 shadow-lg rounded-md bg-white max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {isEditing ? 'Edit' : 'Add New'} {activeTab === 'packages' ? 'Package' : 'Special Fare'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setIsEditing(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {activeTab === 'packages' ? 'Package Name' : 'Title'}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || formData.title || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              {activeTab === 'packages' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration || '5 Days / 4 Nights'}
                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Package Type</label>
                      <select
                        name="packageType"
                        value={formData.packageType || 'Standard'}
                        onChange={(e) => setFormData({...formData, packageType: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Premium">Premium</option>
                        <option value="Luxury">Luxury</option>
                        <option value="Budget">Budget</option>
                        <option value="Custom">Custom</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Destinations (comma separated)</label>
                      <input
                        type="text"
                        name="destinations"
                        value={formData.destinations || 'Baku'}
                        onChange={(e) => setFormData({...formData, destinations: e.target.value})}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Departure Cities (comma separated)</label>
                      <input
                        type="text"
                        name="departureCities"
                        value={formData.departureCities || 'Ernakulam, Kottayam, Cochin'}
                        onChange={(e) => setFormData({...formData, departureCities: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="border p-3 rounded-md">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Accommodation Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-500">Type</label>
                        <select
                          name="accommodation.type"
                          value={formData.accommodation?.type || 'Hotel'}
                          onChange={(e) => setFormData({
                            ...formData,
                            accommodation: {
                              ...formData.accommodation,
                              type: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        >
                          <option value="Hotel">Hotel</option>
                          <option value="Resort">Resort</option>
                          <option value="Villa">Villa</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Cruise">Cruise</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-500">Name</label>
                        <input
                          type="text"
                          name="accommodation.name"
                          value={formData.accommodation?.name || 'Park Inn Baku'}
                          onChange={(e) => setFormData({
                            ...formData,
                            accommodation: {
                              ...formData.accommodation,
                              name: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-500">Rating (1-5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          name="accommodation.rating"
                          value={formData.accommodation?.rating || 3}
                          onChange={(e) => setFormData({
                            ...formData,
                            accommodation: {
                              ...formData.accommodation,
                              rating: parseInt(e.target.value)
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-500">Room Type</label>
                        <input
                          type="text"
                          name="accommodation.roomType"
                          value={formData.accommodation?.roomType || 'Standard Room'}
                          onChange={(e) => setFormData({
                            ...formData,
                            accommodation: {
                              ...formData.accommodation,
                              roomType: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-500">Occupancy</label>
                        <select
                          name="accommodation.occupancy"
                          value={formData.accommodation?.occupancy || 'Double'}
                          onChange={(e) => setFormData({
                            ...formData,
                            accommodation: {
                              ...formData.accommodation,
                              occupancy: e.target.value
                            }
                          })}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        >
                          <option value="Single">Single</option>
                          <option value="Double">Double</option>
                          <option value="Triple">Triple</option>
                          <option value="Quad">Quad</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Inclusions (comma separated)</label>
                      <textarea
                        name="inclusions"
                        value={formData.inclusions || [
                          "Airport transfers",
                          "Hotel accommodation",
                          "Daily breakfast",
                          "Sightseeing tours",
                          "Entrance fees",
                          "English speaking guide"
                        ].join(', ')}
                        onChange={(e) => setFormData({...formData, inclusions: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Exclusions (comma separated)</label>
                      <textarea
                        name="exclusions"
                        value={formData.exclusions || [
                          "Flight tickets",
                          "Visa fees",
                          "Personal expenses",
                          "Travel insurance",
                          "Meals not mentioned"
                        ].join(', ')}
                        onChange={(e) => setFormData({...formData, exclusions: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="border p-3 rounded-md">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Itinerary</h4>
                    
                    {[1, 2, 3, 4, 5].map(day => (
                      <div key={day} className="mb-3 border-b pb-2">
                        <h5 className="text-xs font-medium text-gray-600">Day {day}</h5>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-500">Title</label>
                            <input
                              type="text"
                              name={`itinerary[${day-1}].title`}
                              value={formData.itinerary?.[day-1]?.title || ''}
                              onChange={(e) => {
                                const newItinerary = [...(formData.itinerary || [])];
                                newItinerary[day-1] = {
                                  ...newItinerary[day-1],
                                  title: e.target.value
                                };
                                setFormData({...formData, itinerary: newItinerary});
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-500">Overnight Location</label>
                            <input
                              type="text"
                              name={`itinerary[${day-1}].overnight`}
                              value={formData.itinerary?.[day-1]?.overnight || 'Baku'}
                              onChange={(e) => {
                                const newItinerary = [...(formData.itinerary || [])];
                                newItinerary[day-1] = {
                                  ...newItinerary[day-1],
                                  overnight: e.target.value
                                };
                                setFormData({...formData, itinerary: newItinerary});
                              }}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                            />
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <label className="block text-xs font-medium text-gray-500">Description</label>
                          <textarea
                            name={`itinerary[${day-1}].description`}
                            value={formData.itinerary?.[day-1]?.description || ''}
                            onChange={(e) => {
                              const newItinerary = [...(formData.itinerary || [])];
                              newItinerary[day-1] = {
                                ...newItinerary[day-1],
                                description: e.target.value
                              };
                              setFormData({...formData, itinerary: newItinerary});
                            }}
                            rows={2}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                          />
                        </div>
                        
                        <div className="mt-2">
                          <label className="block text-xs font-medium text-gray-500">Attractions (comma separated)</label>
                          <input
                            type="text"
                            name={`itinerary[${day-1}].attractions`}
                            value={formData.itinerary?.[day-1]?.attractions?.join(', ') || ''}
                            onChange={(e) => {
                              const newItinerary = [...(formData.itinerary || [])];
                              newItinerary[day-1] = {
                                ...newItinerary[day-1],
                                attractions: e.target.value.split(',').map(item => item.trim())
                              };
                              setFormData({...formData, itinerary: newItinerary});
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border p-3 rounded-md">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Flight Details</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-xs font-medium text-gray-600">Onward Journey</h5>
                        <div className="space-y-2 mt-1">
                          <input
                            type="text"
                            placeholder="Airline"
                            name="flights.onward.airline"
                            value={formData.flights?.onward?.airline || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              flights: {
                                ...formData.flights,
                                onward: {
                                  ...formData.flights?.onward,
                                  airline: e.target.value
                                }
                              }
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Departure"
                            name="flights.onward.departure"
                            value={formData.flights?.onward?.departure || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              flights: {
                                ...formData.flights,
                                onward: {
                                  ...formData.flights?.onward,
                                  departure: e.target.value
                                }
                              }
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Departure Airport"
                            name="flights.onward.departureAirport"
                            value={formData.flights?.onward?.departureAirport || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              flights: {
                                ...formData.flights,
                                onward: {
                                  ...formData.flights?.onward,
                                  departureAirport: e.target.value
                                }
                              }
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-xs font-medium text-gray-600">Return Journey</h5>
                        <div className="space-y-2 mt-1">
                          <input
                            type="text"
                            placeholder="Airline"
                            name="flights.return.airline"
                            value={formData.flights?.return?.airline || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              flights: {
                                ...formData.flights,
                                return: {
                                  ...formData.flights?.return,
                                  airline: e.target.value
                                }
                              }
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Departure"
                            name="flights.return.departure"
                            value={formData.flights?.return?.departure || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              flights: {
                                ...formData.flights,
                                return: {
                                  ...formData.flights?.return,
                                  departure: e.target.value
                                }
                              }
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Departure Airport"
                            name="flights.return.departureAirport"
                            value={formData.flights?.return?.departureAirport || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              flights: {
                                ...formData.flights,
                                return: {
                                  ...formData.flights?.return,
                                  departureAirport: e.target.value
                                }
                              }
                            })}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URLs (comma separated)</label>
                      <textarea
                        name="images"
                        value={Array.isArray(formData.images) ? formData.images.join(', ') : formData.images || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          images: e.target.value.split(',').map(url => url.trim())
                        })}
                        rows={2}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Thumbnail Image URL</label>
                      <input
                        type="text"
                        name="thumbnail"
                        value={formData.thumbnail || ''}
                        onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Market</label>
                      <input
                        type="text"
                        name="market"
                        value={formData.market || 'Indian Nationals Only'}
                        onChange={(e) => setFormData({...formData, market: e.target.value})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                      <input
                        type="text"
                        name="tags"
                        value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          tags: e.target.value.split(',').map(tag => tag.trim())
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Highlights (comma separated)</label>
                    <textarea
                      name="highlights"
                      value={formData.highlights || [
                        "Baku Old City (UNESCO Site)",
                        "Shahdag Mountain Resort",
                        "Gobustan National Park",
                        "Mud Volcanoes",
                        "Gabala Waterfalls"
                      ].join(', ')}
                      onChange={(e) => setFormData({
                        ...formData,
                        highlights: e.target.value.split(',').map(highlight => highlight.trim())
                      })}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {activeTab === 'specialFares' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Valid From</label>
                      <input
                        type="date"
                        name="validFrom"
                        value={formData.validFrom || ''}
                        onChange={(e) => setFormData({...formData, validFrom: e.target.value})}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Valid To</label>
                      <input
                        type="date"
                        name="validTo"
                        value={formData.validTo || ''}
                        onChange={(e) => setFormData({...formData, validTo: e.target.value})}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Original Price</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice || ''}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>

              {activeTab === 'packages' && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Featured
                  </label>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && <DetailModal />}
    </div>
  );
}