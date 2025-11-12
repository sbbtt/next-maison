import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Stay } from '@/types';

export function useStays() {
  return useQuery({
    queryKey: ['stays'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stays')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Stay[];
    },
  });
}
