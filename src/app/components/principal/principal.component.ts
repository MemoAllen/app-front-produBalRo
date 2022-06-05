import { Component, OnInit, Renderer2, Inject  } from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Router } from '@angular/router'

import { PhotoService } from '../../services/photo.service'
import { Photo } from '../../interfaces/Photo'




@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  constructor(    private photoService: PhotoService,
    private router: Router,  @Inject(DOCUMENT) private _document: Document,private vps: ViewportScroller) {
  }

  photos: Photo[] = [];
  search: string;



  selectedCard(id: string) {
    this.router.navigate(['/products', id]);
  }



  ngOnInit() {


    const wordWait = 3000;
    this.verb = this.verbList[Math.floor(Math.random() * this.verbList.length)];

    setInterval(() => this.updateWord(), wordWait);

        //implementacino de metodo service

        const filter =
        (typeof this.search == "string" && this.search.length > 0)
          ? `?searchBy=${this.search}`
          : "";

          this.photoService.getPhotos(filter).subscribe(
            (productsSearch)=>{
              this.photos=productsSearch
            },(error)=>{
              console.error(error);
            }
          )

  }


  name = 'Angular';
  verbList = ["QUESOS", "CREMA", "YOGURTH"];
  verb = '';


  updateWord() {
    this.verb = this.verbList[Math.floor(Math.random() * this.verbList.length)];
  }


  // scroll(){
  //   window.scrollTo(window.scrollX, window.scrollY + 50);
  // }


  scroll() {
    this.vps.scrollToPosition([0, 1000]);
  }

  scrollbarTop(){
    window.scroll(0,0);
  }

}
