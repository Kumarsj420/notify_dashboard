import React from 'react';
import { ArrowUpDown } from 'lucide-react';
// Base Table component

export const TableStructure = ({ 
  children, 
  className = '' ,
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <div className={` ${className} py-5 bg-white rounded-2xl ring-1 ring-sc-200 shadow-lg shadow-sc-300/70`}>
      {/* <h1 className="text-xl font-bold mb-5 px-6"> {title} </h1> */}
      {children}
    </div>
  );
};

export const Table = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        {children}
      </table>
    </div>
  );
};

// Table Header component
export const TableHeader = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <thead className={`bg-gray-100/90 border-b border-gray-200  ${className}`}>
      {children}
    </thead>
  );
};

// Table Body component
export const TableBody = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  );
};

// Table Row component
export const TableRow = ({ 
  children, 
  className = '',
  onClick
}: { 
  children: React.ReactNode; 
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <tr 
      className={`border-b border-gray-200/90  transition-colors even:bg-sc-50 ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

// Table Head Cell component (for column titles)
export const TableHead = ({ 
  children, 
  className = '',
  sortable = false,
  onSort
}: { 
  children: React.ReactNode; 
  className?: string;
  sortable?: boolean;
  onSort?: () => void;
}) => {
  return (
    <th 
      className={`px-6 py-4.5 text-center text-xs font-bold text-sc-900 capitalize tracking-wider border-t border-gray-200/90 ${sortable ? 'cursor-pointer select-none' : ''} ${className}`}
      onClick={sortable ? onSort : undefined}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortable && (
          <ArrowUpDown size={14} className='text-sc-400 hover:text-p-500' />
        )}
      </div>
    </th>
  );
};

// Table Cell component (for data cells)
export const TableCell = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <td className={`px-6 py-4 text-sm text-gray-900 ${className}`}>
      {children}
    </td>
  );
};

// Table Footer component
export const TableFooter = ({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  return (
    <tfoot className={`bg-white border-t border-gray-200 ${className}`}>
      {children}
    </tfoot>
  );
};

// Pagination component for footer
export const TablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  className = ''
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults?: number;
  className?: string;
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className={`flex items-center justify-between px-6 pt-5 ${className}`}>
      {totalResults && (
        <div className="text-sm text-sc-600/90">
          Showing 1 to 3 of {totalResults.toLocaleString()} results
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {renderPageNumbers().map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md cursor-pointer ${
                currentPage === page
                  ? 'bg-linear-to-r from-amber-500 to-orange-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        ))}
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};