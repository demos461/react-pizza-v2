import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { selectSort, setOrder, setSort, SortType } from '../store/slices/filterSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

const sortList: SortType[] = [
  { name: 'популярности', sortProperty: 'rating', order: 'asc' },
  { name: 'цене', sortProperty: 'price', order: 'asc' },
  { name: 'алфавиту', sortProperty: 'title', order: 'asc' },
];

export const Sort: React.FC = () => {
  const sort = useAppSelector(selectSort);
  const dispatch = useAppDispatch();

  const [activeSort, setActiveSort] = useState(sortList[0].name);
  const [isOpen, setIsOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  const onClickSortPopup = (obj: SortType) => {
    dispatch(setSort(obj));
    setActiveSort(obj.name);
    setIsOpen(false);
  };

  const onClickOrderArrow = () => {
    const order = sort.order === 'asc' ? 'desc' : 'asc';
    dispatch(setOrder(order));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        <div onClick={onClickOrderArrow}>
          <svg
            className={sort.order === 'desc' ? 'arrow__down' : ''}
            width='10'
            height='10'
            viewBox='0 0 10 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
              fill='#2C2C2C'
            />
          </svg>
          <b>Сортировка по:</b>
        </div>
        <span onClick={() => setIsOpen(!isOpen)}>{activeSort}</span>
      </div>
      {isOpen && (
        <div className='sort__popup'>
          <ul>
            {sortList.map(obj => (
              <li
                key={obj.sortProperty}
                className={obj.sortProperty === sort.sortProperty ? 'active' : undefined}
                onClick={() => onClickSortPopup(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
