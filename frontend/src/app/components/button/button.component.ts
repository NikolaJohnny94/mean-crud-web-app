import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text!: string;
  @Input() bootstrapColor!: string;
  @Input() icon!: IconDefinition;
  @Input() display!: string;
  @Input() marginX!: number | string;
  @Input() marginTop!: string;
  @Input() title!: string;
  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onButtonClick(): void {
    this.onClick.emit();
  }
}
