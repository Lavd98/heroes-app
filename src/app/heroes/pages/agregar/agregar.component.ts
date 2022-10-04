import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  publishers = [
    {id:'DC Comics', desc: 'DC - Comics'},
    {id:'Marvel Comics', desc: 'Marvel - Comics'}
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {

    if( !this.router.url.includes('editar') ) {
      return
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroeById(id) )
    )
    .subscribe(data =>{
      this.heroe = data
    })

  }

  guardar() {
    if(this.heroe.superhero.trim().length === 0) {
      return;
    }

    if( this.heroe.id ) {
      this.heroesService.updateHeroe(this.heroe).subscribe(data =>{
        // this.heroe = data;
        this.mostrarSnak('Registro Actualizado');
      })
    }else{
      this.heroesService.addHeroes(this.heroe).subscribe(data => {
        this.router.navigate(['/heroes/editar', data.id ])
        this.mostrarSnak('Registro Creado');
      })
    }
  }

  borrar() {

    const dialog = this.matDialog.open( ConfirmarComponent, {
      width: '250px',
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe(
      (result) => {
        this.heroesService.deleteHeroe(this.heroe.id!).subscribe( data => {
        this.router.navigate(['/heroes']);
        });
      }
    );


    
  }

  mostrarSnak(mensaje: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2000
    });
  }

}
