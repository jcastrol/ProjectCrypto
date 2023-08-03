import { render } from '@testing-library/react-native';
import React from 'react';
import Loading from '../../../../../src/app/ui/components/common/Loading';


describe('Loading', () => {
  it('renders correctly', () => {
    // Arrange & Act
    const { getByText } = render(<Loading />);

    // Assert
    const loadingText = getByText('Loading...');
    expect(loadingText).toBeDefined();
  });
});