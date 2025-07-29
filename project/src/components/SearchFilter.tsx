import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

type FilterOption = {
  label: string;
  value: string;
};

type SearchFilterProps = {
  placeholder?: string;
  onSearch: (query: string) => void;
  filters?: {
    options: FilterOption[];
    onFilter: (value: string) => void;
  }[];
};

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  placeholder = 'Search...',
  onSearch,
  filters = [] 
}) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 bg-gray-700 py-2 pl-10 pr-10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {filters.length > 0 && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </form>

      {showFilters && filters.length > 0 && (
        <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {filters.map((filter, index) => (
              <div key={index} className="px-4 py-2">
                <div className="mb-2 text-sm font-medium text-white">{filter.options[0]?.label.split(':')[0]}</div>
                <div className="space-y-1">
                  {filter.options.map((option) => (
                    <button
                      key={option.value}
                      className="block w-full text-left px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md"
                      onClick={() => {
                        filter.onFilter(option.value);
                        setShowFilters(false);
                      }}
                    >
                      {option.label.split(':')[1] || option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;