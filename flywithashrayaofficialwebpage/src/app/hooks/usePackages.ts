"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Package } from '../types/common';

export const usePackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const packagesQuery = query(collection(db, 'packages'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(packagesQuery);
        
        const packagesData: Package[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          packagesData.push({
            id: parseInt(doc.id) || packagesData.length + 1,
            title: data.title || '',
            description: data.description || '',
            price: data.price || '',
            duration: data.duration || '',
            features: data.features || [],
            image: data.image || '',
            badge: data.badge || '',
          });
        });

        setPackages(packagesData);
      } catch (err) {
        console.error('Error fetching packages:', err);
        setError('Failed to load packages. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { packages, loading, error };
};
