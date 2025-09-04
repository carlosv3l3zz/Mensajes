import Swal from 'sweetalert2';

export const showAlert = (
  title: string,
  message: string
): Promise<boolean> => {
  return Swal.fire({
    html: `
      <div class="flex flex-col justify-center items-center gap-4">
        <h2 class="poppins-32 negro">${title}</h2>
        <p class="poppins-16 !font-normal gris-oscuro-3">${message}</p>
      </div>
    `,
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Continuar',
    reverseButtons: true,
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      popup: '!rounded-[20px] !w-[50%] !py-[60px] bg-white shadow-lg !min-w-[400px] !max-w-[800px]',
      confirmButton:
        'bg-rojo-perdida poppins-17 blanco px-4 py-2 rounded-[5px]',
      cancelButton:
        'poppins-17 gris-oscuro-3 px-4 py-2',
    },
  }).then((result) => {
    return result.isConfirmed; // true si le da a Eliminar, false si cancela
  });
};
