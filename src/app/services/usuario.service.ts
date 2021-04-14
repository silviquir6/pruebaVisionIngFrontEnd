import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url= environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


 
  constructor(private http : HttpClient) { }

  crearusuario(formData: RegisterForm){

   
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  obtenerUsuarios(){
      const url= `${base_url}/usuarios`;
      return this.http.get<{usuarios: Usuario[] }>(url);

  }

  eliminarUsuario(usuario: Usuario){
    const url= `${base_url}/usuarios/${usuario._id}`;
    return this.http.delete(url);
  }
}
