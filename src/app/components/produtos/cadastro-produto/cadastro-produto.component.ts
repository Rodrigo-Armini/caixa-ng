import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../../models/produto';


@Component({
  selector: 'app-cadastro-produto',
  imports: [FormsModule],
  templateUrl: './cadastro-produto.component.html',
  styleUrl: './cadastro-produto.component.css'
})
export class CadastroProdutoComponent {
  // Toda vez que utilizar [(ngModel)] é obrigatório importar FormsModule
  // ngModel é a forma que fazemos a ligação de algum campo com uma variável
  proximoId: number = 0;

  // idParaEditar é uma variável do tipo number que é nullable, ou seja, ela pode ou n ter valor
  idParaEditar?: number;

  nome: string = "";
  valor: number = 0;
  produtos: Array<Produto> = [];

  salvarProduto() {
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
      this.cadastrarProduto();
    } else {
      this.editarProduto();
    }

    this.nome = "";
    this.valor = 0;
    // alert(this.nome);
  }

  editarProduto() {
    let indiceProduto = this.produtos.findIndex(x => x.id == this.idParaEditar);
    this.produtos[indiceProduto].nome = this.nome;

    this.idParaEditar = undefined;
  }

  cadastrarProduto() {
    // Incrementar a variável proximoId
    // this.proximoId = this.proximoId + 1;
    // this.proximoId += 1;
    this.proximoId++;

    let produto = new Produto(this.proximoId, this.nome);

    // como adicionar um elemento em uma lista de string em ts
    this.produtos.push(produto);
  }

  apagar(produto: Produto) {
    let confirmacao = confirm(`Deseja realmente apagar o produto '${produto.nome}'?`);
    if (confirmacao == false)
      return;

    // Buscando o indice da receita filtrando por id da receita que foi selecionada
    let indiceProduto = this.produtos.findIndex(x => x.id == produto.id);
    // Removendo a receita da lista receitas utilizando o indice, removendo 1 elemento da lista
    this.produtos.splice(indiceProduto, 1);
  }

  editar(produto: Produto) {
    this.nome = produto.nome;
    this.idParaEditar = produto.id;
  }
}
