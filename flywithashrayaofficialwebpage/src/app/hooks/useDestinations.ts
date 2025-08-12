"use client";

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Destination } from '../types/common';

export const useDestinations = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const destinationsQuery = query(collection(db, 'destinations'), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(destinationsQuery);
        
        const destinationsData: Destination[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          destinationsData.push({
            id: parseInt(doc.id) || destinationsData.length + 1,
            title: data.title || '',
            description: data.description || '',
            price: data.price || '',
            image: data.image || '',
          });
        });

        setDestinations(destinationsData);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading, error };
};
