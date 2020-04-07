import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';
import { Pessoa } from '../model/pessoa.model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
  preserveWhitespaces: true,
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();

  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as number;
    if (id) {
      this.pessoaService.findById(id).subscribe(pessoa => {
        this.pessoa = pessoa;
      });
    }
  }

  onSubmit(f: NgForm) {
    this.pessoaService.save(f.value).subscribe((pessoa) => {
      this.pessoa = pessoa;
      this.messageService.add({
        detail: 'Pessoa salva com sucesso!',
        severity: 'success',
      });
    });
  }
}
