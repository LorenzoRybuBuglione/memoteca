import { Component } from "@angular/core";

@Component({
  selector: "app-pensamento",
  templateUrl: "./pensamento.component.html",
  styleUrls: ["./pensamento.component.css"],
})
export class PensamentoComponent {
  pensamento = {
    conteudo: "Eu amo Angular",
    autoria: "Dev",
    modelo: "modelo3",
  };
}
