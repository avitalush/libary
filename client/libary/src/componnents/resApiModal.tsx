import Swal from 'sweetalert2';

interface AlertProps {
  isError: boolean;
  message: string;
}

export const showAlert = (props: AlertProps): void => {
  const { isError, message } = props;
  const icon = isError ? 'error' : 'success';

  Swal.fire({
    icon,
    title: isError ? 'Oops...' : 'Success',
    text: message,
    showConfirmButton: false,
    timer: 1500
  });
};

export default showAlert;
