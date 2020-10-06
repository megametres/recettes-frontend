import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from '../../recipe';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent implements OnInit {
  public recipe: Recipe;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
