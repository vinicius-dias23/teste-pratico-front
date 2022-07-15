import swal from 'sweetalert';
export const Excluir = (idUsuario) => {
    swal({
        title: "Excluir Registro",
        text: "Tem certeza que deseja excluir o usuário?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((deletar) => {
        if (deletar) {
          swal("Usuário deletado com sucesso!", {
            icon: "success",
          }).then(
            fetch('https://jsonplaceholder.typicode.com/users/' + idUsuario, {
            method: 'DELETE',
          })
            .then(
              document.getElementById(idUsuario).remove()
            )
          );
        }
      });
};