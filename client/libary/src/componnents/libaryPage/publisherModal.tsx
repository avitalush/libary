import Swal from 'sweetalert2';
import {  LibPublisher } from '../../interfaces';

const PublisherModal = ({ open }: { open: LibPublisher }) => {
    if (!open) return null;
  

  const { name, address, email } = open;

  Swal.fire({
    title: 'Publisher Details',
    html: `
      <div>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Email:</strong> ${email}</p>
      </div>
    `,
    showCancelButton: false,
    confirmButtonText: 'Close',
  });

  return null;
};

export default PublisherModal;
