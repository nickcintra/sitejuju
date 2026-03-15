import { Component } from '@angular/core';

interface CharSpan {
  char: string;
  rotation: number;
  spotted: boolean;
}

@Component({
  selector: 'app-circle-text',
  imports: [],
  templateUrl: './circle-text.html',
  styleUrl: './circle-text.css',
})
export class CircleText {
  readonly chars: CharSpan[] = this.buildChars();

  private buildChars(): CharSpan[] {
    const words = ['photo', '-', 'video', '-', 'design', '-', 'photo', '-', 'video', '-', 'design', '-', 'photo', '-'].map(w => w + '\n');
    const textSpotted = 'photo';
    let textIndex = 0;
    const result: CharSpan[] = [];

    for (const word of words) {
      const isSpotted = word.trim() === textSpotted;
      for (const char of word.split('')) {
        textIndex++;
        result.push({
          char,
          rotation: textIndex * 6.3,
          spotted: isSpotted,
        });
      }
    }
    return result;
  }
}
