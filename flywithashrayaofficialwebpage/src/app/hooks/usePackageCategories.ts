"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export interface PackageCategory {
  id: number;
  title: string;
  icon: string;
  description: string;
  highlights: string[];
  features: Array<{
    icon: string;
    text: string;
  }>;
  cta: string;
}

export const usePackageCategories = () => {
  const [categories, setCategories] = useState<PackageCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesQuery = query(collection(db, 'packageCategories'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(categoriesQuery);
        
        const categoriesData: PackageCategory[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          categoriesData.push({
            id: parseInt(doc.id) || categoriesData.length + 1,
            title: data.title || '',
            icon: data.icon || 'Globe',
            description: data.description || '',
            highlights: data.highlights || [],
            features: data.features || [],
            cta: data.cta || 'Learn More',
          });
        });

        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching package categories:', err);
        setError('Failed to load package categories. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
