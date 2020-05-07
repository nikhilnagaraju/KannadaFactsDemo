import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) {}

  pingRoot = this.http.get(environment.backend);
  getSingletonFact = this.http.get(`${environment.backend}/random`);

  getRandomFactsArray = (count?: number) => {
    count = count || 10;
    return this.http.get(`${environment.backend}/facts`, {
      params: { count: `${count}` },
    });
  };
}
