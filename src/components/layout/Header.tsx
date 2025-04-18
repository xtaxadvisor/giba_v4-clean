import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Menu, X, Shield, Video, FileText, Calculator } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';

export function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <span className="text-2xl sm:text-3xl font-bold">
              <span className="text-blue-600">PRo</span>
              <span className={isScrolled ? 'text-gray-900' : 'text-gray-800'}>Ta</span>
              <span className="text-blue-600">X</span>
              <span className={isScrolled ? 'text-gray-900' : 'text-gray-800'}>AdvisorS</span>
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</Link>
            <Link to="/same-day-services" className="text-gray-600 hover:text-blue-600 transition-colors">Same Day Services</Link>
            <Link to="/browse-videos" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <Video className="h-4 w-4 mr-1" />
              Video Classes
            </Link>
            <Link to="/calculator" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <Calculator className="h-4 w-4 mr-1" />
              Tax Calculator
            </Link>
            <Link to="/tax-forms" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Tax Forms
            </Link>
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
            
            {isAuthenticated && user?.role === 'admin' && (
              <Link 
                to="/admin" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Shield className="h-4 w-4 mr-1" />
                Admin
              </Link>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="hover-scale"
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="hover-scale"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  icon={LogIn}
                  className="hover-scale"
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate('/register')}
                  className="hover-scale"
                >
                  Get Started
                </Button>
              </div>
            )}
            <Link
              to="/cart"
              className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6m1.2-6L5.4 7M17 13l1.2 6M6 19a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2z"
                />
              </svg>
              Cart
            </Link>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg`}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          <Link
            to="/services"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Services
          </Link>
          <Link
            to="/same-day-services"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Same Day Services
          </Link>
          <Link
            to="/browse-videos"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Video Classes
          </Link>
          <Link
            to="/calculator"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Tax Calculator
          </Link>
          <Link
            to="/tax-forms"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Tax Forms
          </Link>
          <a
            href="#about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            About
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Contact
          </a>
          {isAuthenticated && user?.role === 'admin' && (
            <Link
              to="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              Admin Portal
            </Link>
          )}
          <div className="pt-4">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="w-full mb-2"
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  icon={LogIn}
                  className="w-full mb-2"
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate('/register')}
                  className="w-full"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}