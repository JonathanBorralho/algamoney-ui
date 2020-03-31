import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css'],
  preserveWhitespaces: true
})
export class PessoasPesquisaComponent implements OnInit {
  pessoas = [];
  constructor() { }

  ngOnInit(): void {
    this.pessoas = [
      {
        "id": 3,
        "version": 7,
        "nome": "Jonathan Sousa",
        "ativo": true,
        "endereco": {
            "logradouro": "Rua Bom Jesus",
            "numero": "571",
            "complemento": null,
            "bairro": "Cruzeiro",
            "cep": "65110000",
            "cidade": "São José de Ribamar",
            "estado": "Maranhão"
        }
      },
    ];
  }

}
