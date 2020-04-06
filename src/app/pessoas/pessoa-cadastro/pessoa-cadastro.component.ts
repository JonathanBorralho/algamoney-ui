import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css'],
  preserveWhitespaces: true,
})
export class PessoaCadastroComponent implements OnInit {
  constructor(
    private pessoaService: PessoaService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    this.pessoaService.save(f.value).subscribe((_) => {
      f.reset({ ativo: true });
      this.messageService.add({
        detail: 'Pessoa salva com sucesso!',
        severity: 'success',
      });
    });
  }
}
