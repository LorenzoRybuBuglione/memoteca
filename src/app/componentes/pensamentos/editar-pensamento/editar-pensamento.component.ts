import { ActivatedRoute } from "@angular/router";
import { Pensamento } from "./../pensamento";
import { Component } from "@angular/core";
import { PensamentoService } from "../pensamento.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-editar-pensamento",
  templateUrl: "./editar-pensamento.component.html",
  styleUrls: ["./editar-pensamento.component.css"],
})
export class EditarPensamentoComponent {
  pensamento: Pensamento = {
    conteudo: "",
    autoria: "",
    modelo: "",
  };

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.service
      .buscarPorId(parseInt(id!))
      .subscribe((pensamento) => (this.pensamento = pensamento));
  }

  editarPensamento() {
    this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(["/listarPensamento"]);
    });
  }

  cancelar() {
    this.router.navigate(["/listarPensamento"]);
  }
}
