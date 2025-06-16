import { Card } from '@/components/ui/card';
import { Target, Eye, TrendingUp, Users } from 'lucide-react';

export default function MissionVisionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Mission */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                To empower investors of all levels with the knowledge and tools to achieve their financial goals.
              </p>
              
              <div className="space-y-4">
                {[
                  'Democratize financial knowledge',
                  'Provide cutting-edge investment tools',
                  'Ensure transparent and ethical practices',
                  'Support every investor\'s journey'
                ].map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Vision */}
          <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-0 shadow-xl p-8 md:p-12 hover:shadow-2xl transition-all duration-300">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                To be the most trusted and innovative financial services provider in India, delivering exceptional value and customer satisfaction.
              </p>
              
              <div className="space-y-4">
                {[
                  'Leading financial innovation in India',
                  'Building long-term investor relationships',
                  'Setting industry standards for excellence',
                  'Creating sustainable wealth for all'
                ].map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

      
        
      </div>
    </section>
  );
}
