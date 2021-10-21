import { StorageService } from './../services/storage.service';
import { Component } from '@angular/core';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  listaUsuarios: Usuario[] = [];

  constructor(public storageService: StorageService) {}

  ionViewDidEnter() {
    this.buscarUsuarios();
  }

  async buscarUsuarios() {
    this.listaUsuarios = await this.storageService.getAll();
  }

  async removerUsuario(key: string){
    await this.storageService.remove(key);
    this.buscarUsuarios();
  }

}
