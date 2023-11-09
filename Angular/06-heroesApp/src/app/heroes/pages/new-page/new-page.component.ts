import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true } ),
    publisher: new FormControl<Publisher>( Publisher.DCComics ),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_image: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService:HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

    // Angular material
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    if ( !this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(
        switchMap( ({id}) => this.heroesService.getHeroById(id) ),
      ).subscribe( hero => {
        if ( !hero ) return this.router.navigateByUrl('/')

        this.heroForm.reset( hero );
        return;
      })
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero
    return hero;
  }

  onSubmit(): void {
    if ( this.heroForm.invalid ) return;

    if ( this.currentHero.id ) {
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
          this.showSnackBar(`${ hero.superhero } updated!`)
        });

        return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        this.showSnackBar(`${ hero.superhero } created!`)
        this.router.navigate(['/heroes/edit', hero.id ])
        // TODO: mostrar snackbar, y navegar a /heroes/edit/ hero.id
      })

  }

  onDeletehero(){
    if ( !this.currentHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open( ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id )),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.showSnackBar(`${ this.currentHero.superhero } deleted`);
        this.router.navigateByUrl('/')
      });

    // dialogRef.afterClosed().subscribe( result => {
    //   if ( !result ) return;

    //   this.heroesService.deleteHeroById( this.currentHero.id )
    //     .subscribe( wasDeleted => {
    //       if ( wasDeleted ) {
    //         this.showSnackBar(`${ this.currentHero.superhero } deleted`);
    //         this.router.navigateByUrl('/')
    //       }
    //     });
    // });
  }

  showSnackBar( message: string ): void {
    this.snackbar.open( message, 'Aceptar', {
      duration: 2500,
    })
  }


}
