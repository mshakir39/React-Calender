import styled from 'styled-components';

export const CalenderMainWrapper = styled.div`
  position: 'relative';
  width: auto;
  margin-top: 10px;
  > div {
    position: relative;
    > svg {
      position: absolute;
      right: 2%;
      top: 15%;
      color: #cf8597;
      font-size: 21px;
    }
    > input {
      width: -webkit-fill-available;
      height: 25px;
      border-radius: 3px;
      border-color: #cf8597;
      border-top-style: double;
      &:focus {
        outline: none;
        border-color: #ff3366;
        border-radius: 4px;
        border-width: 2px;
      }
      &:focus-visible {
        outline: none;
        border-color: #ff3366;
        border-radius: 4px;
        border-width: 2px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export const CalenderInnerWrapper = styled.div`
  width: -webkit-fill-available;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const DaysMainWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  > td {
    font-weight: 500;
  }
`;

export const HeaderMainWrapper = styled.div``;

export const HeaderInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;

  > svg {
    color: #ff3366;
    padding-top: 10px;
    cursor: pointer;
  }

  > svg:nth-child(1) {
    padding-left: 10px;
  }

  > svg:nth-child(3) {
    padding-right: 10px;
  }
`;

export const HeaderDaysWrapper = styled.div`
  display: flex;

  > div:nth-child(1) {
    padding-top: 7px;
  }

  > div:nth-child(2) {
    margin-left: 10px;
    margin-right: 10px;
    padding-top: 7px;
    color: #ff3366;
    font-weight: 500;
  }
`;

export const AddSubYear = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  > svg {
    font-size: 10px;
    color: #ff3366;
    padding-left: 2px;
    cursor: pointer;
  }
`;

export const StyledCellsRow = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 14px;
`;

export const CellsMainWrapper = styled.div`
  padding-bottom: 10px;
  .todayhasNumber {
    color: #ff3366;
    font-weight: 500;
    &:hover {
      background: #ff3366;
      color: white;
      border-radius: 10px;
    }
  }
  .todayhasNumberselected {
    color: #ff3366;
    font-weight: 500;
  }
  .hasNumber {
    &:hover {
      background: #ff3366;
      color: white;
      border-radius: 10px;
    }
  }
  .selected {
    color: #ff3366;
    font-weight: 500;
  }
`;
