import { Component } from '@angular/core';
//Importação para utilizar formulários do Angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  formCadastro: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    //Montar a estrutura do Formulário
    this.formCadastro = formBuilder.group({
      //valor padrão entra na primeira aspas
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      cpf: ['', Validators.compose([Validators.required])],
      dataNascimento: ['', Validators.required],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
    });
  }

}
