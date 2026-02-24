import type { ElementType } from 'react';
import type { Film, Person, Planet, Starship, Vehicle, ChatMessage } from '@/types/swapi';

export interface StatCardProps {
  title: string;
  value: number;
  icon: ElementType;
  href: string;
  color: string;
  description: string;
}

export interface FilmCardProps {
  film: Film;
}

export interface CharacterCardProps {
  person: Person;
  onClick: () => void;
}

export interface CharacterModalProps {
  person: Person | null;
  open: boolean;
  onClose: () => void;
}

export interface PlanetCardProps {
  planet: Planet;
  onClick: () => void;
}

export interface StarshipCardProps {
  ship: Starship;
  onClick: () => void;
}

export interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: () => void;
}

export interface PlanetModalProps {
  planet: Planet | null;
  open: boolean;
  onClose: () => void;
}

export interface MessageBubbleProps {
  message: ChatMessage;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export interface StatBadgeProps {
  label: string;
  value: string;
  className?: string;
}

export type Stat = { label: string; value: string | number | React.JSX.Element };
export type ExtraInfo = { label: string; value: string | number | React.JSX.Element };

export interface DetailModalProps {
  title: string;
  stats: Stat[];
  extras?: ExtraInfo[];
  open: boolean;
  onClose: () => void;
}