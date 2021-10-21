import { StorageService } from './../services/storage.service';
import { Usuario } from './../models/Usuario';
import { CpfValidator } from './../validators/cfp-validator';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

//Importação para utilizar formulários do Angular
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { comparaValidator } from '../validators/compara-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  formCadastro: FormGroup;

  mensagens = {
    nome: [
      { tipo: 'required', mensagem: 'O campo Nome é Obrigatório!' },
      { tipo: 'minlength', mensagem: 'O Nome precisa ter pelo menos 3 caracteres!' }
    ],
    email: [
      { tipo: 'required', mensagem: 'O campo E-mail é obrigatório.' },
      { tipo: 'email', mensagem: 'E-mail Inválido.' },
    ],
    cpf: [
      { tipo: 'required', mensagem: 'O campo CPF é obrigatório.' },
      { tipo: 'invalido', mensagem: 'CPF Inválido.' },
    ],
    dataNascimento: [
      { tipo: 'required', mensagem: 'O campo Data de Nascimento é obrigatório.' }
    ],
    senha: [
      { tipo: 'required', mensagem: 'O campo Senha é obrigatório.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.' },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caracteres.' }
    ],
    confirmaSenha: [
      { tipo: 'required', mensagem: 'É obrigatório confirmar senha.' },
      { tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres.' },
      { tipo: 'maxlength', mensagem: 'A senha deve ter no máximo 8 caracteres.' },
      { tipo: 'comparacao', mensagem: 'Deve ser igual a senha.' }
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    private storageService: StorageService,
    public alertController: AlertController,
    public route: Router
    ) {
    //Montar a estrutura do Formulário
    this.formCadastro = formBuilder.group({
      //valor padrão entra na primeira aspas
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      cpf: ['', Validators.compose([Validators.required, CpfValidator.cpfValido])],
      dataNascimento: ['', Validators.required],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
      confirmaSenha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(8)])],
    }, {
      validator: comparaValidator('senha', 'confirmaSenha')
    });
  }

  salvarCadastro() {
    console.log(this.formCadastro.valid);

    if (this.formCadastro.valid) {

      const user = new Usuario();

      user.nome = this.formCadastro.value.nome;
      user.email = this.formCadastro.value.email;
      user.cpf = this.formCadastro.value.cpf;
      user.dataNascimento = this.formCadastro.value.dataNascimento;
      user.senha = this.formCadastro.value.senha;

      this.storageService.set(user.email, user);
      console.log('User:', user);

      this.exibirMensagem(user.nome + ' salvo com sucesso!');

      this.route.navigateByUrl('/tabs/tab2');
    }
    else {
      this.exibirMensagem('Formulário inválido');
    }
  }

  async exibirMensagem(mensagem: string) {
    const alert = await this.alertController.create({
      header: 'SISTEMA',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }

}
