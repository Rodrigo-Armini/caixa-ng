import { Component } from '@angular/core';
import { Receita } from '../../../models/receita';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro-receita',
  imports: [FormsModule],
  templateUrl: './cadastro-receita.component.html',
  styleUrl: './cadastro-receita.component.css'
})
export class CadastroReceitaComponent {
  proximoId: number = 0;

  // idParaEditar é uma variável do tipo number que é nullable, ou seja, ela pode ou n ter valor
  idParaEditar?: number;

  nome: string = "";
  valor: number = 0;
  receitas: Array<Receita> = [];

  salvarReceita() {
    if (this.nome.length < 3) {
      alert("Nome deve conter no mínimo 3 caracteres")
      return;
    }
    if (this.nome.length > 30) {
      alert("Nome deve conter no máximo 30 caracteres")
      return;
    }

    // "5490,29" => "5490.29", por isso é necessário fazer o replace
    let valor = parseFloat(this.valor.toString().replace(",", "."));
    // NaN é not a number, é recebido NaN quando o valor que é tentado converter para float 
    // não é um float válido
    if (Number.isNaN(valor)) {
      alert("Valor deve ser um número real");
      return;
    }
    if (valor <= 0) {
      alert("Valor deve ser maior que R$ 0,00");
      return;
    }

    if (this.idParaEditar == undefined) {
      this.cadastrarReceita();
    } else {
      this.editarReceita();
    }

    this.nome = "";
    this.valor = 0;
    // alert(this.nome);
  }

  editarReceita() {
    let indiceReceita = this.receitas.findIndex(x => x.id == this.idParaEditar);
    this.receitas[indiceReceita].nome = this.nome;
    this.receitas[indiceReceita].valor = this.valor;

    this.idParaEditar = undefined;
  }

  cadastrarReceita() {
    // Incrementar a variável proximoId
    // this.proximoId = this.proximoId + 1;
    // this.proximoId += 1;
    this.proximoId++;

    let receita = new Receita(this.proximoId, this.nome, this.valor);

    // como adicionar um elemento em uma lista de string em ts
    this.receitas.push(receita);
  }

  apagar(receita: Receita) {
    let confirmacao = confirm(`Deseja realmente apagar a receita '${receita.nome}'?`);
    if (confirmacao == false)
      return;

    // Buscando o indice da receita filtrando por id da receita que foi selecionada
    let indiceReceita = this.receitas.findIndex(x => x.id == receita.id);
    // Removendo a receita da lista receitas utilizando o indice, removendo 1 elemento da lista
    this.receitas.splice(indiceReceita, 1);
  }

  editar(receita: Receita) {
    this.nome = receita.nome;
    this.valor = receita.valor;
    this.idParaEditar = receita.id;
  }
}