'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone, Mail, HelpCircle } from 'lucide-react';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number (include country code without + sign)
    const phoneNumber = '9175010080'; // Example: Indian number
    const message = 'Hi! I would like to know more about your services.';
    const whatsappUrl = `https://wa.me/9175010080`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    // Replace with your actual phone number
    window.location.href = 'tel:+919175010080';
  };

  const handleEmailClick = () => {
    // Replace with your actual email
    window.location.href = 'mailto:contact@bullisheyes.com?subject=Inquiry&body=Hi, I would like to know more about your services.';
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          aria-label="Contact us"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>

        {/* Contact Options */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 w-64 animate-in slide-in-from-bottom-2 duration-200">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">How can we help you?</h3>
              <p className="text-sm text-gray-600">Choose your preferred way to contact us</p>
            </div>

            <div className="space-y-3">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 transition-colors duration-200"
              >
                <div className="bg-green-500 p-2 rounded-full">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-xs text-green-600">Chat with us instantly</div>
                </div>
              </button>

              {/* Phone */}
              <button
                onClick={handleCallClick}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors duration-200"
              >
                <div className="bg-blue-500 p-2 rounded-full">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Call Us</div>
                  <div className="text-xs text-blue-600">Speak directly with our team</div>
                </div>
              </button>

              {/* Email */}
              <button
                onClick={handleEmailClick}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 transition-colors duration-200"
              >
                <div className="bg-purple-500 p-2 rounded-full">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Email Us</div>
                  <div className="text-xs text-purple-600">Send us your questions</div>
                </div>
              </button>

              {/* Help/FAQ */}
              <button
                onClick={() => window.location.href = '/contact'}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200"
              >
                <div className="bg-gray-500 p-2 rounded-full">
                  <HelpCircle className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Need Help?</div>
                  <div className="text-xs text-gray-600">Visit our contact page</div>
                </div>
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Available 24/7 for your convenience
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FloatingContact;
