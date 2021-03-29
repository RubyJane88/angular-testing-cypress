import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-content',
  template: `
    <div class="card-content">
      <div class="content">
        <div data-testid='card-name'  class="name">{{ name }}</div>
        <div data-testid='card-description' class="description">{{ description }}</div>
      </div>
    </div>
  `
})
export class CardContentComponent implements OnInit {
  @Input() name;
  @Input() description;

  ngOnInit() {}
}
