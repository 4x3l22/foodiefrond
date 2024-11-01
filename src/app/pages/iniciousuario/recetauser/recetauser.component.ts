import { RecetarioService } from './../../../service/recetario/recetario.service';
import { IPublicacion } from './../../../service/interface/IPublicacion';
import { state } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IListaRecetas } from '../../../service/interface/IListaRecetas';
import { PublicacionService } from '../../../service/publicacion/publicacion.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IRecetario } from '../../../service/interface/IRecetario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recetauser',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './recetauser.component.html',
  styleUrl: './recetauser.component.css'
})
export class RecetauserComponent implements OnInit{

  id?:  number;
  recetaForm:  FormGroup;
  receta: IListaRecetas | undefined;
  compressedImageBase64: string | ArrayBuffer | null = null;
  user?: string;
  userId?: number;
  isFavorite: boolean = false;
  charCount: number = 0;
  maxChars: number = 1000;

  constructor(
    private service: PublicacionService,
    private router: Router,
    private serviceRecetario: RecetarioService,
    private toastr: ToastrService
  ){
    this.recetaForm = new FormGroup({
      titulo: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      foto:  new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    if (history.state && history.state.id) {
      this.receta = history.state;
    } else {
      console.log('No hay datos de receta disponibles.');
    }

    // Obtener el ID del usuario desde el localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.userId = user.loginDao.id; // Asumiendo que 'id' es la propiedad del usuario
      // alert(this.userId);
    } else {
      console.error('No se encontró el usuario en el localStorage');
    }

    this.updateCharCount()
  }

  save(recetaId: number): void {
    let img = this.recetaForm.get('foto')?.value;
    if(img){
      console.log('hay una imagen');
    }
    const datapubli: IPublicacion = {
      id: 0,
      titulo: this.recetaForm.get('titulo')?.value,
      descripcion: this.recetaForm.get('descripcion')?.value,
      foto: this.compressedImageBase64,  // Aquí se usa la imagen comprimida en Base64
      recetaId: recetaId,
      usuarioId: this.userId,
      estado: true,
      fechaCreo: new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino: null
    };

    // Enviar publicación al servicio
    this.service.save(datapubli).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'registro exitoso.',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['iniouser/homeuser']);
        console.log('Publicación guardada con éxito', response);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error',
          confirmButtonText: 'Intentar de nuevo'
        });
        console.error('Error al guardar la publicación', error);
      }
    });
  }

  // Método para seleccionar y procesar la imagen
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.compressImage(file, 0.7).then((compressedBase64) => {
        this.compressedImageBase64 = compressedBase64;
      });
    }
  }

  // Método para convertir la imagen a Base64 y comprimirla
  compressImage(file: File, quality: number): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const width = img.width;
          const height = img.height;
          canvas.width = width;
          canvas.height = height;

          // Dibujar la imagen en el canvas
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
          }

          // Convertir a Base64 comprimido
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);

          resolve(compressedBase64);
        };
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Leer el archivo como DataURL (Base64)
    });
  }

  navigateTo(ruta: string){
    this.router.navigate([ruta]);
  }

  guardarRecetario(recetaId: number){

    const data: IRecetario = {
      id: 0,
      usuarioId:  this.userId,
      recetaId: recetaId,
      estado: true,
      fechaCreo: new Date(),
      fechaModifico: this.id ? new Date() : null,
      fechaElimino:  null,
    }

    this.serviceRecetario.save(data).subscribe({
      next:  (data) => {
        this.toastr.success('Guadado en recetario','Guardado');
        this.isFavorite = true;
      },
      error: (error) =>{
        this.toastr.error('Error al guardar en recetario','Error');
      }
    })
  }

  updateCharCount(): void {
    const descripcionControl = this.recetaForm.get('descripcion');
    if (descripcionControl) {
      this.charCount = descripcionControl.value ? descripcionControl.value.length : 0;
    }
  }
}
