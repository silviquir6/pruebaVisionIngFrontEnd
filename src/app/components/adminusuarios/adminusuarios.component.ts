import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminusuarios',
  templateUrl: './adminusuarios.component.html',
  styles: [
  ]
})
export class AdminusuariosComponent implements OnInit {

  forma :FormGroup;
  usuarios: Usuario [] = [];

  constructor(private fb : FormBuilder,
    private usuarioService : UsuarioService) { 

    this.crearFormulario(); 
  }

  crearUsuario(){
    console.log(this.forma);
    //validar si la forma es invalida
    if (this.forma.invalid){
      return;
    }
  //crear el usuario
this.usuarioService.crearusuario(this.forma.value).subscribe(resp =>{
  this.obtenerUsuarios();
 Swal.fire('Usuario ha sido Creado', 'El usuario se creó satisfactoriamente' , 'success');
  console.log(resp);
}, (err) => {
  console.log(err);
  //console.log(err.error.errors[0].msg)
//sweetalert error
Swal.fire('Error', err.error.msg, 'error' );
});
  }

  ngOnInit(): void {

    this.obtenerUsuarios();
   

  }

  obtenerUsuarios(){
    this.usuarioService.obtenerUsuarios()
    .subscribe( ({usuarios}) => {console.log(usuarios);
      this.usuarios= usuarios});
  }

  crearFormulario(){
    this.forma= this.fb.group({
          nombre: ['', [Validators.required, Validators.minLength(5) ] ],
          correo: ['', [Validators.required, Validators.pattern( '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]],
          password: ['', [Validators.required, Validators.minLength(5) ] ],
          rol: ['User'],
          estado: ['true']

    });
  }

  eliminarUsuario(usuario: Usuario){

    
    Swal.fire({
      title: 'Está seguro de borrar éste usuario?',
      text: `El usuario a borrar es ${ usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
       

          this.usuarioService.eliminarUsuario(usuario).subscribe(resp => {

            this.obtenerUsuarios();
            Swal.fire('Usuario borrado', `${usuario.nombre} fue eliminado correctamente.`, 'success')
          });
          //this.usuarioService.eliminarUsuario(usuario);
        
      }
    });


   
  }



 

}
