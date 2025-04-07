import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Lock, User, Key } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Button } from '../../ui/Button';
import { useNotificationStore } from '../../../lib/store';
import { adminAuthService } from '../../../services/auth/adminAuth';
import { isStrongPassword } from '../../../utils/crypto';
// Ensure this file exports AdminLoginForm
interface AdminLoginFormProps {
  mode?: string;
}

export function AdminLoginForm({ mode }: AdminLoginFormProps) {
  return (
    <form>
      {/* Form implementation */}
      {mode && <p>Mode: {mode}</p>}
    </form>
  );
}
export function ClientSignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    totpCode: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [showTOTP, setShowTOTP] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotificationStore();
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const nextPath = searchParams.get('next') || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Client signup attempt:', { username: formData.username });

    try {
      if (!isStrongPassword(formData.password)) {
        addNotification('Password does not meet security requirements', 'error');
        return;
      }

      const success = await adminAuthService.signup(formData);
      console.log('Signup result:', { success });
      
      if (success) {
        if (!showTOTP) {
          setShowTOTP(true);
          setLoading(false);
          return;
        }
        
        addNotification('Client account created', 'success');
        navigate(nextPath);
      } else {
        addNotification('Invalid credentials', 'error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      addNotification('Authentication failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Create Client Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter your information to register as a client
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!showTOTP ? (
            <>
              <Input
                type="text"
                label="Username"
                icon={User}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                autoComplete="username"
                placeholder="Enter your username"
              />
              <Input
                type="password"
                label="Password"
                icon={Lock}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
              <Input
                type="text"
                label="Full Name"
                icon={User}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                placeholder="Enter your full name"
              />
            </>
          ) : (
            <Input
              type="text"
              label="Two-Factor Code"
              icon={Key}
              value={formData.totpCode}
              onChange={(e) => setFormData({ ...formData, totpCode: e.target.value })}
              required
              placeholder="Enter your 2FA code"
              pattern="[0-9]{6}"
              maxLength={6}
            />
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Verifying...' : showTOTP ? 'Verify 2FA Code' : 'Continue'}
          </Button>
        </form>
      </div>
    </div>
  );
}