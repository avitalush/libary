import { useEffect } from 'react';
import Swal from 'sweetalert2';

interface CopiesComponentProps {
    onConfirm: (value: number) => void;
  }
  
  const CopiesComponent = ({ onConfirm }: CopiesComponentProps) => {
    useEffect(() => {
    const handleSwalOpen = async () => {
      const result = await Swal.fire({
        title: "Submit a number",
        input: "number",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        inputValidator: (value) => {
            return new Promise((resolve) => {
              const numValue = parseInt(value);
              if (isNaN(numValue) || numValue < 1) {
                resolve('Please enter a number greater than or equal to 1');
              } else {
                resolve();
              }
            });
          },
          preConfirm: (num) => {
            return new Promise((resolve, reject) => {
              const numValue = parseInt(num);
              if (isNaN(numValue)) {
                reject('Please enter a valid number');
              } else {
                resolve(numValue);
              }
            });
          },
          allowOutsideClick: () => !Swal.isLoading()
        });
      if (result.isConfirmed) {
        onConfirm(result.value);
      } 
    };

    handleSwalOpen();
  }, [onConfirm]);

  return null;
  };
export default CopiesComponent;
