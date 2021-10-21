/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Cria ou busca um banco de dados no aparelho.
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Salva alguma coisa no banco de dados do aparelho.
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  // Busca alguma coisa já salva no aparelho.
  public async get(key: string){
    return await this._storage?.get(key);
  }

  // Deleta alguma coisa já salva no aparelho.
  public async remove(key: string){
    await this._storage?.remove(key);
  }

  public async getAll(){
    const lista: any[] = [];
    await this._storage.forEach((value, key, index) => {
      lista.push(value);
    });
    return lista;
  }

}
