import { Box, Modal } from "@mui/material";
import React from "react";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  handleClose: () => void;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = (props) => {
  const { open, handleClose, children } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;