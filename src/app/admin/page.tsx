'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, 
  CheckCircle, 
  Download, 
  Eye, 
  EyeOff, 
  Edit3, 
  Save, 
  MapPin, 
  AlertTriangle,
  ArrowLeft,
  Layers,
  Database
} from 'lucide-react';
import { MENU_ITEMS as INITIAL_ITEMS } from '@/data/menu';
import { BRANCHES } from '@/data/branches';
import { useBranch } from '@/context/BranchContext';
import { MenuItem, BranchId } from '@/types';

export default function AdminPage() {
  const { previewMode, togglePreviewMode } = useBranch();
  const [items, setItems] = useState<MenuItem[]>(INITIAL_ITEMS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<number>(0);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditPrice(item.priceLKR);
  };

  const saveEdit = (id: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === id) {
          return {
            ...it,
            priceLKR: editPrice,
            priceFormatted: `LKR ${editPrice.toLocaleString()}`,
          };
        }
        return it;
      })
    );
    setEditingId(null);
    setSavedSuccess(`Updated price for item ${id}`);
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  const toggleBranchAvailability = (itemId: string, branch: BranchId) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id === itemId) {
          const hasBranch = it.branchAvailability.includes(branch);
          const next = hasBranch
            ? it.branchAvailability.filter((b) => b !== branch)
            : [...it.branchAvailability, branch];
          return { ...it, branchAvailability: next };
        }
        return it;
      })
    );
  };

  const exportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'burger_house_verified_menu.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const displayedItems = filterCategory === 'all'
    ? items
    : items.filter((it) => it.category === filterCategory);

  return (
    <div className="min-h-screen bg-[#141210]">
      {/* Top Banner */}
      <div className="bg-[#181512] border-b border-[#2A2420] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-dark hover:text-cream transition-colors mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer View</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#28231E] border border-[#38312B] px-3 py-1 rounded-full mb-2">
                <Database className="w-3.5 h-3.5 text-cheese" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-dark">
                  Staff Control & Handoff
                </span>
              </div>
              <h1 className="font-['Anton'] text-3xl sm:text-4xl tracking-wider text-cream">
                CONTENT & VERIFICATION CENTER
              </h1>
              <p className="text-muted-dark text-xs mt-1">
                Manage branch menu availability, revise pricing, inspect evidence citations, and toggle preview modes.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={togglePreviewMode}
                className={`text-xs font-bold px-4 py-2.5 rounded-xl border flex items-center gap-2 transition-colors cursor-pointer ${
                  previewMode
                    ? 'bg-amber-950/80 text-amber-200 border-amber-800'
                    : 'bg-[#28231E] text-muted-dark border-[#38312B]'
                }`}
              >
                {previewMode ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                <span>{previewMode ? 'Verification Mode: ON' : 'Verification Mode: OFF'}</span>
              </button>

              <button
                onClick={exportJSON}
                className="bg-tomato hover:bg-tomato-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export Verified JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {savedSuccess && (
          <div className="bg-emerald-950/80 border border-emerald-800 text-emerald-200 px-4 py-3 rounded-2xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{savedSuccess}</span>
          </div>
        )}

        {/* Branch Verification Audit Box */}
        <div className="bg-[#211D19] border border-[#38312B] rounded-3xl p-6">
          <h2 className="font-['Anton'] text-lg tracking-wider text-cream mb-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cheese" />
            BRANCH VERIFICATION & AUDIT CHECKLIST
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Nugegoda Checklist */}
            <div className="bg-[#1C1814] border border-amber-900/40 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-cream text-sm">Nugegoda Branch</span>
                <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded-full font-mono">
                  Pending Owner Approval
                </span>
              </div>
              <ul className="text-xs text-muted-dark space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Discrepancy:</strong> Map lists 177d Stanley Thilakarathna Mawatha; Uber Eats indexed 163 Stanley Tilakaratne Mawatha.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Phone (+94 77 226 4477) confirmed across Google Place & Wanderboat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Place ID: <code className="text-cream font-mono">ChIJRX2zOKJb4joR2pxF5T7Q22k</code></span>
                </li>
              </ul>
            </div>

            {/* Moratuwa Checklist */}
            <div className="bg-[#1C1814] border border-emerald-900/40 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-cream text-sm">Moratuwa Branch</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-mono">
                  Corroborated
                </span>
              </div>
              <ul className="text-xs text-muted-dark space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Address 291 Old Galle Rd confirmed on Uber Eats (S2) & Review Guru (S6).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Phone (+94 77 229 9827) verified on Google Place.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Place ID: <code className="text-cream font-mono">ChIJtQBPB1pF4joRBr6Pi0rlfHE</code></span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Menu Items Table */}
        <div className="bg-[#211D19] border border-[#38312B] rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-[#302924] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-['Anton'] text-xl tracking-wider text-cream">
                MENU ITEMS MANAGEMENT ({displayedItems.length})
              </h2>
              <p className="text-xs text-muted-dark mt-0.5">
                Toggle branch visibility or update snapshot pricing in real-time.
              </p>
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#1C1814] border border-[#38312B] text-cream text-xs rounded-xl px-3 py-2 focus:border-cheese focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="burgers">Burgers</option>
              <option value="fries">Loaded Fries</option>
              <option value="pasta">Pasta</option>
              <option value="fried-rice">Fried Rice</option>
              <option value="kottu">Kottu & Dolphin</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-muted-dark">
              <thead className="bg-[#1C1814] text-[10px] uppercase font-bold text-cream tracking-wider border-b border-[#302924]">
                <tr>
                  <th className="py-3 px-4">Item Name</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Price (LKR)</th>
                  <th className="py-3 px-3">Nugegoda</th>
                  <th className="py-3 px-3">Moratuwa</th>
                  <th className="py-3 px-3">Evidence Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2B2520]">
                {displayedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-[#28221D] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-cream">
                      <div>{item.name}</div>
                      {item.isFeatured && (
                        <span className="text-[10px] text-tomato font-bold uppercase">★ Signature</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 uppercase text-[10px] font-bold">{item.categoryLabel}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-cheese">
                      {editingId === item.id ? (
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-20 bg-black border border-cheese px-2 py-1 rounded text-white font-mono text-xs"
                        />
                      ) : (
                        item.priceFormatted
                      )}
                    </td>
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => toggleBranchAvailability(item.id, 'nugegoda')}
                        className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors cursor-pointer ${
                          item.branchAvailability.includes('nugegoda')
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {item.branchAvailability.includes('nugegoda') ? 'Active' : 'Off'}
                      </button>
                    </td>
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => toggleBranchAvailability(item.id, 'moratuwa')}
                        className={`text-[10px] font-bold px-2 py-1 rounded-md transition-colors cursor-pointer ${
                          item.branchAvailability.includes('moratuwa')
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-zinc-800 text-zinc-500'
                        }`}
                      >
                        {item.branchAvailability.includes('moratuwa') ? 'Active' : 'Off'}
                      </button>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        item.evidenceStatus === 'search_indexed_owner_confirmation_required'
                          ? 'bg-amber-950/60 text-amber-300 border border-amber-800/40'
                          : 'bg-blue-950/60 text-blue-300 border border-blue-800/40'
                      }`}>
                        {item.evidenceStatus === 'owner_printed_menu' ? 'Printed Menu' : item.evidenceStatus === 'search_indexed_owner_confirmation_required' ? 'Search Indexed' : 'Retrieved Snapshot'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {editingId === item.id ? (
                        <button
                          onClick={() => saveEdit(item.id)}
                          className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => startEdit(item)}
                          className="bg-[#352E28] hover:bg-[#443B33] text-cream px-2.5 py-1 rounded-md flex items-center gap-1 ml-auto cursor-pointer transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-cheese" />
                          <span>Edit</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
