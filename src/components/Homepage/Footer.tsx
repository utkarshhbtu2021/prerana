import React from 'react';
import { Mail, MapPin, ChevronRight, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Us */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 mt-1 text-purple-400" />
                <div className="text-sm text-gray-300 leading-relaxed">
                  Ministry of Education<br />
                  Shastri Bhawan, New Delhi<br />
                  India - 110001
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <a href="mailto:prerana@moe.gov.in" className="text-sm text-gray-300 hover:text-white transition-colors">
                  prerana@moe.gov.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <a href="mailto:support@prerana.edu.in" className="text-sm text-gray-300 hover:text-white transition-colors">
                  support@prerana.edu.in
                </a>
              </div>
            </div>
          </div>

          {/* Important Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Important Links</h3>
            <div className="space-y-3">
              {[
                'Ministry of Education',
                'National Education Policy 2020',
                'Samagra Shiksha',
                'Digital India',
                'Skill Development'
              ].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors group"
                >
                  <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  <span>{link}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: Instagram, color: 'hover:text-pink-400' },
                { icon: Facebook, color: 'hover:text-blue-400' },
                { icon: Youtube, color: 'hover:text-red-400' },
                { icon: Twitter, color: 'hover:text-blue-300' }
              ].map((social, index) => (
                <a
                  key={index}
                  href="#"
                  className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <div className="pt-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                Stay connected with Prerana's latest updates, success stories, and educational resources.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © 2024 Prerana Initiative. Ministry of Education, Government of India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;