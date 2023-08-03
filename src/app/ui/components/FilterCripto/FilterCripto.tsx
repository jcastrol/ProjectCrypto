import { StyleSheet, View } from "react-native";
import { FiltersCrypto, SortField, SortOrder, SortParams } from "../../../domain/Interfaces/FiltersCrypto";
import { useCallback, useState } from "react";
import { ButtonsSection } from "./ButtonsSection";
import { SortSection } from "./SortSection";
import { FilterSection } from "./FilterSection";

interface Props {
  onApplyFilters: (filters: FiltersCrypto, sortParams: SortParams) => void;
  onCancel:()=>void
}

const CryptoFilterModal: React.FC<Props> = ({ onApplyFilters, onCancel }) => {
  const [filters, setFilters] = useState<FiltersCrypto>({});
  const [sortParams, setSortParams] = useState<SortParams>({
    field: 'id',
    order: 'asc',
  });

  const handleApplyFilters = useCallback(() => {
    onApplyFilters(filters, sortParams);
  },[filters,sortParams]);

  const handleCancel = useCallback(() => {
    onCancel()
  },[onCancel]);

  const handleChangeFilter = useCallback((field: keyof FiltersCrypto, value: number | undefined) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  },[setFilters]);

  const handleSortChange = useCallback((field: SortField | string, order: SortOrder | string) => {
    const validFields: SortField[] = ['name', 'priceUsd', 'volume24'];
    const validOrders: SortOrder[] = ['asc', 'desc'];

    if (validFields.includes(field as SortField) && validOrders.includes(order as SortOrder)) {
      setSortParams({ field: field as SortField, order: order as SortOrder });
    } else {
      console.error('Invalid "field" or "order" value.');
    }
  },[setSortParams]);

  return (
    <View >
      {/* Filter section */}
      <FilterSection filters={filters} onChangeFilter={handleChangeFilter} />

      {/* Sort section */}
      <SortSection sortParams={sortParams} onSortChange={handleSortChange} />

      {/* Buttons */}
      <ButtonsSection onApplyFilters={handleApplyFilters} onCancel={handleCancel} />
    </View>
  );
};

export const styles = StyleSheet.create({
  sectionSort:{
    justifyContent: 'center',
   
  },
  sectionFilter:{

  },
  container:{
    flex:1,
    padding:10,
    flexWrap:'wrap',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CryptoFilterModal;