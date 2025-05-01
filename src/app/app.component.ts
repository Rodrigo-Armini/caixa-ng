import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroReceitaComponent } from './components/receitas/cadastro-receita/cadastro-receita.component';
import { CadastroProdutoComponent } from './components/produtos/cadastro-produto/cadastro-produto.component';

@Component({
  selector: 'aplicacao-root',
  imports: [RouterOutlet, CadastroReceitaComponent, CadastroProdutoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'caixa-ng';
}
