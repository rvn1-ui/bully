import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export type ReportStatus = 'diterima' | 'diproses' | 'selesai';

export interface BullyingReport {
  id: string;
  reporter_name?: string;
  is_anonymous: boolean;
  victim_name: string;
  perpetrator_name?: string;
  location: string;
  date: string;
  description: string;
  evidence_url?: string;
  status: ReportStatus;
  created_at: string;
  follow_up?: string;
  siswa_id: string;
}

export function useReports() {
  const [reports, setReports] = useState<BullyingReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReports = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reports:', error);
    } else {
      setReports(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReports();

    // Real-time subscription
    const channel = supabase
      .channel('reports-changes')
      .on('postgres_changes' as any, { event: '*', table: 'reports' }, () => {
        fetchReports();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addReport = async (report: Omit<BullyingReport, 'id' | 'status' | 'created_at'>) => {
    const { data, error } = await supabase
      .from('reports')
      .insert([{
        ...report,
        status: 'diterima'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error adding report:', error);
      throw error;
    }
    return data;
  };

  const updateReportStatus = async (id: string, status: ReportStatus, followUp?: string) => {
    const updateData: any = { status };
    if (followUp) updateData.follow_up = followUp;

    const { error } = await supabase
      .from('reports')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  };

  return { reports, isLoading, addReport, updateReportStatus, refreshReports: fetchReports };
}
