'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BranchId, Branch, MenuItem } from '@/types';
import { BRANCHES } from '@/data/branches';

interface BranchContextType {
  selectedBranch: BranchId;
  setBranch: (id: BranchId) => void;
  currentBranch: Branch;
  previewMode: boolean;
  setPreviewMode: (val: boolean) => void;
  togglePreviewMode: () => void;
  activeItemModal: MenuItem | null;
  openItemModal: (item: MenuItem) => void;
  closeItemModal: () => void;
  orderHandoffModal: { open: boolean; item?: MenuItem } | null;
  openOrderHandoff: (item?: MenuItem) => void;
  closeOrderHandoff: () => void;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }: { children: React.ReactNode }) {
  const [selectedBranch, setSelectedBranch] = useState<BranchId>('nugegoda');
  const [previewMode, setPreviewMode] = useState<boolean>(true); // default to true to showcase the honest evidence & verification features
  const [activeItemModal, setActiveItemModal] = useState<MenuItem | null>(null);
  const [orderHandoffModal, setOrderHandoffModal] = useState<{ open: boolean; item?: MenuItem } | null>(null);

  // Load persisted branch preference from localStorage safely
  useEffect(() => {
    try {
      const savedBranch = localStorage.getItem('burger_house_branch') as BranchId;
      if (savedBranch && (savedBranch === 'nugegoda' || savedBranch === 'moratuwa')) {
        setSelectedBranch(savedBranch);
      }
      const savedPreview = localStorage.getItem('burger_house_preview_mode');
      if (savedPreview !== null) {
        setPreviewMode(savedPreview === 'true');
      }
    } catch {
      // Ignore storage errors in restrictive environments
    }
  }, []);

  const setBranch = (id: BranchId) => {
    setSelectedBranch(id);
    try {
      localStorage.setItem('burger_house_branch', id);
    } catch {}
  };

  const handleSetPreviewMode = (val: boolean) => {
    setPreviewMode(val);
    try {
      localStorage.setItem('burger_house_preview_mode', String(val));
    } catch {}
  };

  const togglePreviewMode = () => {
    handleSetPreviewMode(!previewMode);
  };

  const openItemModal = (item: MenuItem) => {
    setActiveItemModal(item);
  };

  const closeItemModal = () => {
    setActiveItemModal(null);
  };

  const openOrderHandoff = (item?: MenuItem) => {
    setOrderHandoffModal({ open: true, item });
  };

  const closeOrderHandoff = () => {
    setOrderHandoffModal(null);
  };

  const currentBranch = BRANCHES[selectedBranch] || BRANCHES.nugegoda;

  return (
    <BranchContext.Provider
      value={{
        selectedBranch,
        setBranch,
        currentBranch,
        previewMode,
        setPreviewMode: handleSetPreviewMode,
        togglePreviewMode,
        activeItemModal,
        openItemModal,
        closeItemModal,
        orderHandoffModal,
        openOrderHandoff,
        closeOrderHandoff
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
}
