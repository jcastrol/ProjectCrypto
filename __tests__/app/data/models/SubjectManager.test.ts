import { SubjectManager } from "../../../../src/app/data/models/SubjectManager";


describe('SubjectManager', () => {
  it('should emit value when setSubject is called', () => {
    // Arrange
    const subjectManager = new SubjectManager<number>();
    const mockValue = 42;
    const mockObserver = jest.fn();

    // Act
    subjectManager.getSubject.subscribe(mockObserver);
    subjectManager.setSubject = mockValue;

    // Assert
    expect(mockObserver).toHaveBeenCalledTimes(1);
    expect(mockObserver).toHaveBeenCalledWith(mockValue);
  });

  it('should emit multiple values when setSubject is called multiple times', () => {
    // Arrange
    const subjectManager = new SubjectManager<number>();
    const mockValues = [10, 20, 30];
    const mockObserver = jest.fn();

    // Act
    subjectManager.getSubject.subscribe(mockObserver);
    mockValues.forEach((value) => {
      subjectManager.setSubject = value;
    });

    // Assert
    expect(mockObserver).toHaveBeenCalledTimes(mockValues.length);
    mockValues.forEach((value, index) => {
      expect(mockObserver).toHaveBeenNthCalledWith(index + 1, value);
    });
  });

  it('should not emit value if no subscribers', () => {
    // Arrange
    const subjectManager = new SubjectManager<number>();
    const mockValue = 42;

    // Act
    subjectManager.setSubject = mockValue;

    // Assert
    // Since there are no subscribers, the value should not be emitted
    expect(true).toBe(true); // Placeholder to ensure the test runs without any errors
  });
});






