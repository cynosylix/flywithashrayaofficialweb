import { notFound } from "next/navigation";
import { services, ServiceCategory, Service } from "../../servicesData";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

// Server-side function to generate static params for static export
export async function generateStaticParams() {
  const allServices: Service[] = [];
  
  // Flatten all services from all categories
  services.forEach(category => {
    category.items.forEach(item => {
      allServices.push(item);
    });
  });

  return allServices.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  // Find the service across all categories
  let service = null;
  for (const category of services) {
    const foundService = category.items.find(item => item.slug === params.slug);
    if (foundService) {
      service = foundService;
      break;
    }
  }

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="text-6xl mb-4">{service.icon}</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.name}</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">{service.description}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Service Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                {service.detailedDescription || service.description}
              </p>

              {service.features && service.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start"
                      >
                        <span className="text-blue-600 mr-3 mt-1">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.process && service.process.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Process</h3>
                  <div className="space-y-4">
                    {service.process.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get Started</h3>
                <p className="text-gray-600 mb-4">
                  Ready to begin? Contact us today for personalized assistance.
                </p>
                <Link href="/Contact">
                  <button
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Contact Us
                  </button>
                </Link>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Services</h3>
                <div className="space-y-3">
                  {services.map(category => 
                    category.items
                      .filter(item => item.slug !== service.slug)
                      .slice(0, 3)
                      .map(relatedService => (
                        <Link
                          key={relatedService.slug}
                          href={`/services_details/${relatedService.slug}`}
                          className="block p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">{relatedService.icon}</span>
                            <span className="text-gray-700 font-medium">{relatedService.name}</span>
                          </div>
                        </Link>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
