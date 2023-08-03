import { Text, TextInput, View } from "react-native";
import { FiltersCrypto } from "../../../domain/Interfaces/FiltersCrypto";
import { styles } from "./FilterCripto";


export const FilterSection: React.FC<{
  filters: FiltersCrypto;
  onChangeFilter: (field: keyof FiltersCrypto, value: number | undefined) => void;
}> = ({ filters, onChangeFilter }) => {
  return (
    <View style={styles.sectionFilter}>
      <Text style={styles.title}>Filters</Text>
      <TextInput
        style={styles.input}
        placeholder="Min Price (USD)"
        value={filters.minPriceUsd?.toString()}
        onChangeText={(value) => onChangeFilter('minPriceUsd', value ? parseFloat(value) : undefined)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Max Price (USD)"
        value={filters.maxPriceUsd?.toString()}
        onChangeText={(value) => onChangeFilter('maxPriceUsd', value ? parseFloat(value) : undefined)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Min Volume 24h"
        value={filters.minVolume24?.toString()}
        onChangeText={(value) => onChangeFilter('minVolume24', value ? parseFloat(value) : undefined)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Max Volume 24h"
        value={filters.maxVolume24?.toString()}
        onChangeText={(value) => onChangeFilter('maxVolume24', value ? parseFloat(value) : undefined)}
        keyboardType="numeric"
      />

    </View>
  );
};
