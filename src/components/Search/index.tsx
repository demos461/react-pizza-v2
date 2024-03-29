import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './search.module.scss';
import { useDebounce } from '../../hooks/useDebounce';
import { setSearch } from '../../store/slices/filterSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useAppDispatch();

  const debounced = useDebounce<string>(searchValue);

  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearch(''));
    setSearchValue('');
    inputRef.current?.focus();
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  useEffect(() => {
    dispatch(setSearch(debounced));
  }, [dispatch, debounced]);

  return (
    <div className={styles.root}>
      <svg
        className={styles.searchIcon}
        enableBackground='new 0 0 32 32'
        id='Editable-line'
        version='1.1'
        viewBox='0 0 32 32'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle
          cx='14'
          cy='14'
          fill='none'
          id='XMLID_42_'
          r='9'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='2'
        />
        <line
          fill='none'
          id='XMLID_44_'
          stroke='#000000'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='2'
          x1='27'
          x2='20.366'
          y1='27'
          y2='20.366'
        />
      </svg>
      <input
        ref={inputRef}
        className={styles.input}
        value={searchValue}
        onChange={onSearchChange}
        type='text'
        placeholder={'Поиск пиццы...'}
      />
      <svg
        onClick={onClickClear}
        className={styles.closeIcon}
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z' />
      </svg>
    </div>
  );
};
