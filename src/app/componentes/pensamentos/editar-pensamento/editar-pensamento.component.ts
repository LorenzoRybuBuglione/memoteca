import { Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Component } from "@angular/core";
import { PensamentoService } from "../pensamento.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-editar-pensamento",
  templateUrl: "./editar-pensamento.component.html",
  styleUrls: ["./editar-pensamento.component.css"],
})
export class EditarPensamentoComponent {
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [
          pensamento.conteudo,
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/),
          ]),
        ],
        autoria: [
          pensamento.autoria,
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        modelo: [pensamento.modelo],
      });
    });
  }

  editarPensamento() {
    this.service.editar(this.formulario.value).subscribe(() => {
      this.router.navigate(["/listarPensamento"]);
    });
  }

  cancelar() {
    this.router.navigate(["/listarPensamento"]);
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return "botao";
    } else {
      return "botao__desabilitado";
    }
  }
}
