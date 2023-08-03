import React from 'react';
import CustomModal, { dialogCloseSubject$, dialogOpenSubject$ } from '../../../../src/app/ui/containers/CustomModal';
import { fireEvent, render } from '@testing-library/react-native';
import { View, Text } from 'react-native'

describe('CustomModal', () => {
  it('should render correctly when open', () => {
    const { getByTestId, queryByTestId } = render(
      <CustomModal>
        <View testID="modalContent">
          <Text>Modal Content</Text>
        </View>
      </CustomModal>
    );

    // Initially, the modal should be closed, so the modal content should not be present
    const modalContent = queryByTestId('modalContent');
    expect(modalContent).toBeNull();

    // Trigger the dialogOpenSubject$ to open the modal
    dialogOpenSubject$.setSubject = true;

    // After opening, the modal content should be present
    const openModalContent = getByTestId('modalContent');
    expect(openModalContent).toBeTruthy();
  });

  it('should close correctly when close subject is triggered', () => {
    const { getByTestId, queryByTestId } = render(
      <CustomModal>
        <View testID="modalContent">
          <Text>Modal Content</Text>
        </View>
      </CustomModal>
    );

    // Open the modal first
    dialogOpenSubject$.setSubject = true;

    // After opening, the modal content should be present
    const openModalContent = getByTestId('modalContent');
    expect(openModalContent).toBeTruthy();

    // Now, trigger the dialogCloseSubject$ to close the modal
    dialogCloseSubject$.setSubject = true;

    // After closing, the modal content should not be present
    const closedModalContent = queryByTestId('modalContent');
    expect(closedModalContent).toBeNull();
  });
  it('should close when onRequestClose', () => {
    const { getByTestId, queryByTestId } = render(
      <CustomModal>
        <View testID="modalContent">
          <Text>Modal Content</Text>
        </View>
      </CustomModal>
    );

     // Open the modal first
     dialogOpenSubject$.setSubject = true;
     
    // After opening, the modal content should be present
    const openModalContent = getByTestId('modalContent');
    expect(openModalContent).toBeTruthy();

    // Open the modal first
    const modal =getByTestId('modal-Custom');
    fireEvent(modal,'onRequestClose');

    // After closing, the modal content should not be present
    const closedModalContent = queryByTestId('modalContent');
    expect(closedModalContent).toBeNull();
  });
});
