import { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Subscription } from 'rxjs';
import { SubjectManager } from '../../data/models/SubjectManager';

interface Props {
  children: React.ReactNode;
}

/* The code `export const dialogOpenSubject$ = new SubjectManager<boolean>();
export const dialogCloseSubject$ = new SubjectManager<boolean>();` is creating two instances of the
`SubjectManager` class and exporting them as constants. These instances are used as subjects for
opening and closing the modal dialog. They can be subscribed to and triggered to notify subscribers
when the dialog should be opened or closed. */

export const dialogOpenSubject$ = new SubjectManager<boolean>();
export const dialogCloseSubject$ = new SubjectManager<boolean>();


/**
 * The above code defines a custom modal component in TypeScript React that can be used to display a
 * modal with a fade animation and a transparent background.
 * @param {Props}  - - `children`: The content to be displayed inside the modal.
 * @returns The `CustomModal` component is being returned.
 */
const CustomModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  let openSubject$ = new Subscription();
  let closeSubject$ = new Subscription();

  useEffect(() => {
    openSubject$ = dialogOpenSubject$.getSubject.subscribe(() => handleClickOpen());
    closeSubject$ = dialogCloseSubject$.getSubject.subscribe(() => handleClose());
    return () => {
      openSubject$.unsubscribe();
      closeSubject$.unsubscribe();
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleExit = () => {
    dialogCloseSubject$.setSubject = false;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={open}
      onRequestClose={handleExit}
      testID='modal-Custom'
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
});

export default CustomModal;