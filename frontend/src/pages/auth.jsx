import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, ArrowRight, User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    user_type: 'Attendee'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Convert user_type for API
    const apiFormData = {
      ...formData,
      user_type: formData.user_type === 'Event Organizer' ? 'Admin' : 'Attendee'
    };

    try {
      const response = await fetch(`/api/${isLogin ? 'login' : 'register'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiFormData),
      });

      if (response.ok) {
        console.log('Success:', await response.json());
        navigate('/events');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center pb-4">
          <div className="flex items-center">
            <img src="/LineLess_Logo_NoBG.png" alt="FeedForward Logo" className="h-16 w-16 mr-4" />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">FeedForward</h1>
              <p className="text-gray-500 mt-2">Welcome back</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? 'Sign In' : 'Create Account'}</CardTitle>
            <CardDescription>
              {isLogin
                ? 'Enter your credentials to access your account'
                : 'Fill in the details to create your account'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required={!isLogin}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        required={!isLogin}
                        min="0"
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        value={formData.age}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <select
                      name="user_type"
                      value={formData.user_type}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="Attendee">Event Attendee</option>
                      <option value="Event Organizer">Event Organizer</option>
                    </select>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                {!loading && <ArrowRight className="h-4 w-4" />}
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : 'Already have an account? Sign in'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
