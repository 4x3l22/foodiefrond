import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RcontrasenaService } from '../../service/rcontrasena/rcontrasena.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICorreoenviar } from '../../service/interface/ICorreoenviar';

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
      correo : new FormControl('')
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
        if(response == 'OK'){
          console.log('Correo valido');
        }
      }
    })
  }
}
