import styled from 'styled-components';
import { Pagination } from 'react-bootstrap';

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: #ffffff;
  color: #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
  margin-top: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;

  td {
    padding: 10px;
    border: 1px solid #dee2e6;
  }

  th {
    background-color: #8b5a2b;
    color: #fff;
    padding: 10px;
    text-align: center;
    border: 1px solid #dee2e6;
  }

  tr {
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f8f9fa;
      color: #000000;
      transform: scale(1.01);
    }
  }
`;


export const StyledPagination = styled(Pagination)`
  justify-content: center;
  padding:0;
  bottom: 10px;
  left: 0;
  right: 0;
  align-item:center;
`;
