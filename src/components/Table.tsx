import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import Button from './Button';
// Base Table component

export const TableStructure = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={` ${className} py-5 bg-white rounded-2xl ring-1 ring-sc-200 shadow-lg shadow-sc-300/70`}>

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
  resLength,
  className = ''
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults?: number;
  resLength?: number;
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
      {totalResults && resLength && currentPage && (
        <div className="text-sm text-sc-600/90">
          Showing <span className='font-semibold text-sc-900'>{(resLength * (currentPage - 1)) + 1}</span>  to <span className='font-semibold text-sc-900'>{Math.min((resLength * (currentPage - 1)) + resLength, totalResults)}</span>  of <span className='font-semibold text-sc-900'>{totalResults.toLocaleString()} results</span>
        </div>
      )}

      <div className="flex items-stretch gap-2 pb-1.5">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          size='sm'
          variant='outline'
          className='h-max'
        >
          Previous
        </Button>

        {renderPageNumbers().map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <Button
              key={page}
              onClick={() => onPageChange(page as number)}
              variant={currentPage === page ? 'primary' : 'outline'}
              size='auto'
              className='px-3.5 py-2 text-sm aspect-square h-9'
            >
              {page}
            </Button>
          )
        ))}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size='sm'
          variant='outline'
          className='h-max'
        >
          Next
        </Button>
      </div>
    </div>
  );
};