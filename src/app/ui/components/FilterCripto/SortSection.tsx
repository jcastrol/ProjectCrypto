import { Text, View } from "react-native";
import { CheckIcon, Select } from "native-base";
import { SortField, SortOrder, SortParams } from "../../../domain/Interfaces/FiltersCrypto";
import { styles } from "./FilterCripto";

export const SortSection: React.FC<{
  sortParams: SortParams;
  onSortChange: (field: SortField | string, order: SortOrder | string) => void;
}> = ({ sortParams, onSortChange }) => {
  return (
    <>
      <Text style={styles.title}>Sort By</Text>
      <View style={styles.sectionSort}>

        {/* Sort Field */}
        <Select
          selectedValue={sortParams.field}
          minWidth="150"
          accessibilityLabel="Choose Sort Field"
          placeholder="Choose Sort Field"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }}
          mt={1}
          onValueChange={(itemValue) => onSortChange(itemValue, sortParams.order)}
        >
          <Select.Item label="Name" value="name" />
          <Select.Item label="Price (USD)" value="priceUsd" />
          <Select.Item label="Volume 24h" value="volume24" />
        </Select>

        {/* Sort Order */}
        <Select
          selectedValue={sortParams.order}
          minWidth="150"
          accessibilityLabel="Choose Order"
          placeholder="Choose Order"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />
          }}
          mt={1}
          onValueChange={itemValue => onSortChange(sortParams.field, itemValue)}
        >
          <Select.Item label="Ascending" value="asc" />
          <Select.Item label="Descending" value="desc" />
        </Select>
      </View>
    </>
  );
};