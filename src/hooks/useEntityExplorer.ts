import { useCallback, useEffect, useMemo, useState } from 'react';
import type { EntityType } from '@/types/swapi';
import type { DetailModalProps, Stat, ExtraInfo } from '@/types/components';

type DetailData = Pick<DetailModalProps, 'title' | 'stats' | 'extras'>;

interface UseEntityExplorerOptions<T> {
  entity: EntityType;
  buildDetail: (item: T | null) => DetailData;
  itemsPerPage?: number;
}

export interface EntityExplorerState<T> {
  items: T[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  totalCount: number;
  totalPages: number;
  searchQuery: string;
  handleSearch: (query: string) => void;
  selected: T | null;
  isModalOpen: boolean;
  openModalFor: (item: T) => void;
  closeModal: () => void;
  detail: DetailData;
}

export function useEntityExplorer<T>({
  entity,
  buildDetail,
  itemsPerPage = 10,
}: UseEntityExplorerOptions<T>): EntityExplorerState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = useCallback(
    async (p: number, query: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(p) });
        if (query) params.append('search', query);
        const res = await fetch(`/api/swapi/${entity}?${params.toString()}`);
        const data = await res.json();
        setItems(Array.isArray(data.results) ? data.results : []);
        setTotalCount(typeof data.count === 'number' ? data.count : 0);
      } catch (e) {
        // Keep behaviour consistent: log and rely on callers to show any error UI.
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [entity],
  );

  useEffect(() => {
    const delay = searchQuery ? 400 : 0;
    const t = setTimeout(() => {
      void fetchData(page, searchQuery);
    }, delay);
    return () => clearTimeout(t);
  }, [page, searchQuery, fetchData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const openModalFor = (item: T) => {
    setSelected(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));

  const detail = useMemo(() => buildDetail(selected), [selected, buildDetail]);

  return {
    items,
    loading,
    page,
    setPage,
    totalCount,
    totalPages,
    searchQuery,
    handleSearch,
    selected,
    isModalOpen,
    openModalFor,
    closeModal,
    detail,
  };
}

