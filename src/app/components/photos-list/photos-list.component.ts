import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { PhotoService } from "../../services/photo.service";
import { Photo } from "../../interfaces/Photo";

@Component({
  selector: "app-photos-list",
  templateUrl: "./photos-list.component.html",
  styleUrls: ["./photos-list.component.css"],
})
export class PhotosListComponent implements OnInit {
  photos: Photo[] = [];
  search: string;

  constructor(private photoService: PhotoService, private router: Router) {}

  ngOnInit() {
    // //implementacino de metodo service
    // this.photoService.getPhotos().subscribe(
    //   (res) => {
    //     this.photos = res;
    //   },
    //   (err) => console.log(err)
    // );
    this.loadProduct();
  }

  selectedCard(id: string) {
    this.router.navigate(["/photos", id]);
  }

  // Metodo para buscar el producto por nombre
  loadProduct() {
    console.log("Eso busco: " + this.search);

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
}
