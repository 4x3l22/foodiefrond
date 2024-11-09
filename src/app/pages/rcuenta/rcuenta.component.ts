import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RcontrasenaService } from '../../service/rcontrasena/rcontrasena.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICorreoenviar } from '../../service/interface/ICorreoenviar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rcuenta',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './rcuenta.component.html',
  styleUrl: './rcuenta.component.css'
})
export class RcuentaComponent {

  formCorreo: FormGroup;

  constructor(
    private router: Router,
    private service: RcontrasenaService
  )
  {
    this.formCorreo = new FormGroup({
      correo : new FormControl('',[Validators.required])
    })
  }

  navigateTo(ruta: string){
    this.router.navigate([ruta]);
  }

  validarCorreo(){
    const ncorreo: ICorreoenviar = {
      correo: this.formCorreo.value.correo
    }

    this.service.validarCorreo(ncorreo).subscribe({
      next: (response) => {
        if(response === 'Correo verificado, usuario existe.') {
          Swal.fire({
            title: 'Exitoso',
            icon: 'success',
            text: 'El código fue enviado, revisa tu bandeja de entrada',
            confirmButtonText: 'Entendido'
          })
        }
      },
      error: (error) => {
        console.error('Error en la validación del correo:', error);
      }
    });

  }
}
