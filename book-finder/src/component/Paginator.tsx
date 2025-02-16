import React from "react";
import "../styles/paginator.css";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage, 
  itemsPerPage, 
  setItemsPerPage 
}) => {
  return (
    <div className="paginator">
     
      <button 
        onClick={() => setCurrentPage(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Prev
      </button>

     
      {[...Array(totalPages)].map((_, index) => (
        <button 
          key={index} 
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}

     
      <button 
        onClick={() => setCurrentPage(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>

     
      <select 
        value={itemsPerPage} 
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </div>
  );
};

export default Paginator;
