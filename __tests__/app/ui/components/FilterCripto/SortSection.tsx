import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { SortSection } from '../../../../../src/app/ui/components/FilterCripto';
import { SortField, SortOrder } from '../../../../../src/app/domain/Interfaces/FiltersCrypto';
import { NativeBaseProvider } from 'native-base';

const AllTheProviders: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };
  return <NativeBaseProvider initialWindowMetrics={inset}>{children}</NativeBaseProvider>;
};
describe('SortSection', () => {
  it('should render correctly', () => {
    const sortParams = {
      field: 'name' as SortField,
      order: 'asc' as SortOrder,
    };
    const onSortChange = jest.fn();

    const { getByText, getByPlaceholderText } = render(<AllTheProviders>
      <SortSection sortParams={sortParams} onSortChange={onSortChange} />
    </AllTheProviders>
    );

    const titleText = getByText('Sort By');
    expect(titleText).toBeTruthy();

    const chooseSortFieldSelect = getByPlaceholderText('Choose Sort Field');
    expect(chooseSortFieldSelect).toBeTruthy();

    const chooseOrderSelect = getByPlaceholderText('Choose Order');
    expect(chooseOrderSelect).toBeTruthy();
  });

  it('should call onSortChange correctly when changing Sort Field Select value', () => {
    const sortParams = {
      field: 'name' as SortField,
      order: 'asc' as SortOrder,
    };
    const onSortChange = jest.fn();

    const { getByPlaceholderText } = render(
      <AllTheProviders>
        <SortSection sortParams={sortParams} onSortChange={onSortChange} />
      </AllTheProviders>
    );

    const chooseSortFieldSelect = getByPlaceholderText('Choose Sort Field');
    fireEvent(chooseSortFieldSelect, 'onValueChange', 'priceUsd');

    expect(onSortChange).toHaveBeenCalledTimes(1);
    expect(onSortChange).toHaveBeenCalledWith('priceUsd', sortParams.order);
  });

  it('should call onSortChange correctly when changing Sort Order Select value', () => {
    const sortParams = {
      field: 'name' as SortField,
      order: 'asc' as SortOrder,
    };
    const onSortChange = jest.fn();

    const { getByPlaceholderText } = render(
      <AllTheProviders>
        <SortSection sortParams={sortParams} onSortChange={onSortChange} />
      </AllTheProviders>
    );

    const chooseOrderSelect = getByPlaceholderText('Choose Order');
    fireEvent(chooseOrderSelect, 'onValueChange', 'desc');

    expect(onSortChange).toHaveBeenCalledTimes(1);
    expect(onSortChange).toHaveBeenCalledWith(sortParams.field, 'desc');
  });

});
