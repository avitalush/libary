import React, { useEffect } from 'react';
import Swal from 'sweetalert2';

interface SweetAlertProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const SweetAlertComponent: React.FC<SweetAlertProps> = ({ onConfirm, onCancel }) => {
  useEffect(() => {
    const showSweetAlert = async () => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to return this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, return it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
      });

      if (result.isConfirmed) {
        await Swal.fire({
          title: 'Returned!',
          text: 'Your book has been returned.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success',
          },
        });
        onConfirm();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        await Swal.fire({
          title: 'Cancelled',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-danger',
          },
        });
        onCancel();
      }
    };

    showSweetAlert();
  }, [onConfirm, onCancel]);

  return null;
};

export default SweetAlertComponent;
