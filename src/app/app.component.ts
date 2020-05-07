import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { ApiService } from "./services/api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"],
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService) {}
  title = environment.title;

  ngOnInit(): void {
    const rootping = window.sessionStorage.getItem("rootPing");
    if (!rootping) {
      this.api.pingRoot
        .toPromise()
        .then(() => {
          window.sessionStorage.setItem("rootPing", "1");
        })
        .catch(console.log);
    }
  }
}
