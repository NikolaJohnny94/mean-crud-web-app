import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() buttonText!: string;
  @Input() bootstrapColor!: string;
  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onButtonClick(): void {
    this.onClick.emit();
  }
}
