import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CreateActivityPage = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ activityData, setActivityData] = useState({
    name: '',
    description: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    rooms: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActivityData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Combine date and time for start and end
      const start = new Date(`${activityData.start_date}T${activityData.start_time}`);
      const end = new Date(`${activityData.end_date}T${activityData.end_time}`);

      // Validate dates
      if (end <= start) {
        throw new Error('End date must be after start date');
      }

      const payload = {
        name: activityData.name,
        description: activityData.description,
        start_date: start.toISOString(),
        end_date: end.toISOString(),
        rooms: activityData.rooms
      };

      const response = await fetch(`/api/events/${eventId}/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to create activity');
      }

      const data = await response.json();
      navigate(-1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Activity</h2>
        <Card>
          <CardContent className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Activity Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={100}
                  value={activityData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  maxLength={255}
                  value={activityData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="start_date"
                    required
                    value={activityData.start_date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    Start Time *
                  </label>
                  <input
                    type="time"
                    name="start_time"
                    required
                    value={activityData.start_time}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="end_date"
                    required
                    value={activityData.end_date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">
                    End Time *
                  </label>
                  <input
                    type="time"
                    name="end_time"
                    required
                    value={activityData.end_time}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Location *
                </label>
                <input
                  type="text"
                  name="rooms"
                  required
                  maxLength={100}
                  value={activityData.rooms}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Activity'}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateActivityPage;
