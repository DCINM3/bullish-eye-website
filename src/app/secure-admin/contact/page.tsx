'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Phone,
  Mail,
  MessageCircle,
  Download,
  FileSpreadsheet,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContactSubmission } from '@/types/contact';

interface ContactData {
  submissions: ContactSubmission[];
  counts: {
    total: number;
    'not-viewed': number;
    opened: number;
    responded: number;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export default function ContactSubmissionsPage() {
  const [data, setData] = useState<ContactData | null>(null);
  const [respondedData, setRespondedData] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);

  const fetchSubmissions = async (page = 1, search = '', status = 'all') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        search,
        status
      });

      const response = await fetch(`/api/contact?${params}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load contact submissions');
    } finally {
      setLoading(false);
    }
  };

  const fetchRespondedSubmissions = async () => {
    try {
      const params = new URLSearchParams({
        page: '1',
        limit: '1000', // Large limit to get all responded submissions
        search: '',
        status: 'responded'
      });

      const response = await fetch(`/api/contact?${params}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const result = await response.json();
        setRespondedData(result.data.submissions || []);
      }
    } catch (error) {
      console.error('Error fetching responded submissions:', error);
    }
  };

  useEffect(() => {
    fetchSubmissions(currentPage, searchTerm, statusFilter);
    fetchRespondedSubmissions();
  }, [currentPage, searchTerm, statusFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchSubmissions(1, searchTerm, statusFilter);
  };

  const exportSubmissions = async (type = 'all') => {
    try {
      // Fetch all submissions for export (not just current page)
      const params = new URLSearchParams({
        page: '1',
        limit: '1000', // Large limit to get all submissions
        search: '',
        status: type === 'responded' ? 'responded' : 'all'
      });

      const response = await fetch(`/api/contact?${params}`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch submissions for export');
      }

      const result = await response.json();
      const allSubmissions = result.data.submissions;

      if (!allSubmissions || allSubmissions.length === 0) {
        toast.error('No submissions to export');
        return;
      }

      let submissionsToExport = allSubmissions;
      if (type === 'responded') {
        submissionsToExport = allSubmissions.filter((sub: ContactSubmission) => sub.status === 'responded');
      }

      if (submissionsToExport.length === 0) {
        toast.error(`No ${type === 'responded' ? 'responded' : ''} submissions to export`);
        return;
      }

      const csvContent = [
        ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Submitted Date', 'Last Updated'],
        ...submissionsToExport.map((sub: ContactSubmission) => [
          `${sub.firstName} ${sub.lastName}`,
          sub.email,
          sub.phone || 'Not provided',
          sub.subject,
          sub.message.replace(/,/g, ';').replace(/\n/g, ' '), // Replace commas and newlines for CSV
          getStatusLabel(sub.status),
          new Date(sub.submittedAt).toLocaleDateString(),
          new Date(sub.updatedAt).toLocaleDateString()
        ])
      ].map(row => row.map((cell: string) => `"${cell}"`).join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contact-submissions-${type}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast.success(`Exported ${submissionsToExport.length} ${type === 'responded' ? 'responded' : ''} submissions`);
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export submissions');
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }
      toast.success('Status updated successfully');
      fetchSubmissions(currentPage, searchTerm, statusFilter);
      fetchRespondedSubmissions(); // Refresh responded data
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update status');
    }
  };

  const deleteSubmission = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete submission');
      }
      toast.success('Submission deleted successfully');
      fetchSubmissions(currentPage, searchTerm, statusFilter);
      fetchRespondedSubmissions(); // Refresh responded data
      setSelectedSubmission(null); // Close modal if open
    } catch (error) {
      console.error('Error deleting submission:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete submission');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not-viewed':
        return <AlertCircle className="w-4 h-4" />;
      case 'opened':
        return <Eye className="w-4 h-4" />;
      case 'responded':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-viewed':
        return 'bg-red-100 text-red-800';
      case 'opened':
        return 'bg-yellow-100 text-yellow-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'not-viewed':
        return 'Not Viewed';
      case 'opened':
        return 'Opened';
      case 'responded':
        return 'Responded';
      default:
        return status;
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact submissions...</p>
        </div>
      </div>
    );
  }

  const activeSubmissions = data?.submissions.filter(sub => sub.status !== 'responded') || [];
  const respondedSubmissions = respondedData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
              <p className="text-gray-600">Manage customer inquiries and support requests</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button onClick={() => exportSubmissions('all')} className="flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export All</span>
            </Button>
            <Button 
              onClick={() => exportSubmissions('responded')} 
              variant="outline"
              className="flex items-center space-x-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Responded</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <MessageCircle className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{data?.counts.total || 0}</p>
              <p className="text-gray-600">Total Submissions</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{data?.counts['not-viewed'] || 0}</p>
              <p className="text-gray-600">Not Viewed</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{data?.counts.opened || 0}</p>
              <p className="text-gray-600">Opened</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{data?.counts.responded || 0}</p>
              <p className="text-gray-600">Responded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="not-viewed">Not Viewed</option>
                <option value="opened">Opened</option>
                <option value="responded">Responded</option>
              </select>
            </div>
            <Button type="submit" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
          </form>
        </div>
      </div>
      
      {/* Active Submissions */}
      {activeSubmissions.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Active Submissions</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeSubmissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {submission.firstName} {submission.lastName}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">{submission.email}</span>
                          </div>
                          {submission.phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{submission.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{submission.subject}</div>
                        <div className="text-sm text-gray-600 truncate max-w-xs">
                          {submission.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(submission.status)}`}>
                          {getStatusIcon(submission.status)}
                          <span>{getStatusLabel(submission.status)}</span>
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(submission.submittedAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setSelectedSubmission(submission)}
                            size="sm"
                            variant="outline"
                          >
                            View
                          </Button>
                          {submission.status === 'not-viewed' && (
                            <Button
                              onClick={() => updateStatus(submission._id!, 'opened')}
                              size="sm"
                              className="bg-yellow-600 hover:bg-yellow-700"
                            >
                              Mark Opened
                            </Button>
                          )}
                          {submission.status === 'opened' && (
                            <Button
                              onClick={() => updateStatus(submission._id!, 'responded')}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Mark Responded
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteSubmission(submission._id!)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            title="Delete submission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Responded Submissions */}
      {respondedSubmissions.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Responded Submissions</h2>
            <Button 
              onClick={() => exportSubmissions('responded')} 
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export Responded</span>
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {respondedSubmissions.map((submission) => (
                    <tr key={submission._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {submission.firstName} {submission.lastName}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-600">{submission.email}</span>
                          </div>
                          {submission.phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 text-gray-400 mr-2" />
                              <span className="text-sm text-gray-600">{submission.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{submission.subject}</div>
                        <div className="text-sm text-gray-600 truncate max-w-xs">
                          {submission.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(submission.submittedAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setSelectedSubmission(submission)}
                            size="sm"
                            variant="outline"
                          >
                            View Details
                          </Button>
                          <Button
                            onClick={() => deleteSubmission(submission._id!)}
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Pagination */}
      {data && data.pagination.totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={!data.pagination.hasPrev}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={!data.pagination.hasNext}
              variant="outline"
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{data.pagination.currentPage}</span> of{' '}
                <span className="font-medium">{data.pagination.totalPages}</span> 
                {' '}({data.pagination.totalCount} total submissions)
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={!data.pagination.hasPrev}
                  variant="outline"
                  className="rounded-r-none"
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!data.pagination.hasNext}
                  variant="outline"
                  className="rounded-l-none"
                >
                  Next
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {data && data.submissions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search criteria.' : 'No contact submissions yet.'}
          </p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Submission Details</h3>
                <Button
                  onClick={() => setSelectedSubmission(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="text-sm text-gray-900">{selectedSubmission.firstName} {selectedSubmission.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <Badge className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                      {getStatusIcon(selectedSubmission.status)}
                      <span>{getStatusLabel(selectedSubmission.status)}</span>
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedSubmission.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-sm text-gray-900">{selectedSubmission.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <p className="text-sm text-gray-900">{selectedSubmission.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-900">{selectedSubmission.message}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Submitted At</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedSubmission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Last Updated</label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedSubmission.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  {selectedSubmission.status === 'not-viewed' && (
                    <Button
                      onClick={() => {
                        updateStatus(selectedSubmission._id!, 'opened');
                        setSelectedSubmission({ ...selectedSubmission, status: 'opened' });
                      }}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      Mark as Opened
                    </Button>
                  )}
                  {selectedSubmission.status === 'opened' && (
                    <Button
                      onClick={() => {
                        updateStatus(selectedSubmission._id!, 'responded');
                        setSelectedSubmission({ ...selectedSubmission, status: 'responded' });
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Mark as Responded
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteSubmission(selectedSubmission._id!)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
