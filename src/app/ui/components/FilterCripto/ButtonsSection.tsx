import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./FilterCripto";

export const ButtonsSection: React.FC<{
    onApplyFilters: () => void;
    onCancel: () => void;
  }> = ({ onApplyFilters, onCancel }) => {
    return (
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onApplyFilters}>
          <Text style={styles.buttonText}>Apply Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };