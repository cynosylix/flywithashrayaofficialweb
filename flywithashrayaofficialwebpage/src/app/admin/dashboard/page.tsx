'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PackageModal from '@/app/admin/modals/PackageModal';
import SpecialFareModal from '@/app/admin/modals/SpecialFareModal';
import PackageDetailModal from '@/app/admin/modals/PackageDetailModal';
import SpecialFareDetailModal from '@/app/admin/modals/SpecialFareDetailModal';
import { Package, SpecialFare, ApiResponse } from '@/app/types/admin.types';

export default function AdminDashboard() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [specialFares, setSpecialFares] = useState<SpecialFare[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'packages' | 'specialFares'>('packages');

  // Modal states
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showSpecialFareModal, setShowSpecialFareModal] = useState(false);
  const [showPackageDetailModal, setShowPackageDetailModal] = useState(false);
  const [showSpecialFareDetailModal, setShowSpecialFareDetailModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedSpecialFare, setSelectedSpecialFare] = useState<SpecialFare | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (retryCount = 0) => {
    const maxRetries = 3;
    const retryDelay = 1000 * (retryCount + 1); // Exponential backoff

    try {
      setLoading(true);
      setError(null);

      const results = await Promise.allSettled([
        fetchPackages(),
        fetchSpecialFares()
      ]);

      // Handle partial failures
      const [packagesResult, specialFaresResult] = results;

      if (packagesResult.status === 'fulfilled') {
        // Success - packages loaded
      } else {
        console.error('Packages fetch failed:', packagesResult.reason);
      }

      if (specialFaresResult.status === 'fulfilled') {
        // Success - special fares loaded
      } else {
        console.error('Special fares fetch failed:', specialFaresResult.reason);
      }

      // Only show error if both fail
      if (packagesResult.status === 'rejected' && specialFaresResult.status === 'rejected') {
        throw new Error('Unable to load any data');
      }

    } catch (error) {
      console.error('Error fetching data:', error);

      if (retryCount < maxRetries) {
        console.log(`Retrying... (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => fetchData(retryCount + 1), retryDelay);
        return;
      }

      let errorMessage = 'Failed to load data';
      if (error instanceof Error) {
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          errorMessage = 'Network connection error. Please check your internet connection.';
        } else if (error.message.includes('timeout')) {
          errorMessage = 'Request timeout. Please try again.';
        } else {
          errorMessage = error.message;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/admin/packages');
      if (!response.ok) throw new Error('Failed to fetch packages');

      const result: ApiResponse<Package[]> = await response.json();
      if (result.success && result.data) {
        setPackages(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch packages');
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
      throw error;
    }
  };

  const fetchSpecialFares = async () => {
    try {
      const response = await fetch('/api/admin/special-fares?isActive=true');
      if (!response.ok) throw new Error('Failed to fetch special fares');

      const result: ApiResponse<SpecialFare[]> = await response.json();
      if (result.success && result.data) {
        setSpecialFares(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch special fares');
      }
    } catch (error) {
      console.error('Error fetching special fares:', error);
      throw error;
    }
  };

  // Update the handlePackageSubmit function
const handlePackageSubmit = async (formData: Partial<Package>) => {
  try {
    setLoading(true);
    setError(null);
    
    const endpoint = selectedPackage
      ? `/api/admin/packages?id=${selectedPackage._id}`
      : '/api/admin/packages';

    const method = selectedPackage ? 'PUT' : 'POST';

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || 'Failed to save package');
    }

    if (!result.success && result.error) {
      throw new Error(result.error);
    }

    setShowPackageModal(false);
    setSelectedPackage(null);
    await fetchPackages();
    
    // Optional: Add success notification
    // setSuccessMessage(selectedPackage ? 'Package updated successfully' : 'Package created successfully');
    
  } catch (error) {
    console.error('Error saving package:', error);
    setError(error instanceof Error ? error.message : 'Failed to save package');
  } finally {
    setLoading(false);
  }
};

// Update the handleDeletePackage function
const handleDeletePackage = async (id: string) => {
  try {
    if (!confirm('Are you sure you want to delete this package?')) return;

    setLoading(true);
    setError(null);
    
    const response = await fetch(`/api/admin/packages?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || 'Failed to delete package');
    }

    if (!result.success && result.error) {
      throw new Error(result.error);
    }

    setShowPackageDetailModal(false);
    setSelectedPackage(null);
    await fetchPackages();
    
    // Optional: Add success notification
    console.log('Package deleted successfully');
    
  } catch (error) {
    console.error('Error deleting package:', error);
    setError(error instanceof Error ? error.message : 'Failed to delete package');
  } finally {
    setLoading(false);
  }
};

  const handleSpecialFareSubmit = async (formData: Partial<SpecialFare>) => {
    try {
      setLoading(true);
      const endpoint = selectedSpecialFare
        ? `/api/admin/special-fares?id=${selectedSpecialFare._id}`
        : '/api/admin/special-fares';

      const method = selectedSpecialFare ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result: ApiResponse<SpecialFare> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to save special fare');
      }

      setShowSpecialFareModal(false);
      setSelectedSpecialFare(null);
      await fetchSpecialFares();
    } catch (error) {
      console.error('Error saving special fare:', error);
      setError(error instanceof Error ? error.message : 'Failed to save special fare');
    } finally {
      setLoading(false);
    }
  };

  

  const handleDeleteSpecialFare = async (id: string) => {
    try {
      if (!confirm('Are you sure you want to delete this special fare?')) return;

      setLoading(true);
      const response = await fetch(`/api/admin/special-fares?id=${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<null> = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to delete special fare');
      }

      setShowSpecialFareDetailModal(false);
      setSelectedSpecialFare(null);
      await fetchSpecialFares();
    } catch (error) {
      console.error('Error deleting special fare:', error);
      setError(error instanceof Error ? error.message : 'Failed to delete special fare');
    } finally {
      setLoading(false);
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
          onClick={() => {
            setError(null);
            fetchData();
          }}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

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
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'packages'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                >
                  Packages ({packages.length})
                </button>
                <button
                  onClick={() => setActiveTab('specialFares')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'specialFares'
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
                if (activeTab === 'packages') {
                  setSelectedPackage(null);
                  setShowPackageModal(true);
                } else {
                  setSelectedSpecialFare(null);
                  setShowSpecialFareModal(true);
                }
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
                  <p className="text-gray-500">No packages found. Click Add New Package&lsquo; to create one.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                      <div
                        key={pkg._id}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedPackage(pkg);
                          setShowPackageDetailModal(true);
                        }}
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
                                setSelectedPackage(pkg);
                                setShowPackageModal(true);
                              }}
                              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePackage(pkg._id);
                              }}
                              className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${pkg.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
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
                  <p className="text-gray-500">No special fares found. Click Add New Special Fare to create one.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {specialFares.map((fare) => (
                      <div
                        key={fare._id}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => {
                          setSelectedSpecialFare(fare);
                          setShowSpecialFareDetailModal(true);
                        }}
                      >
                        <h3 className="text-lg font-semibold">{fare.title}</h3>
                        {fare.subtitle && <p className="text-gray-500 text-sm">{fare.subtitle}</p>}
                        <p className="text-gray-600 text-sm mt-1">{fare.description}</p>
                        <div className="mt-2">
                          <span className="text-lg font-bold text-green-600">₹{fare.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">₹{fare.originalPrice}</span>
                          {fare.discountPercentage && (
                            <span className="ml-2 px-1.5 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                              Save {fare.discountPercentage}%
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Valid: {new Date(fare.validFrom).toLocaleDateString()} - {new Date(fare.validTo).toLocaleDateString()}
                        </p>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex space-x-1">
                            <span className={`px-2 py-1 text-xs rounded-full ${fare.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                              {fare.isActive ? 'Active' : 'Inactive'}
                            </span>
                            {fare.isFeatured && (
                              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                                Featured
                              </span>
                            )}
                            {fare.isLimitedTime && (
                              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                Limited
                              </span>
                            )}
                            {fare.isBestSeller && (
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                Best Seller
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSpecialFare(fare);
                                setShowSpecialFareModal(true);
                              }}
                              className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSpecialFare(fare._id);
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

      {/* Modals */}
      <PackageModal
        isOpen={showPackageModal}
        onClose={() => {
          setShowPackageModal(false);
          setSelectedPackage(null);
        }}
        onSubmit={handlePackageSubmit}
        initialData={selectedPackage || undefined}
        isEditing={!!selectedPackage}
        isLoading={loading}
      />

      <SpecialFareModal
        isOpen={showSpecialFareModal}
        onClose={() => {
          setShowSpecialFareModal(false);
          setSelectedSpecialFare(null);
        }}
        onSubmit={handleSpecialFareSubmit}
        initialData={selectedSpecialFare || undefined}
        isEditing={!!selectedSpecialFare}
        isLoading={loading}
      />

      {selectedPackage && (
        <PackageDetailModal
          isOpen={showPackageDetailModal}
          onClose={() => {
            setShowPackageDetailModal(false);
            setSelectedPackage(null);
          }}
          onEdit={() => {
            setShowPackageDetailModal(false);
            setShowPackageModal(true);
          }}
          onDelete={() => handleDeletePackage(selectedPackage._id)}
          packageData={selectedPackage}
          isLoading={loading}
        />
      )}

      {selectedSpecialFare && (
        <SpecialFareDetailModal
          isOpen={showSpecialFareDetailModal}
          onClose={() => {
            setShowSpecialFareDetailModal(false);
            setSelectedSpecialFare(null);
          }}
          onEdit={() => {
            setShowSpecialFareDetailModal(false);
            setShowSpecialFareModal(true);
          }}
          onDelete={() => handleDeleteSpecialFare(selectedSpecialFare._id)}
          specialFareData={selectedSpecialFare}
          isLoading={loading}
        />
      )}
    </div>
  );
}