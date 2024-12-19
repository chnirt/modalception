import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {View, Modal, StyleSheet} from 'react-native';

export interface ModalceptionProps {
  level?: number;
  maxLevel?: number;
}

export interface ModalceptionMethods {
  show: (customUI: React.ReactNode) => void;
  hide: () => void;
  getModalVisibility: () => boolean;
}

// Modalception component
const Modalception = forwardRef<ModalceptionMethods, ModalceptionProps>(
  (props, ref) => {
    const {level = 1, maxLevel = 3} = props; // Default recursion level is 1
    const modalceptionRef = useRef<ModalceptionMethods | null>(null);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [modalContent, setModalContent] = useState<ReactNode>(null);

    // Function to show modal with custom UI
    const show = useCallback(
      (customUI: ReactNode) => {
        if (level > maxLevel) {
          setModalVisible(false); // Close modal if the level exceeds maxLevel
          return;
        }
        if (isModalVisible) {
          modalceptionRef.current?.show(customUI); // Call show on the next level of modal
          return;
        }
        setModalContent(customUI); // Set custom UI content
        setModalVisible(true); // Show modal
      },
      [isModalVisible, level, maxLevel],
    );

    // Function to hide modal
    const hide = useCallback(() => {
      if (!isModalVisible) {
        return;
      }
      const modalVisibility = modalceptionRef.current?.getModalVisibility();
      if (modalVisibility) {
        modalceptionRef.current?.hide(); // Hide next level modal if visible
        return;
      }
      setModalVisible(false); // Hide the current modal
    }, [isModalVisible]);

    // Function to check modal visibility
    const getModalVisibility = useCallback(() => {
      return isModalVisible;
    }, [isModalVisible]);

    // Expose methods for controlling the modal via the parent
    useImperativeHandle(
      ref,
      () => ({
        show,
        hide,
        getModalVisibility,
      }),
      [show, hide, getModalVisibility],
    );

    return (
      <Modal
        key={['modal', level].join('-')}
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Render the custom UI content */}
            {modalContent ? modalContent : null}
          </View>
        </View>

        <Modalception
          ref={modalceptionRef}
          level={level + 1} // Increment recursion level for nested modals
          maxLevel={maxLevel} // Pass maxLevel to limit recursion depth
        />
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    flex: 1,
  },
});

export default Modalception;
