import { Component, OnInit } from '@angular/core';
import {
  IconDefinition,
  faGithub,
  faLinkedinIn,
  faCodepen,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  githubIcon: IconDefinition = faGithub;
  linkedinIcon: IconDefinition = faLinkedinIn;
  codepenIcon: IconDefinition = faCodepen;
  twitterIcon: IconDefinition = faTwitter;
  constructor() {}

  ngOnInit(): void {}
}
