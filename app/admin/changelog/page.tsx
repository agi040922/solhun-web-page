"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, LogOut, X, Save } from "lucide-react";

// Types
interface ChangelogItem {
  text: string;
}

interface Changelog {
  id: number;
  version: string;
  date: string;
  title: string;
  description: string;
  improvements: ChangelogItem[];
  fixes: ChangelogItem[];
  patches: ChangelogItem[];
  createdAt: string;
  updatedAt: string;
}

type FormData = Omit<Changelog, "id" | "createdAt" | "updatedAt">;

const EMPTY_FORM: FormData = {
  version: "",
  date: "",
  title: "",
  description: "",
  improvements: [],
  fixes: [],
  patches: [],
};

export default function AdminChangelogPage() {
  // Auth state
  const [apiKey, setApiKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  // Data state
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  // Item input state (improvements, fixes, patches)
  const [newImprovement, setNewImprovement] = useState("");
  const [newFix, setNewFix] = useState("");
  const [newPatch, setNewPatch] = useState("");

  // Check saved API key
  useEffect(() => {
    const savedKey = localStorage.getItem("admin_api_key");
    if (savedKey) {
      setApiKey(savedKey);
      setIsAuthenticated(true);
    }
  }, []);

  // Load data after auth
  useEffect(() => {
    if (isAuthenticated) {
      fetchChangelogs();
    }
  }, [isAuthenticated]);

  // API call helper
  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });
  };

  // Login handler
  const handleLogin = async () => {
    setAuthError("");
    setLoading(true);

    try {
      // Simple auth test (POST request check)
      const res = await fetch("/api/changelogs", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Empty body for test
      });

      // If not 401, auth passed (400 Bad Request means auth passed)
      if (res.status !== 401) {
        localStorage.setItem("admin_api_key", apiKey);
        setIsAuthenticated(true);
      } else {
        setAuthError("Invalid API key.");
      }
    } catch (error) {
      setAuthError("An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("admin_api_key");
    setApiKey("");
    setIsAuthenticated(false);
    setChangelogs([]);
  };

  // Fetch changelogs
  const fetchChangelogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/changelogs");
      const data = await res.json();
      setChangelogs(data);
    } catch (error) {
      console.error("Failed to fetch changelogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open modal (create/edit)
  const openModal = (changelog?: Changelog) => {
    if (changelog) {
      setEditingId(changelog.id);
      setFormData({
        version: changelog.version,
        date: changelog.date,
        title: changelog.title,
        description: changelog.description,
        improvements: changelog.improvements || [],
        fixes: changelog.fixes || [],
        patches: changelog.patches || [],
      });
    } else {
      setEditingId(null);
      setFormData(EMPTY_FORM);
    }
    setNewImprovement("");
    setNewFix("");
    setNewPatch("");
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  // Save (create/update)
  const handleSave = async () => {
    setLoading(true);
    try {
      const url = editingId
        ? `/api/changelogs/${editingId}`
        : "/api/changelogs";
      const method = editingId ? "PUT" : "POST";

      const res = await fetchWithAuth(url, {
        method,
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        closeModal();
        fetchChangelogs();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save.");
      }
    } catch (error) {
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    setLoading(true);
    try {
      const res = await fetchWithAuth(`/api/changelogs/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchChangelogs();
      } else {
        alert("Failed to delete.");
      }
    } catch (error) {
      alert("An error occurred while deleting.");
    } finally {
      setLoading(false);
    }
  };

  // Add item helper
  const addItem = (
    field: "improvements" | "fixes" | "patches",
    text: string,
    setText: (v: string) => void
  ) => {
    if (!text.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], { text: text.trim() }],
    }));
    setText("");
  };

  // Remove item helper
  const removeItem = (
    field: "improvements" | "fixes" | "patches",
    index: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Admin Login
          </h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Admin API Key"
              />
            </div>
            {authError && (
              <p className="text-red-500 text-sm">{authError}</p>
            )}
            <button
              onClick={handleLogin}
              disabled={loading || !apiKey}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Changelog Admin
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              New Changelog
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* List */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {loading && changelogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Loading...</div>
        ) : changelogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No changelogs available.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {changelogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {log.version}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="text-blue-600">
                        {(log.improvements || []).length}
                      </span>
                      {" / "}
                      <span className="text-orange-600">
                        {(log.fixes || []).length}
                      </span>
                      {" / "}
                      <span className="text-gray-600">
                        {(log.patches || []).length}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => openModal(log)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(log.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white px-6 py-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId ? "Edit Changelog" : "New Changelog"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Version *
                  </label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        version: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="1.0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, date: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Dec 17, 2025"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Release title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Description of this release"
                />
              </div>

              {/* Improvements */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  Improvements ({formData.improvements.length})
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newImprovement}
                    onChange={(e) => setNewImprovement(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      addItem("improvements", newImprovement, setNewImprovement)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter improvement and press Enter"
                  />
                  <button
                    onClick={() =>
                      addItem("improvements", newImprovement, setNewImprovement)
                    }
                    className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.improvements.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{item.text}</span>
                      <button
                        onClick={() => removeItem("improvements", idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fixes */}
              <div>
                <label className="block text-sm font-medium text-orange-600 mb-2">
                  Fixes ({formData.fixes.length})
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newFix}
                    onChange={(e) => setNewFix(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && addItem("fixes", newFix, setNewFix)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter bug fix and press Enter"
                  />
                  <button
                    onClick={() => addItem("fixes", newFix, setNewFix)}
                    className="px-3 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.fixes.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-orange-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{item.text}</span>
                      <button
                        onClick={() => removeItem("fixes", idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Patches */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Patches ({formData.patches.length})
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newPatch}
                    onChange={(e) => setNewPatch(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      addItem("patches", newPatch, setNewPatch)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    placeholder="Enter patch and press Enter"
                  />
                  <button
                    onClick={() => addItem("patches", newPatch, setNewPatch)}
                    className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.patches.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm text-gray-700">{item.text}</span>
                      <button
                        onClick={() => removeItem("patches", idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={
                  loading ||
                  !formData.version ||
                  !formData.date ||
                  !formData.title ||
                  !formData.description
                }
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={16} />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
