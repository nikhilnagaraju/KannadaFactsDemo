import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Observable } from "rxjs";

import { ApiService } from "../services/api.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.less"],
})
export class HomeComponent implements OnInit {
  isSingleton: boolean;
  apiType: string;
  form: FormGroup;
  showProgress: boolean;
  apiError: boolean;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      count: [10, [Validators.required, Validators.max(20), Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.apiType = "singleton";
    this.isSingleton = true;
    this.showProgress = false;
  }

  jsonResponse = {
    _id: "5ead3c5fefee4c5a27aa4f6d",
    fact_en:
      "Shankar Nag's Hosa Theerpu is his only directorial remake in his carrier.",
    fact_kn:
      "ಶಂಕರ್ ನಾಗ್ ರ ನಿರ್ದೇಶನ ವೃತ್ತಿ ಜೀವನದಲ್ಲಿ 'ಹೊಸತೀರ್ಪು' ಚಿತ್ರ ಮಾತ್ರವೇ ರಿಮೇಕ್ ಚಿತ್ರವಾಗಿದೆ.",
    imgurl:
      "https://raw.githubusercontent.com/nikhilnagaraju/smplrepo/master/assets/66.jpg",
  };

  toggleAPItype = (val: string) => {
    this.isSingleton = val === "singleton";
  };

  getFact() {
    this.apiError = false;
    this.showProgress = true;
    let apiSubscription: Observable<any>;
    if (this.isSingleton) {
      apiSubscription = this.api.getSingletonFact;
    } else {
      apiSubscription = this.api.getRandomFactsArray(this.form.value.count);
    }
    apiSubscription.subscribe(
      (resp: {
        _id: string;
        fact_en: string;
        fact_kn: string;
        imgurl: string;
      }) => {
        this.jsonResponse = resp;
        this.showProgress = false;
        this.apiError = false;
      },
      (er) => {
        this.showProgress = false;
        this.apiError = true;
        this.jsonResponse = er.error;
      }
    );
  }
}
