import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RcontrasenaService } from '../../service/rcontrasena/rcontrasena.service';

@Component({
  selector: 'app-rcuenta',
  standalone: true,
  imports: [],
  templateUrl: './rcuenta.component.html',
  styleUrl: './rcuenta.component.css'
})
export class RcuentaComponent {

  constructor(private router: Router, private service: RcontrasenaService){}

  navigateTo(ruta: string){
    this.router.navigate([ruta]);
  }

  validarCorreo(correo: string){
    this.service.validarCorreo(correo).subscribe({
      next: (response) => {
        if(response == 'OK'){
          console.log('Correo valido');
        }
      }
    })
  }
}
