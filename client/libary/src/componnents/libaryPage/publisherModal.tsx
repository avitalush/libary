import Swal from 'sweetalert2'
import { LibPublisher } from '../../interfaces'

export const publisherModal = ({
  publisher,
}: {
  publisher: LibPublisher | null
}) => {
  if (!publisher) return null

  const { name, address, email } = publisher

  Swal.fire({
    title: 'Publisher Details',
    html: `
            <div>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>Email:</strong> ${email}</p>
            </div>
        `,
    showConfirmButton: true,
  })
}
