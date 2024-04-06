import React, { useState } from 'react';
import MUIPagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
  pageCount: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pageCount, onPageChange}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    onPageChange(value);
  };

  // TODO: change primary color
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center" marginTop={2} marginBottom={2}>
      <MUIPagination
        count={pageCount}
        page={currentPage}
        color="primary"
        onChange={handleChange}
      />
    </Stack>
  );
};

export default Pagination;
