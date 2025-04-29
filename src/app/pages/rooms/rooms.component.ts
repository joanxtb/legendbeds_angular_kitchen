import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  imports: [],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  IdProperty = this.route.snapshot.paramMap.get('id');

  // Or by an observable if the Id is gonna be changing dinamically in this component!
  //this.route.paramMap.subscribe(params => {    this.roomId = params.get('id');  });

  ngOnInit(): void {
    console.log({ IdProperty: this.IdProperty });
  }

}
